package com.chengxi.kline.dao;

import com.chengxi.kline.model.RxpCommonData;
import com.chengxi.kline.model.RxpCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RxpCommonDataMapper {
    int countByExample(RxpCommonDataExample example);

    int deleteByExample(RxpCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(RxpCommonData record);

    int insertSelective(RxpCommonData record);

    List<RxpCommonData> selectByExample(RxpCommonDataExample example);

    RxpCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") RxpCommonData record, @Param("example") RxpCommonDataExample example);

    int updateByExample(@Param("record") RxpCommonData record, @Param("example") RxpCommonDataExample example);

    int updateByPrimaryKeySelective(RxpCommonData record);

    int updateByPrimaryKey(RxpCommonData record);
}