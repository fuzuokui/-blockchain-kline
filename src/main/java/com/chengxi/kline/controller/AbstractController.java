package com.chengxi.kline.controller;

import com.chengxi.kline.entity.SysUserEntity;
import com.chengxi.kline.utils.ShiroUtils;

import org.apache.shiro.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Controller公共组件
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月9日 下午9:42:26
 */
public abstract class AbstractController {

	/**
	 * SESSION属性，记录是否已认证手机号
	 */
	public static final String SESSION_ATTR_HAS_AUTHED_KEY = "hasAuthed";


	protected Logger logger = LoggerFactory.getLogger(getClass());
	
	protected SysUserEntity getUser() {
		return ShiroUtils.getUserEntity();
	}

	protected Long getUserId() {
		return getUser().getUserId();
	}

	protected Session getSession(){
		return ShiroUtils.getSession();
	}

	protected boolean hasAuthed(){
		return Boolean.valueOf((String)getSession().getAttribute(SESSION_ATTR_HAS_AUTHED_KEY));
	}

	protected void setAuthed(){
		getSession().setAttribute(SESSION_ATTR_HAS_AUTHED_KEY, "true");
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}

}
