package com.chengxi.kline.dao;

import com.chengxi.kline.model.AdminOptLog;

public interface AdminOptLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AdminOptLog record);

    int insertSelective(AdminOptLog record);

    AdminOptLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AdminOptLog record);

    int updateByPrimaryKey(AdminOptLog record);
}