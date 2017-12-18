var vm = new Vue({
    el:'#rrapp',
    data:{
        //title:"新增banner",
        klineData:[{
            "name": "2017-12-17 20:02:55",
            "value": "52.21"
        }]
    },
    created: function() {
            //this.title = "详情";
        this.getKLineData();

    },
    methods: {
        getKLineData: function(){
            this.$http.get("../kline/getklinedata").then((r) => {
                this.klineData = r.body.klineData;
            //console.log(this.klineData);
            new sChart('canvas', 'line', this.klineData, {
                title: '/u/info(5Min)',
                bgColor: '#829dba',
                titleColor: '#ffffff',
                fillColor: '#72f6ff',
                axisColor: '#eeeeee',
                contentColor: '#bbbbbb'
            });
        });
        },
        back: function (event) {
            history.go(-1);
        }
    }
});

//var data = [
//    {name:'10:00', value:114100},
//    {name:'10:05', value:149900},
//    {name:'10:10', value:226000},
//    {name:'10:15', value:117000},
//    {name:'10:20', value:97000},
//    {name:'10:25', value:145000},
//    {name:'10:30', value:114100},
//    {name:'10:35', value:145000},
//    {name:'10:40', value:70000},
//    {name:'10:45', value:90000},
//    {name:'10:50', value:115000},
//    {name:'10:55', value:145000},
//    {name:'11:00', value:170000},
//    {name:'11:05', value:160000},
//]

