package com.chengxi.kline.dao;

import com.chengxi.kline.model.TrxCommonData;
import com.chengxi.kline.model.TrxCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TrxCommonDataMapper {
    int countByExample(TrxCommonDataExample example);

    int deleteByExample(TrxCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TrxCommonData record);

    int insertSelective(TrxCommonData record);

    List<TrxCommonData> selectByExample(TrxCommonDataExample example);

    TrxCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TrxCommonData record, @Param("example") TrxCommonDataExample example);

    int updateByExample(@Param("record") TrxCommonData record, @Param("example") TrxCommonDataExample example);

    int updateByPrimaryKeySelective(TrxCommonData record);

    int updateByPrimaryKey(TrxCommonData record);
}