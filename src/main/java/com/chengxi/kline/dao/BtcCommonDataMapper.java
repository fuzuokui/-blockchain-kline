package com.chengxi.kline.dao;

import com.chengxi.kline.model.BtcCommonData;
import com.chengxi.kline.model.BtcCommonDataExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BtcCommonDataMapper {
    int countByExample(BtcCommonDataExample example);

    int deleteByExample(BtcCommonDataExample example);

    int deleteByPrimaryKey(Long id);

    int insert(BtcCommonData record);

    int insertSelective(BtcCommonData record);

    List<BtcCommonData> selectByExample(BtcCommonDataExample example);

    BtcCommonData selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") BtcCommonData record, @Param("example") BtcCommonDataExample example);

    int updateByExample(@Param("record") BtcCommonData record, @Param("example") BtcCommonDataExample example);

    int updateByPrimaryKeySelective(BtcCommonData record);

    int updateByPrimaryKey(BtcCommonData record);
}