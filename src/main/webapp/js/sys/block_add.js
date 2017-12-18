
var blockId = T.p("blockId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增块",
		channelList:{},
		block: {

		}
	},
	created: function() {
		if(blockId != null){
			this.title = "修改升级信息";
			this.getBlock(blockId);
		}
    },
	methods: {
		getBlock: function(blockId){
			this.$http.get("../sys/block/detail?blockId="+blockId).then((r) => {
                this.block = r.body.block;
            });
		},
		saveOrUpdate: function (event) {
			//表单验证
			var bootstrapValidator = $("#submitForm").data('bootstrapValidator');
			bootstrapValidator.validate();
			if(!bootstrapValidator.isValid()){ //验证失败不提交
				return;
			}

			var url = "../sys/block/saveOrUpdate";
			this.$http.post(url, vm.block).then((r) => {
				if(r.body.code === 0){
					swal(
						{
							title:"操作成功!",
							text:"",
							type:"success"
						},
						function(){
							vm.back();
						}
					);
				}else{
					swal("操作失败!", r.body.msg, "error");
				}
			});
		},
		back: function (event) {
			history.go(-1);
		}
	}
});

$(function () {
	//表单验证
	$('#submitForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			code: {
				message: '编码验证失败',
				validators: {
					notEmpty: {
						message: '编码不能为空'
					},
					stringLength: {
						min: 2,
						max: 30,
						message: '编码长度必须在2到30位之间'
					}
				}
			},
			value: {
				message: '块值验证失败',
				validators: {
					notEmpty: {
						message: '块值不能为空'
					},
					stringLength: {
						max: 2048,
						message: '块值不能超过2048个字符'
					}
				}
			}
		}
	});
});