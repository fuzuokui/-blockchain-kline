var bType = T.p("bType");
var vm = new Vue({
    el:'#rrapp',
    data:{
        klineData:[{
            "name": "2017-12-17 20:02:55",
            "value": "52.21"
        }]
    },
    created: function() {//初始化日期选择控件 common.js
        initDaterangepicker("daterangepicker","startTime","endTime","searchDateRange");
        console.log("======");
        //this.title = "详情";
        this.getKLineData();

    },
    methods: {
        getKLineData: function(){
            this.$http.get("../kline/getklinedata?bType="+bType).then((r) => {
                this.klineData = r.body.klineData;

// 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            var data = this.klineData;
            var dateList = data.map(function (item) {
                return item[0];
            });
            var valueList = data.map(function (item) {
                return item[1];
            });

            var option = {

                // Make gradient line here
                visualMap: [{
                    show: false,
                    //calculable: true,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 400
                }],


                title: [{
                    left: 'center',
                    text: bType
                }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: dateList
                }],
                yAxis: [{
                    splitLine: {show: false},
                    min: 50,
                }],
                grid: [{
                    bottom: '30%'
                }],
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: valueList
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        });
        },
        back: function (event) {
            history.go(-1);
        }
    }
});



