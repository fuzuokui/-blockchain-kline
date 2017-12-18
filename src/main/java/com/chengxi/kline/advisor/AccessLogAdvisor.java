package com.chengxi.kline.advisor;

import com.alibaba.fastjson.JSON;
import com.chengxi.kline.service.AdminOptLogService;
import com.chengxi.kline.utils.IpUtil;
import com.chengxi.kline.utils.ShiroUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by eric on 16/6/15.
 */
@Aspect
@Component
@EnableAsync
public class AccessLogAdvisor {

    @Autowired
    private AdminOptLogService adminOptLogService;

    private static final Logger logger = LoggerFactory
            .getLogger(AccessLogAdvisor.class);

    public HttpServletRequest getRequet() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    @AfterReturning(value = "@within(org.springframework.web.bind.annotation.RequestMapping)", argNames = "joinPoint,response", returning = "response")
    public void     monitorAccess(JoinPoint joinPoint, Object response) {
        try {
            String requestParams = JSON.toJSONString(getRequet().getParameterMap());
            if("/sys/user/login".equals(getRequet().getRequestURI())){
                requestParams = requestParams.replaceAll("\"password\":\\[\"\\w*\"\\],", ""); //登录过滤密码
            }else{
                requestParams = requestParams.replaceAll("\"\\w+\":\\[\"\"\\],", ""); //过滤空参数
            }
            String ip = IpUtil.getIpAddr(getRequet());
            adminOptLogService.saveLog(getRequet().getRequestURI(), ShiroUtils.getUserId(),
                    requestParams, JSON.toJSONString(response), ip);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("记录操作日志失败", e);
        }
    }

}
