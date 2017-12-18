package com.chengxi.kline.system;

import com.chengxi.kline.utils.ConfigPropertieUtils;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.core.io.Resource;
import org.springframework.util.DefaultPropertiesPersister;
import org.springframework.util.PropertiesPersister;

import java.io.*;
import java.util.Properties;

/**
 * Description: 从指定路径加载配置文件
 * All Rights Reserved.
 * @version 1.0  2016-12-09 11:02 by wgh（guanhua.wang@pintuibao.cn）创建
 */ 
public class DecryptPropertyPlaceholderConfigurer extends PropertyPlaceholderConfigurer {
	
	private Resource[] locations;
	private String fileEncoding;
	
    public void setFileEncoding(String fileEncoding) {
		this.fileEncoding = fileEncoding;
	}
	public void setLocations(Resource[] locations) {
        this.locations = locations;
    }
    public void loadProperties(Properties props) throws IOException {
    	String systemBasePath = "/opt/ptbconf/soter-operation"; //在linux部署时，读取指定文件夹得配置文件。
        if (this.locations != null) {
            PropertiesPersister propertiesPersister = new DefaultPropertiesPersister();
            for (int i = 0; i < this.locations.length; i++) {
            	InputStream is = null;
                Resource location = this.locations[i];
                File configDir = new File(systemBasePath);
            	if(!configDir.exists()) {
            		is = this.getClass().getResourceAsStream("/" + location.getFilename());
            	}else {
            		String  filePath = systemBasePath + File.separator + location.getFilename();
                    is = new FileInputStream(filePath);
            	}
                try {
                    if (fileEncoding != null) {
                        propertiesPersister.load(props, new InputStreamReader(is, fileEncoding));
                    } else {
                        propertiesPersister.load(props, is);
                    }
                    
                    ConfigPropertieUtils.prop = props;
                } finally {
                    if (is != null) is.close();
                }
            }
        }
    }
}
