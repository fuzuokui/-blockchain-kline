package com.chengxi.kline.model;

import java.util.Date;

public class LtcCommonData {
    private Long id;

    private Date dataDatetime;

    private Long price;

    private String dataSource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataDatetime() {
        return dataDatetime;
    }

    public void setDataDatetime(Date dataDatetime) {
        this.dataDatetime = dataDatetime;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource == null ? null : dataSource.trim();
    }
}