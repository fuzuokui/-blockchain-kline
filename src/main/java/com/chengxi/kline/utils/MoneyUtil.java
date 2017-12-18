package com.chengxi.kline.utils;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author: zuokui.fu
 * @Description:
 * @Date: Created in 15:27 2017/12/17
 * @Modified By:
 */
public class MoneyUtil {

    public static String fromFenToYuan(String fen) {
        String yuan = "";
        boolean MULTIPLIER = true;
        Pattern pattern = Pattern.compile("^[1-9][0-9]*{1}");
        Matcher matcher = pattern.matcher(fen);
        if(matcher.matches()) {
            yuan = (new BigDecimal(fen)).divide(new BigDecimal(100)).setScale(2).toString();
        } else {
            System.out.println("参数格式不正确!");
        }

        return yuan;
    }

    public static String fromFenToYuan(Long fen) {
        return fromFenToYuan(String.valueOf(fen));
    }

    public static String fromYuanToFen(String yuan) {
        String fen = "";
        Pattern pattern = Pattern.compile("^[0-9]+(.[0-9]{2})?{1}");
        Matcher matcher = pattern.matcher(yuan);
        if(matcher.matches()) {
            try {
                BigDecimal e = new BigDecimal(yuan);
                fen = e.multiply(new BigDecimal(100)).toString();
            } catch (Exception var5) {
                var5.printStackTrace();
            }
        } else {
            System.out.println("参数格式不正确!");
        }

        return fen.substring(0, fen.indexOf("."));
    }
}
