package com.chengxi.kline.vo.kline;

import java.io.Serializable;

/**
 * @Author: zuokui.fu
 * @Description:
 * @Date: Created in 19:04 2017/12/17
 * @Modified By:
 */
public class KlineDataVO implements Serializable {

    private String name;
    private String value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
