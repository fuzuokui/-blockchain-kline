package com.chengxi.kline.controller.kline;

import com.chengxi.kline.dao.EosCommonDataMapper;
import com.chengxi.kline.model.EosCommonData;
import com.chengxi.kline.model.EosCommonDataExample;
import com.chengxi.kline.utils.MoneyUtil;
import com.chengxi.kline.utils.R;
import com.chengxi.kline.vo.kline.KlineDataVO;
import com.github.pagehelper.PageHelper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author: zuokui.fu
 * @Description:
 * @Date: Created in 19:01 2017/12/17
 * @Modified By:
 */
@RestController
@RequestMapping("kline")
public class KlineController {

    private static final Logger logger = LoggerFactory
            .getLogger(KlineController.class);

    private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private EosCommonDataMapper eosCommonDataMapper;

    @RequestMapping(value = "getklinedata", method = RequestMethod.GET)
    public R getKlineData() {
        EosCommonDataExample example = new EosCommonDataExample();
        example.setOrderByClause("id desc");
//        example.createCriteria().andIdLessThan(10L);
        PageHelper.offsetPage(0, 50);
        List<EosCommonData> eosCommonDataList = eosCommonDataMapper.selectByExample(example);
        Collections.sort(eosCommonDataList);
//        List<KlineDataVO> klineDataVOList = eosCommonDataList.stream().map(eosCommonData -> convertToKlineData(eosCommonData)).collect(Collectors.toList());
        List<List<Object>> klineDataVOList = eosCommonDataList.stream().map(eosCommonData -> convertToList(eosCommonData)).collect(Collectors.toList());
        return R.ok().put("klineData", klineDataVOList);
    }



    KlineDataVO convertToKlineData(EosCommonData data){
        KlineDataVO vo = new KlineDataVO();
        vo.setName(SDF.format(data.getDataDatetime()));
        vo.setValue(MoneyUtil.fromFenToYuan(data.getPrice()));
        return vo;
    }

    List<Object> convertToList(EosCommonData data){
        List<Object> list = new ArrayList<>(2);
        list.add(SDF.format(data.getDataDatetime()));
        list.add(MoneyUtil.fromFenToYuan(data.getPrice()));
        return list;
    }


}
