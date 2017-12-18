var vm = new Vue({
    el:'#rrapp',
    data:{
        title:"发送消息",
        chat:{}
    },
    created: function() {

    },
    methods: {

        send: function (event) {
            var url = "../adminchat/send";
            this.$http.post(url, vm.chat).then((r) => {
                if(r.body.code === 0){
                    alert('操作成功', function(index){
                        vm.back();
                    });

                }else{
                    alert(r.body.msg);
                }
            });
        },
        back: function (event) {
            history.go(-1);
        }
    }
});