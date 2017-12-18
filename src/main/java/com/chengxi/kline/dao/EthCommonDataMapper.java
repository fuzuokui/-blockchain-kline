package com.chengxi.kline.dao;

import com.chengxi.kline.model.EthCommonData;
import com.chengxi.kline.model.EthCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface EthCommonDataMapper {
    int countByExample(EthCommonDataExample example);

    int deleteByExample(EthCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(EthCommonData record);

    int insertSelective(EthCommonData record);

    List<EthCommonData> selectByExample(EthCommonDataExample example);

    EthCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") EthCommonData record, @Param("example") EthCommonDataExample example);

    int updateByExample(@Param("record") EthCommonData record, @Param("example") EthCommonDataExample example);

    int updateByPrimaryKeySelective(EthCommonData record);

    int updateByPrimaryKey(EthCommonData record);
}