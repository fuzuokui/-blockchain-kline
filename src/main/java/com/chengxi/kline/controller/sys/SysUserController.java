package com.chengxi.kline.controller.sys;

import com.chengxi.kline.controller.AbstractController;
import com.chengxi.kline.entity.SysUserEntity;
import com.chengxi.kline.service.SysUserRoleService;
import com.chengxi.kline.service.SysUserService;
import com.chengxi.kline.utils.PageUtils;
import com.chengxi.kline.utils.R;
import com.chengxi.kline.utils.ShiroUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年10月31日 上午10:40:10
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;

    /**
     * 验证码缓存前缀
     */
    private static final String VCODE_CACHE_PREFIX = "admin:::phone:::%s";

    /**
     * 所有用户列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:user:list")
    public R list(Integer page, Integer limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", null);
        map.put("offset", (page - 1) * limit);
        map.put("limit", limit);

        //查询列表数据
        List<SysUserEntity> userList = sysUserService.queryList(map);
        int total = sysUserService.queryTotal(map);

        PageUtils pageUtil = new PageUtils(userList, total, limit, page);

        return R.ok().put("page", pageUtil);
    }

    /**
     * 获取登录的用户信息
     */
    @RequestMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }

    /**
     * 修改登录用户密码
     */
    @RequestMapping("/password")
    public R password(String password, String newPassword) {
        if (StringUtils.isBlank(newPassword)) {
            return R.error("新密码不为能空");
        }

        //sha256加密
        password = new Sha256Hash(password).toHex();
        //sha256加密
        newPassword = new Sha256Hash(newPassword).toHex();

        //更新密码
        int count = sysUserService.updatePassword(getUserId(), password, newPassword);
        if (count == 0) {
            return R.error("原密码不正确");
        }

        //退出
        ShiroUtils.logout();

        return R.ok();
    }

    /**
     * 用户信息
     */
    @RequestMapping("/info/{userId}")
    @RequiresPermissions("sys:user:info")
    public R info(@PathVariable("userId") Long userId) {
        SysUserEntity user = sysUserService.queryObject(userId);

        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);

        return R.ok().put("user", user);
    }

    /**
     * 保存用户
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:user:save")
    public R save(@RequestBody SysUserEntity user) {
        if (StringUtils.isBlank(user.getUsername())) {
            return R.error("用户名不能为空");
        }
        if (StringUtils.isBlank(user.getPassword())) {
            return R.error("密码不能为空");
        }

        sysUserService.save(user);

        return R.ok();
    }

    /**
     * 修改用户
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:user:update")
    public R update(@RequestBody SysUserEntity user) {
        if (StringUtils.isBlank(user.getUsername())) {
            return R.error("用户名不能为空");
        }

        sysUserService.update(user);

        return R.ok();
    }

    /**
     * 删除用户
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:user:delete")
    public R delete(@RequestBody Long[] userIds) {
        if (ArrayUtils.contains(userIds, 1L)) {
            return R.error("系统管理员不能删除");
        }

        if (ArrayUtils.contains(userIds, getUserId())) {
            return R.error("当前用户不能删除");
        }

        sysUserService.deleteBatch(userIds);

        return R.ok();
    }

    /**
     * Description: 验证用户是否有权限操作，验证手机号后方可操作
     * All Rights Reserved.
     *
     * @param
     * @return
     * @version 1.0  2016-12-21 11:34 by wgh（guanhua.wang@pintuibao.cn）创建
     */
    @RequestMapping("/checkAuth")
    public R checkAuth() {
        if (hasAuthed()) {
            return R.ok();
        }
        String mobile = getUser().getMobile();
        mobile = mobile.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
        return R.error().put("mobile", mobile);
    }

    /**
     * Description: 给管理员发送短信验证码
     * All Rights Reserved.
     *
     * @param
     * @return
     * @version 1.0  2016-12-21 14:43 by wgh（guanhua.wang@pintuibao.cn）创建
     */
//    @RequestMapping("/sendMsg")
//    public R sendMsg() {
//        String mobile = getUser().getMobile();
//        String vCode = RandomStringUtils.randomNumeric(4);
//        String key = String.format(VCODE_CACHE_PREFIX, mobile);
//        JedisUtil.set(key, vCode);
//        JedisUtil.expire(key, 600);
//        SmsClient.setSmsClient(mobile, vCode, SmsClient.ADMIN_AUTHORITY_CERTIFICATION);
//        return R.ok();
//    }
//
//    @RequestMapping("/checkVCode")
//    public R checkVCode(String vCode) {
//        String mobile = getUser().getMobile();
//        String key = String.format(VCODE_CACHE_PREFIX, mobile);
//        String cacheVCode = JedisUtil.get(key);
//        if (!vCode.equals(cacheVCode)) {
//            return R.error("验证码不正确");
//        } else {
//            setAuthed();
//        }
//        return R.ok();
//    }

    /**
     * 登录
     */
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public R login(HttpServletRequest request, String username, String password, String captcha)throws IOException {
        if(!captcha.equals(getGeneratedKey(request))){
            return R.error("验证码不正确");
        }

        try{
            Subject subject = ShiroUtils.getSubject();
            //sha256加密
            password = new Sha256Hash(password).toHex();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            subject.login(token);
        }catch (UnknownAccountException e) {
            return R.error(e.getMessage());
        }catch (IncorrectCredentialsException e) {
            return R.error(e.getMessage());
        }catch (LockedAccountException e) {
            return R.error(e.getMessage());
        }catch (AuthenticationException e) {
            return R.error("账户验证失败");
        }

        return R.ok();
    }

    public String getGeneratedKey(HttpServletRequest req) {
        HttpSession session = req.getSession();
        return (String)session.getAttribute("KAPTCHA_SESSION_KEY");
    }
}
