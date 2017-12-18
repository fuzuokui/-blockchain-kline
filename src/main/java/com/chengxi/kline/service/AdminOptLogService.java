package com.chengxi.kline.service;

/**
 * Description: 管理员操作日志
 * All Rights Reserved.
 * @version 1.0  2016-12-29 17:54 by wgh（guanhua.wang@pintuibao.cn）创建
 */ 
public interface AdminOptLogService {
	
	void saveLog(String requestUri, Long adminId, String requestParams, String responseResult, String ip);
}
