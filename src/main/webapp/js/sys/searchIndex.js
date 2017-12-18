
var vm = new Vue({
	el:'#rrapp',
	data:{
		
	},
	methods: {
		batchUpdateShopIndex: function (event) {
			swal(
				{
					title:"确定要批量更新店铺索引？",
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
					vm.$http.post('../common/batchUpdateShopIndex').then((r) => {
						if(r.body.code === 0){
						swal(
							{
								title:"操作成功!",
								text:"更新需要几分钟，请耐心等待",
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
		},
		batchUpdateServiceIndex: function (event) {
			swal(
				{
					title:"确定要批量更新服务索引？",
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
					vm.$http.post('../common/batchUpdateServiceIndex').then((r) => {
						if(r.body.code === 0){
							swal(
								{
									title:"操作成功!",
									text:"更新需要几分钟，请耐心等待",
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
		},
		batchUpdateRequireIndex: function (event) {
			swal(
				{
					title:"确定要批量更新需求索引？",
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
					vm.$http.post('../common/batchUpdateRequireIndex').then((r) => {
						if(r.body.code === 0){
							swal(
								{
									title:"操作成功!",
									text:"更新需要几分钟，请耐心等待",
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