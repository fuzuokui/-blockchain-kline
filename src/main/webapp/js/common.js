//jqGrid的配置信息
$.jgrid.defaults.width = 1000;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$.extend($.jgrid.defaults, {
	loadError: function (xhr, status, error) {
		if (status == "parsererror") {
			swal(
				{
					title:"检测到您长时间未使用",
					text:"为保证安全请重新登录",
					type:"warning"
				},
				function(){
					window.top.location.href = "/login.html";
				}
			);
		}

		if (status == "error") {
			swal(
				{
					title:"系统异常",
					text:"请稍后再试或联系管理员",
					type:"warning"
				},
				function(){

				}
			);
		}
	}
});

//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost:8080/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
};
T.p = url;


/**
 * 重写alert
 * msg:消息
 * callback:回调
 */
window.alert = function(msg, callback){
	parent.layer.alert(msg, function(index){
		parent.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

/**
 * 重写confirm式样框
 * msg:消息
 * callback:回调
 */
window.confirm = function(msg, callback){
	parent.layer.confirm(msg, {btn: ['确定','取消']},
	function(){//确定事件
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

function getSelectedRowCellVal(cellName){
	var grid = $("#jqGrid");
	var rowKey = grid.getGridParam("selrow");
	if(!rowKey){
		alert("请选择一条记录");
		return ;
	}

	var selectedIDs = grid.getGridParam("selarrrow");
	if(selectedIDs.length > 1){
		alert("只能选择一条记录");
		return ;
	}

	var cellVal = grid.jqGrid("getCell", rowKey, cellName);
	return cellVal;
}

//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	alert("请选择一条记录");
    	return ;
    }
	var selectedIDs = grid.getGridParam("selarrrow");
	if(selectedIDs.length > 1){
		alert("只能选择一条记录");
		return ;
	}


    
    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
    	alert("只能选择一条记录");
    	return ;
    }
    
    return selectedIDs[0];
}

//选择一条记录
function getSelectedRowByEleId(eleId) {
    var grid = $("#" + eleId);
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
        alert("请选择一条记录");
        return ;
    }
    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
        alert("只能选择一条记录");
        return ;
    }



    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
        alert("只能选择一条记录");
        return ;
    }

    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	alert("请选择一条记录");
    	return ;
    }
    
    return grid.getGridParam("selarrrow");
}

function initDaterangepicker(divid, startInputId, endInputId, daterangepickerInputId){console.log("come in already!!");
	$('#' + divid).daterangepicker({
		//startDate: moment().startOf('day'),
		//endDate: '12/30/2099',
		minDate: '01/01/2012',    //最小时间
		maxDate : '12/30/2099', //最大时间
		//dateLimit : {
		//	days : 30
		//}, //起止时间的最大间隔
		showDropdowns : true,
		showWeekNumbers : false, //是否显示第几周
		timePicker : true, //是否显示小时和分钟
		timePickerSeconds:true,
		timePickerIncrement : 1, //时间的增量，单位为分钟
		timePicker24Hour : true, //是否使用12小时制来显示时间
		ranges : {
			//'最近1小时': [moment().subtract('hours',1), moment()],
			'今日': [moment().startOf('day'), moment()],
			'昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
			'最近7日': [moment().subtract('days', 6), moment()],
			'最近30日': [moment().subtract('days', 29), moment()]
		},
		opens : 'right', //日期选择框的弹出位置
		buttonClasses : [ 'btn btn-default' ],
		applyClass : 'btn-small btn-primary blue',
		cancelClass : 'btn-small',
		format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
		separator : ' to ',
		locale : {
			applyLabel : '确定',
			cancelLabel : '取消',
			fromLabel : '起始时间',
			toLabel : '结束时间',
			customRangeLabel : '自定义',
			daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
			monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
				'七月', '八月', '九月', '十月', '十一月', '十二月' ],
			firstDay : 1
		},
		"alwaysShowCalendars": true
	}, function(start, end, label) {
		$('#' + startInputId).val(start.format('YYYY-MM-DD HH:mm:ss'));
		$('#' + endInputId).val(end.format('YYYY-MM-DD HH:mm:ss'));
		$('#' + daterangepickerInputId).val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
	});
}

//金额转换，分转成元
function fenToYuan(fen){
	if(fen == null){
		return 0;
	}
	var num = parseInt(fen);
	num=num*0.01;//分到元
	num=num.toFixed(2);//保留两位小数
	num+='';//转成字符串
	reg=num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;//确定使用有哪个正则
	num=num.replace(reg, '$1,');//千分位格式化
	return num;
}

//金额转换，元转成分
function yuanToFen(yuan){
	if(yuan == null){
		return 0;
	}
	var num = yuan.replace(/,/g,"");
	var y = parseFloat(num);
	var fen = y * 100;
	return parseInt(fen);
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

//添加默认选项
function addDefaultRegion(regions){
	var top1 = new Object();
	top1.regionId = '';
	top1.regionName = '请选择';
	var top2 = new Object();
	top2.regionId = '';
	top2.regionName = '请选择';
	var children = new Array()
	children[0] = top2;
	top1.children = children;
	return prepend(regions, top1);;
}

//添加默认选项
function addDefaultCategory(categorys){
	var top1 = new Object();
	top1.categoryId = '';
	top1.categoryName = '请选择';
	var top2 = new Object();
	top2.categoryId = '';
	top2.categoryName = '请选择';
	var children = new Array()
	children[0] = top2;
	top1.children = children;
	return prepend(categorys, top1);
}

function prepend(arr, item) {
	//将arr数组复制给a
	var a = arr.slice(0);
	//使用unshift方法向a开头添加item
	a.unshift(item);
	return a;
}

Vue.filter('time', function (value) {//value为13位的时间戳
	if(value == null){
		return "";
	}
	return formatDate(value);
});

function formatDate(value){
	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	var time = new Date(parseInt(value));
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();

	var h = time.getHours();
	var mi = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mi) + ':' + add0(s);
}

function dateToLong(tdate){
	var ddate = new Date(tdate).getTime();
	return ddate;
}