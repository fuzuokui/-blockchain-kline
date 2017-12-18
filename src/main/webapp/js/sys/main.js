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
            //new sChart('canvas', 'line', this.klineData, {
            //    title: '/u/info(5Min)',
            //    bgColor: '#829dba',
            //    titleColor: '#ffffff',
            //    fillColor: '#72f6ff',
            //    axisColor: '#eeeeee',
            //    contentColor: '#bbbbbb'
            //});

// 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            //var data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
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
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 400
                }, {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 1,
                    dimension: 0,
                    min: 0,
                    max: dateList.length - 1
                }],


                title: [{
                    left: 'center',
                    text: 'EOS'
                }, {
                    top: '55%',
                    left: 'center',
                    text: 'Gradient along the x axis'
                }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: dateList
                }, {
                    data: dateList,
                    gridIndex: 1
                }],
                yAxis: [{
                    splitLine: {show: false},
                    min: 50,
                }, {
                    splitLine: {show: false},
                    gridIndex: 1
                }],
                grid: [{
                    bottom: '60%'
                }, {
                    top: '60%'
                }],
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: valueList
                }, {
                    type: 'line',
                    showSymbol: false,
                    data: valueList,
                    xAxisIndex: 1,
                    yAxisIndex: 1
                }]
            };


//////////////////////////

// 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

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



// 指定图表的配置项和数据
//var option = {
//    title: {
//        text: 'ECharts 入门示例'
//    },
//    tooltip: {},
//    legend: {
//        data:['销量']
//    },
//    xAxis: {
//        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//    },
//    yAxis: {},
//    series: [{
//        name: '销量',
//        type: 'bar',
//        data: [5, 20, 36, 10, 10, 20]
//    }]
//};


////////////////////////




