package com.chengxi.kline.controller.sys;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 系统页面视图
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月24日 下午11:05:27
 */
@Controller
public class SysPageController {
	
	@RequestMapping("sys/{url}.html")
	public String page(@PathVariable("url") String url){
		return "sys/" + url + ".html";
	}

	@RequestMapping("kline/{url}.html")
	public String kline(@PathVariable("url") String url){
		return "kline/" + url + ".html";
	}


	@RequestMapping("adminchat/{url}.html")
	public String adminChatPage(@PathVariable("url") String url){
		return "adminchat/" + url + ".html";
	}

}