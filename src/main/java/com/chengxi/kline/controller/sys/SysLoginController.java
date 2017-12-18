package com.chengxi.kline.controller.sys;

import com.google.code.kaptcha.servlet.KaptchaExtend;
import com.chengxi.kline.utils.ShiroUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录相关
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月10日 下午1:15:31
 */
@Controller
public class SysLoginController extends KaptchaExtend {

	private static final Logger logger = LoggerFactory
			.getLogger(SysLoginController.class);

	@RequestMapping("captcha.jpg")
	public void captcha(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		super.captcha(req, resp);
	}

	/**
	 * 退出
	 */
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout() {
		logger.info("adminId=" + ShiroUtils.getUserId() + " , logout !");
		ShiroUtils.logout();
		return "redirect:login.html";
	}
}
