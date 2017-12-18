package com.chengxi.kline.dao;

import com.chengxi.kline.model.LtcCommonData;
import com.chengxi.kline.model.LtcCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LtcCommonDataMapper {
    int countByExample(LtcCommonDataExample example);

    int deleteByExample(LtcCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(LtcCommonData record);

    int insertSelective(LtcCommonData record);

    List<LtcCommonData> selectByExample(LtcCommonDataExample example);

    LtcCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") LtcCommonData record, @Param("example") LtcCommonDataExample example);

    int updateByExample(@Param("record") LtcCommonData record, @Param("example") LtcCommonDataExample example);

    int updateByPrimaryKeySelective(LtcCommonData record);

    int updateByPrimaryKey(LtcCommonData record);
}