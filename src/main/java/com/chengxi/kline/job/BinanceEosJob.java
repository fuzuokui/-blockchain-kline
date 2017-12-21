package com.chengxi.kline.job;

import com.chengxi.kline.dao.EosCommonDataMapper;
import com.chengxi.kline.model.BtcCommonData;
import com.chengxi.kline.model.EosCommonData;
import com.chengxi.kline.utils.MoneyUtil;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Nullable;
import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author: zuokui.fu
 * @Description:
 * @Date: Created in 14:12 2017/12/17
 * @Modified By:
 */
//@Service
public class BinanceEosJob{

    private static final Logger LOGGER = LoggerFactory.getLogger(BinanceEosJob.class);

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;
    @Autowired
    private EosCommonDataMapper eosCommonDataMapper;

    @PostConstruct
    private void doJob(){
        taskExecutor.execute(new EosSpiderJob(eosCommonDataMapper));
    }

    static class EosSpiderJob implements Runnable{

        EosCommonDataMapper mapper;

        EosSpiderJob(EosCommonDataMapper eosCommonDataMapper){
            mapper = eosCommonDataMapper;
        }

        @Override
        public void run() {
            // 设置 chrome 的路径（如果你安装chrome的时候用的默认安装路径，则可省略这步）
            System.setProperty("webdriver.chrome.driver","C:/Program Files (x86)/Google/Chrome/Application/chrome.exe");
            // 创建一个 ChromeDriver 的接口，用于连接 Chrome（chromedriver.exe 的路径可以任意放置，只要在newFile（）的时候写入你放的路径即可）
            @SuppressWarnings("deprecation")
            ChromeDriverService service = new ChromeDriverService.Builder().usingDriverExecutable(
                    new File("F:/ideaWorkSpace/spring-test/src/main/extertion/chromedriver.exe")) .usingAnyFreePort().build();
            Long endTime = 0L;
            WebDriver driver = null;
            try {
                service.start();

            // 创建一个 Chrome 的浏览器实例
                driver = new RemoteWebDriver(service.getUrl(),
                        DesiredCapabilities.chrome());
                driver.get("https://www.binance.com/trade.html?symbol=EOS_ETH");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                endTime = sdf.parse("2020-12-31").getTime();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            while (System.currentTimeMillis() < endTime) {
                    WebElement element = (new WebDriverWait(driver, 10)
                            .until(new ExpectedCondition<WebElement>() {
                                @Nullable
                                @Override
                                public WebElement apply(@Nullable WebDriver input) {
                                    return input.findElement(By.cssSelector(".transMoney.ng-binding.ng-scope"));
                                }
                            }));
                String priceYuan = element.getText().replace("￥", "").replace(",", "");
                String priceFen = priceYuan.replace(".", "");
                if (StringUtils.hasText(priceFen)) {
//                    System.out.println(String.format("============================%s", price));
                    LOGGER.info(String.format("EOS RMB price:%s元", priceYuan));
                    EosCommonData data = new EosCommonData();
                    data.setDataDatetime(new Date());
                    data.setPrice(Long.parseLong(priceFen));
                    data.setDataSource(IJob.DATA_SOURCE_BINANCE);
                    mapper.insertSelective(data);
                }
                    try {
                        Thread.sleep(30000L);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                // 关闭浏览器
                driver.quit();
                // 关闭 ChromeDriver 接口
                service.stop();
        }
    }





}
