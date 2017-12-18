var chatId = T.p("chatId");
var vm = new Vue({
    el:'#rrapp',
    data:{
        title:"新增banner",
        chat:{}
    },
    created: function() {
        if(chatId != null){
            this.title = "详情";
            this.getChatDetail(chatId)
        }
    },
    methods: {
        getChatDetail: function(chatId){
            this.$http.get("../adminchat/chatInfo/"+chatId).then((r) => {
                this.chat = r.body.chat;
            });
        },
        back: function (event) {
            history.go(-1);
        }
    }
});
var data = [
    {name:'10:00', value:114100},
    {name:'10:05', value:149900},
    {name:'10:10', value:226000},
    {name:'10:15', value:117000},
    {name:'10:20', value:97000},
    {name:'10:25', value:145000},
    {name:'10:30', value:114100},
    {name:'10:35', value:145000},
    {name:'10:40', value:70000},
    {name:'10:45', value:90000},
    {name:'10:50', value:115000},
    {name:'10:55', value:145000},
    {name:'11:00', value:170000},
    {name:'11:05', value:160000},
]

new sChart('canvas', 'line', data, {
    title: '/u/info(5Min)',
    bgColor: '#829dba',
    titleColor: '#ffffff',
    fillColor: '#72f6ff',
    axisColor: '#eeeeee',
    contentColor: '#bbbbbb'
});

var dataHour = [
    {name:'8:00', value:1141000},
    {name:'9:00', value:1499000},
    {name:'10:00', value:970000},
    {name:'11:00', value:1170000},
    {name:'12:00', value:970000},
    {name:'13:00', value:1450000},
    {name:'14:00', value:1141000},
    {name:'15:00', value:1450000},
    {name:'16:00', value:700000},
    {name:'17:00', value:900000}
]

new sChart('canvasHour', 'line', dataHour, {
    title: '/u/info(Hour)',
    bgColor: '#829dba',
    titleColor: '#ffffff',
    fillColor: '#72f6ff',
    axisColor: '#eeeeee',
    contentColor: '#bbbbbb'
});

var dataDay = [
    {name:'10-20', value:11410000},
    {name:'10-21', value:14990000},
    {name:'10-22', value:2600000},
    {name:'10-23', value:11700000},
    {name:'10-24', value:9700000},
    {name:'10-25', value:14500000},
    {name:'10-26', value:11410000},
    {name:'10-27', value:14500000},
    {name:'10-28', value:7000000},
    {name:'10-29', value:9000000}
]

new sChart('canvasDay', 'line', dataDay, {
    title: '/u/info(Day)',
    bgColor: '#829dba',
    titleColor: '#ffffff',
    fillColor: '#72f6ff',
    axisColor: '#eeeeee',
    contentColor: '#bbbbbb'
});
