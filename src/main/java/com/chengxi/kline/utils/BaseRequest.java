package com.chengxi.kline.utils;


/**
 * 公共请求参数
 *
 * @author lenovo
 */
public class BaseRequest<T> {
    private String deviceType;
    private String channelId;
    private String version;
    private String deviceNo;
    private String resolution;
    private String clientType;
    private String token;
    private String source;
    private T data;
    public BaseRequest(T t) {
        this.data = t;
        this.channelId = "20000";
        this.version = "1.0.0";
        this.deviceType = "pc-op";
        this.deviceNo = "6546465465465";
        this.resolution = "720*1280";
        this.clientType = "ptb";
    }


    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDeviceNo() {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        this.deviceNo = deviceNo;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getClientType() {
        return clientType;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public interface CheckGroup1 {

    }


}
