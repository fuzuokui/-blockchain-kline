
var systemConfigId = T.p("systemConfigId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增系统配置",
		channelList:{},
		systemConfig: {

		}
	},
	created: function() {
		if(systemConfigId != null){
			this.title = "修改系统配置";
			this.getSystemConfig(systemConfigId);
		}
    },
	methods: {
		getSystemConfig: function(systemConfigId){
			this.$http.get("../sys/systemConfig/detail?systemConfigId="+systemConfigId).then((r) => {
                this.systemConfig = r.body.systemConfig;
            });
		},
		saveOrUpdate: function (event) {
			//表单验证
			var bootstrapValidator = $("#submitForm").data('bootstrapValidator');
			bootstrapValidator.validate();
			if(!bootstrapValidator.isValid()){ //验证失败不提交
				return;
			}

			var url = "../sys/systemConfig/saveOrUpdate";
			this.$http.post(url, vm.systemConfig).then((r) => {
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
			configKey: {
				message: '键验证失败',
				validators: {
					notEmpty: {
						message: '键不能为空'
					},
					stringLength: {
						min: 2,
						max: 30,
						message: '键长度必须在2到30位之间'
					}
				}
			},
			configValue: {
				message: '值验证失败',
				validators: {
					notEmpty: {
						message: '值不能为空'
					},
					stringLength: {
						max: 1000,
						message: '值不能超过1000个字符'
					}
				}
			},
			remarks: {
				message: '描述验证失败',
				validators: {
					notEmpty: {
						message: '描述不能为空'
					},
					stringLength: {
						min: 2,
						max: 200,
						message: '描述长度必须在2到200位之间'
					}
				}
			}
		}
	});
});