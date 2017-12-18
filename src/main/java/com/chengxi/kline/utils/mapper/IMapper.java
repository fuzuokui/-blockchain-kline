package com.chengxi.kline.utils.mapper;


public interface IMapper<T> {
    int deleteByPrimaryKey(Long id);

    int insert(T record);

    int insertSelective(T record);

    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);

    T selectByPrimaryKey(Long id);
}