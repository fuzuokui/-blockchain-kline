$(function () {
    $("#jqGrid").jqGrid({
        url: '../adminchat/list',
        datatype: "json",
        colModel: [
            { label: '编号', name: 'id', width: 15, key: true },
            { label: '消息内容', name: 'msg', width: 40 },
            { label: '发送状态', name: 'sendStatus', width: 60,formatter: function(value, options, row){
                if(value === 0){
                    return '<span class="label label-primary">未发送</span>';
                }
                if(value === 1){
                    return '<span class="label label-primary">发送中</span>';
                }
                if(value === 2){
                    return '<span class="label label-success">已发送</span>';
                }
            } },
            { label: '备注', name: 'desc', width: 90 },
            { label: '发送用户数', name: 'userNum', width: 70 },
            { label: '发送时间', name: 'sendTime', width: 100 }
        ],
        viewrecords: true,
        height: 600,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.pageNum",
            total: "page.pages",
            records: "page.total"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        ondblClickRow:function(rowid,iRow,iCol,e){
            location.href = "chatdetail.html?chatId="+rowid;
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var vm = new Vue({
    el:'#rrapp',
    data:{

    },
    methods: {
        info: function (event) {
            var chatId = getSelectedRow();
            if(chatId == null){
                return ;
            }

            location.href = "chatdetail.html?chatId="+chatId;
        },
    }
});