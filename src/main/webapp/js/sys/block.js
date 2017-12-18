$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/block/list',
        datatype: "json",
        colModel: [			
			{ label: '序号', name: 'blockId', width: 25, key: true ,hidden:true},
			{ label: '名称', name: 'name', width: 100 },
			{ label: '编码', name: 'code', width: 60 },
			{ label: '值', name: 'value', width: 100 },
			{ label: '创建时间', name: 'createTime', width: 90 },
			{ label: '创建人', name: 'creatorId', width: 50 },
			{ label: '修改时间', name: 'lastModifyTime', width: 90 },
			{ label: '最后修改人', name: 'lastModifierId', width: 50}
        ],
		viewrecords: true,
        height: 600,
        rowNum: 30,
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
		update: function (event) {
			var blockId = getSelectedRow();
			if(blockId == null){
				return ;
			}
			
			location.href = "block_add.html?blockId="+blockId;
		},
		del: function (event) {
			var blockIds = getSelectedRows();
			if(blockIds == null){
				return ;
			}

			swal(
				{
					title:"确定要删除选中的记录？",
					type:"warning",
					html:true,
					showCancelButton:"true",
					showConfirmButton:"true",
					confirmButtonText:"确认",
					cancelButtonText:"取消",
					closeOnConfirm: false
				},
				function(result) {
					if (!result) { //取消或者关闭不执行
						return;
					}
					vm.$http.post('../sys/block/delete', blockIds).then((r) => {
						if(r.body.code === 0){
						swal(
							{
								title:"操作成功!",
								text:"",
								type:"success"
							},
							function(){
								$("#jqGrid").trigger("reloadGrid");
							}
						);
					}else{
						swal("操作失败!", r.body.msg, "error");
					}
				});
				}
			);
		}
	}
});