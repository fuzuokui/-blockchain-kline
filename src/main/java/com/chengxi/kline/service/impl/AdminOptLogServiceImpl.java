package com.chengxi.kline.service.impl;

import com.chengxi.kline.dao.AdminOptLogMapper;
import com.chengxi.kline.model.AdminOptLog;
import com.chengxi.kline.service.AdminOptLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service("adminOptLogService")
public class AdminOptLogServiceImpl implements AdminOptLogService {

    @Autowired
    private AdminOptLogMapper adminOptLogMapper;

    private static final Logger Logger = LoggerFactory
            .getLogger(AdminOptLogServiceImpl.class);

    @Async
    @Override
    public void saveLog(String requestUri, Long adminId, String requestParams, String responseResult, String ip) {
        AdminOptLog log = new AdminOptLog();
        log.setAdminId(adminId);
        log.setOptTime(new Date());
        log.setRequestParams(requestParams);
//        log.setResponseResult(responseResult); //太长了先注释掉,输入在日志文件里
        log.setRequestUri(requestUri);
        log.setClientIp(ip);
        adminOptLogMapper.insert(log);
        Logger.info(String.format("admin operate log : [adminId]=%d , [requestUri]=%s , [requestParams]=%s , [response]=%s , [IP]=%s",
                adminId, requestUri, requestParams, responseResult, ip));
    }
}
