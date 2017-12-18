package com.chengxi.kline.utils;

/**
 * 常量
 * 
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月15日 下午1:23:52
 */
public class Constant {

    /**
     * CDN地址
     */
    public static final String CDN_URL = ConfigPropertieUtils.getString("cdn.url");

    /**
     * 用户默认头像
     */
    public static final String USER_CDN_DEFAULT_IMG = ConfigPropertieUtils.getString("user.default.headimg");

    /**
     * CDN地址
     */
    public static final String USER_CDN_URL = ConfigPropertieUtils.getString("user.portrait.url");

    /**
     * 批量代理媒体上传路径
     */
    public static final String UPLOAD_AGENTMEDIA_FILE_FTP_DIR = ConfigPropertieUtils.getString("zeus.user.agentMedia.ftp.dir");

    /**
     * 认证图片地址
     */
    public static final String CERTIFICATION_IMG_URI = ConfigPropertieUtils.getString("zeus.server.certification.img.url");

	/**
	 * 菜单类型
	 * 
	 * @author chenshun
	 * @email sunlightcs@gmail.com
	 * @date 2016年11月15日 下午1:24:29
	 */
    public enum MenuType {
        /**
         * 目录
         */
    	CATALOG(0),
        /**
         * 菜单
         */
        MENU(1),
        /**
         * 按钮
         */
        BUTTON(2);

        private int value;

        private MenuType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
}
