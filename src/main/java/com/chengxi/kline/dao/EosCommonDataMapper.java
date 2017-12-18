package com.chengxi.kline.dao;

import com.chengxi.kline.model.EosCommonData;
import com.chengxi.kline.model.EosCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface EosCommonDataMapper {
    int countByExample(EosCommonDataExample example);

    int deleteByExample(EosCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EosCommonData record);

    int insertSelective(EosCommonData record);

    List<EosCommonData> selectByExample(EosCommonDataExample example);

    EosCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EosCommonData record, @Param("example") EosCommonDataExample example);

    int updateByExample(@Param("record") EosCommonData record, @Param("example") EosCommonDataExample example);

    int updateByPrimaryKeySelective(EosCommonData record);

    int updateByPrimaryKey(EosCommonData record);
}