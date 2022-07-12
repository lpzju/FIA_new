const Label={
    'vgg_16':[  //替代模型为vgg16
        ['three-toed\nsloth','ringlet','poncho','Christmas\nstocking','jigsaw\npuzzle','velvet','carousel'], //#目标模型为inceptionv3,对于7张图像的预测结果
        ['three-toed\nsloth','ringlet','jigsaw\npuzzle','green\nmamba','mosquito\nnet','quilt','brassiere'], //#目标模型为inceptionv4
        ['three-toed\nsloth','lycaenid','jigsaw\npuzzle','green\nmamba','window\nscreen','head\ncabbage','wardrobe'],//#目标模型为inceptionresnetv2
        ['three-toed\nsloth','sea\nurchin','jigsaw\npuzzle','shopping\nbasket','quilt','quilt','wardrobe'],//#目标模型为resnet50
        ['teddy','ringlet','jigsaw\npuzzle','green\nmamba','window\nscreen','snail','carousel'],//#目标模型为resnet152
        ['starfish','thimble','tool kit','Christmas\nstocking','quilt','quilt','carousel'],//#目标模型为vgg16
        ['chiton','sea\nurchin','jigsaw\npuzzle','Christmas\nstocking','mosquito\nnet','pillow','theater\ncurtain'],//#目标模型为vgg19
    ],
    'inception_v3':[ //#替代模型为inceptionv3
        ['mask','anemone','umbrella','mask','mosque','teapot','brassiere'],
        ['baboon','sea\nurchin','skunk','spindle','mosque','teapot','brassiere'],
        ['baboon','sea\nurchin','zebra','terrapin','castle','teapot','wardrobe'],
        ['panda','sea\nurchin','schipperke','hip','castle','snail','prayer\nrug'],
        ['baboon','lycaenid','bison','hip','monastery','snail','prayer\nrug'],
        ['panda','sea\nurchin','Bouvier des\nFlandres','tree\nfrog','palace','snail','comic\nbook'],
        ['gibbon','sea\nurchin','sloth\nbear','hip','castle','teapot','butcher\nshop'],
    ],
    'resnet152':[//#替代模型为resnet152
        ['komondor','sea\nurchin','skunk','apron','window\nscreen','terrapin','butcher\nshop'],
        ['standard\npoodle','sea\nurchin','bighorn','African\nchameleon','fire\nscreen','snail','theater\ncurtain'],
        ['orangutan','sea\nurchin','black bear','bib','window\nscreen','brain\ncoral','butcher\nshop'],
        ['mask','sea\nurchin','Indian\nelephant','mask','spider\nweb','brain\ncoral','theater\ncurtain'],
        ['mask','coil','jigsaw\npuzzle','backpack','electric\nfan','soccer ball','church'],
        ['otterhound','sea\nurchin','jigsaw\npuzzle','poncho','jigsaw\npuzzle','terrapin','shoe shop'],
        ['orangutan','sea\nurchin','jigsaw\npuzzle','Christmas\nstocking','jigsaw\npuzzle','snail','butcher\nshop'],
    ],
    'inception_resnet_V2':[//#替代模型为inceptionresnetv2
        ['hog','echidna','black bear','ram','mosque','shower\ncap','brassiere'],
        ['baboon','lionfish','black bear','African\nchameleon','mosque','snail','wardrobe'],
        ['hog','trilobite','greenhouse','loggerhead','mosque','snail','handkerchief'],
        ['panda','lionfish','black bear','cocker\nspaniel','catamaran','snail','triceratops'],
        ['gibbon','trilobite','black bear','African\nchameleon','maze','wooden\nspoon','flagpole'],
        ['panda','sea\nurchin','black bear','African\nchameleon','mosque','snail','butcher\nshop'],
        ['capuchin','lionfish','black bear','standard\npoodle','mosque','snail','butcher\nshop'],
    ]

}
var advRow = ['AdvImg7','AdvImg6','AdvImg5','AdvImg4','AdvImg3','AdvImg2','AdvImg1'];
const advCol = ['InceptionV3','InceptionV4','InceptionResnetV2','ResNet50','ResNet152','VGG16','VGG19'];
var modelvalue = [];
const value={
    'vgg_16':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'inception_v3':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,1,0,0,1,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'resnet152':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'inception_resnet_V2':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ]

}

var attackflag = true;//上一次结果是否生成
var Atid="";
var Btid="";
var backEof = false;
var modelvalue;
//热力图 
$('#ori_text').hide()
$('#middle_text').hide()
$('#adv_text').hide()
// 

var vm={
    tab: 0,
    tabitems: [
        {title:"攻击简介"},
        {title:"对抗性图像生成"},
        {title:"方案原理"},
        {title:"结果展示"},
    ],
    spec:[],
    digi_accspecstage: 0,hw_accspecstage:[0,0,0,0],
    recognition:[[' ','等待预处理信号',' ']],
    inPreprocessing:false,
    preprocessed:false,
    recoState:[false],
    recoColor:[['','','']],
    recoDark:[false],
    inPasswordAnimation:false,
    inHotwordAnimation:false,
    hotwordDetected:false,
    inReconstructAnimation:false,
    recostarted:false,
    reconstructed:false,

    
    // models:[{name:'InceptionV3',processing:false},{name:'InceptionV4',processing:false},{name:'InceptionResnetV2',processing:false},
    // {name:'ResNet50',processing:false},{name:'ResNet152',processing:false},{name:'VGG16',processing:false},{name:'VGG19',processing:false}]
    imgs:['AdvImg1','AdvImg2','AdvImg3','AdvImg4','AdvImg5','AdvImg6','AdvImg7'],
    // img_names:[1,3,7,12,17,18,20],
    img_names:[1,2,3,4,5,6],
    ground_truth:['panda','gondola','lycaenid','coot','lorikeet','ballplayer'],
    sourceModel: "VGG16",
    // ground_truth:['panda','lycaenid','ostrich','lycaenid','monastery','espresso','military uniform'],

}

function at(w,x,y,c){
    return y*w*4+x*4+c
}

function req(fn){
    // var ret = "{{ url_for('static',filename='res/') }}" + fn
    // console.log("这是："+ret)
    return '/static/res/'+fn+'?t='+Math.random()
    // return 'http://10.99.140.140:14140/static/res/'+fn+'?t='+Math.random()

}
     
function colormap(r){
    var h = Math.floor(r*120+240)%360
    var s = Math.floor(100-10*r)
    var l = Math.floor(10+r*40)
    var ret = 'hsl('+h+','+s+'%,'+l+'%)'
    //console.log(ret)
    return ret
}
function brightcolormap(r){
    var h = Math.floor(-r*60+60)%360
    var s = Math.floor(100-10*r)
    var l = Math.floor(40+r*20)
    var ret = 'hsl('+h+','+s+'%,'+l+'%)'
    //console.log(ret)
    return ret
}
function colormapa(r,a){
    var h = Math.floor(r*120+240)%360
    var s = Math.floor(100-10*r)
    var l = Math.floor(10+r*40)
    var ret = 'hsla('+h+','+s+'%,'+l+'%,'+a+')'
    //console.log(ret)
    return ret
}



function cvxFadeinImg2(cvxid,imgsrc,duration,start_time,x,y,w,h){
    var cvx = document.getElementById(cvxid)
    var ctx = cvx.getContext('2d')

    var img_x=Number(x)
    var img_y=Number(y)
    var img_w=Number(w)
    var img_h=Number(h)

    var w = Number(cvx.getAttribute('width'))
    var h = Number(cvx.getAttribute('height'))

    // console.log([img_x,img_y,img_w,img_h]);
    // console.log(cvx);

    var img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = req(imgsrc)

    img.onload = function(){
        var tmpcvx = document.createElement('canvas')
        tmpcvx.width = w; tmpcvx.height = h;
        var tmpctx = tmpcvx.getContext('2d')
        tmpctx.drawImage(img,img_x,img_y,img_w,img_h)
        var newframe = tmpctx.getImageData(img_x,img_y,img_w,img_h)
        var oldframe = ctx.getImageData(img_x,img_y,img_w,img_h)

        var draw = function(t){
            ret = function(){
                var frame = ctx.createImageData(img_w,img_h)
                for(var y=0;y<img_h;y++){
                    for(var x=0;x<img_w;x++){
                        for(var c=0;c<4;c++)
                        frame.data[at(img_w,x,y,c)] = t*newframe.data[at(img_w,x,y,c)]
                            + (1-t)*oldframe.data[at(img_w,x,y,c)]
                    }
                }
                ctx.putImageData(frame,img_x,img_y)
            }
            return ret
        }
        var nframe = duration/10
        for (var f=0;f<nframe;f++){
            setTimeout(draw(f/nframe),f*10+start_time)
        }
    }
}
function cvxWipeImg2(cvxid,imgsrc,duration,start_time,x,y,w,h){
    var cvx = document.getElementById(cvxid)
    var ctx = cvx.getContext('2d')

    var img_x=Number(x)
    var img_y=Number(y)
    var img_w=Number(w)
    var img_h=Number(h)

    var w = Number(cvx.getAttribute('width'))
    var h = Number(cvx.getAttribute('height'))

    // console.log([img_x,img_y,img_w,img_h])
    var img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = req(imgsrc)

    img.onload = function(){
        var tmpcvx = document.createElement('canvas')
        tmpcvx.width = w; tmpcvx.height = h;
        var tmpctx = tmpcvx.getContext('2d')
        tmpctx.drawImage(img,img_x,img_y,img_w,img_h)
        var imgdata = tmpctx.getImageData(img_x,img_y,img_w,img_h).data

        var draw = function(i,tmp_w){
            ret = function(){
                var frame = ctx.getImageData(img_x,img_y,img_w,img_h)
                for(var y=0;y<img_h;y++){
                    for(var x=0;x<(i>img_w?img_w:i);x++){
                        for(var c=0;c<4;c++){
                            frame.data[at(img_w,x,y,c)] = imgdata[at(img_w,x,y,c)]
                        }
                    }
                    // console.log(x)
                }

                var l = (i-(tmp_w))<0?0:i-(tmp_w)
                var r = i>=img_w?(img_w):i
                // console.log([l,r])
                for(var y=0;y<img_h;y++){
                    for(var x=l;x<r;x++){
                        for(var c=0;c<4;c++){
                            var co = imgdata[at(img_w,x,y,c)]
                            co = (co-50)%256
                            frame.data[at(img_w,x,y,c)] = co
                        }
                    }
                }
                ctx.putImageData(frame,img_x,img_y)
            }
            return ret
        }
        var timePerFrame=100
        var nframe = duration/timePerFrame
        var tmp_w=10
        var dx = (img_w)/nframe
        for (var f=0;f<nframe;f++){
            setTimeout(draw(f*dx+dx,tmp_w),f*timePerFrame+start_time)
        }
    }
}
function showOriFig(){
    $('#ori_text').show()
    w=100
    for (var i=0;i<10;i++){
            name=vm.img_names[i]
            this.cvxFadeinImg2('digi-accplot','tmp/ori/'+name+'.png',1800,0*1800,w*i,0,80,80)
    }

    var cvx = document.getElementById('digi-accplot')
    var ctx = cvx.getContext('2d')
    ctx.font="18px Times";
    ctx.fillStyle = "#FFFFFF";
    for (var i=0;i<7;i++){
        label=vm.ground_truth[i];
        ctx.fillText(label,w*i+5,110)
    }
}

function showFeaFig(){
    var obj=document.getElementById("sourcemodel")
    // console.log("obj为"+obj)
    vm.sourceModel=obj.options[obj.selectedIndex].value
    // console.log("vm为"+vm.sourceModel)

    w=100
    for (var i=0;i<7;i++){
        name=vm.img_names[i]
            // console.log('tmp/'+vm.sourceModel+'/'+name+'_feature_0.png')
        // this.cvxFadeinImg2('digi-accspec','tmp/'+vm.sourceModel+'/'+name+'_feature_0.png',1600,0*1600,w*i,0,80,80)
        this.cvxFadeinImg2('digi-accspec','tmp/adv/'+Atid+'/'+name+'_feature_1.png',1600,0*1600,w*i,0,80,80)
    }
}

function optimize(){

    w=100
    t=1000
    flag = true
    for(var f=1;f<10;f++){
        for(var i=0;i<7;i++){
            name=vm.img_names[i]
            // console.log('tmp/'+vm.sourceModel+'/'+name+'_feature_'+f+'.png')
            // this.cvxWipeImg2('digi-accspec','tmp/'+vm.sourceModel+'/'+name+'_feature_'+f+'.png',t,(t+500)*f,w*i,0,80,80)
            this.cvxWipeImg2('digi-accspec','tmp/adv/'+Atid+'/'+name+'_feature_'+f+'.png',t,(t+500)*f,w*i,0,80,80)
        }
    if(f == 9) flag = false;
    }
    while(flag){
        console.log("waiting");
    };
}

function showAdvFig(){
    w=100
    for (var i=0;i<7;i++){
            name=vm.img_names[i]
            // this.cvxFadeinImg2('digi-slice','tmp/'+vm.sourceModel+'/'+name+'_9.png',2000,0*2000,w*i,0,80,80)
        // this.cvxFadeinImg2('digi-slice','tmp/adv/'+name+'_9.png',2000,0*2000,w*i,0,80,80)
        // this.cvxFadeinImg2('digi-slice','tmp/adv/'+Atid+'/'+name+'_1.png',2000,0*2000,w*i,0,80,80)
        this.cvxFadeinImg2('digi-slice','tmp/adv/'+Atid+'/'+name+'.png',2000,0*2000,w*i,0,80,80)
    }

    var cvx = document.getElementById('digi-slice')
    var ctx = cvx.getContext('2d')
    ctx.fillStyle = "#FFFFFF";
    ctx.font="18px Times";
    for (var i=0;i<7;i++){
        img=vm.imgs[i]
        // ctx.fillStyle = '#ffffff';
        ctx.fillText(img, 16+w*i,165)
    }
}



function opt() {
    var modal = $('#sourcemodel option:selected').val();
    var layer = $('#second option:selected').text();
    var move = document.getElementById('max_move').value;
    var times = document.getElementById('move_times').value;
    var steps = document.getElementById('step_times').value;

    console.log("对抗样本生成参数确认：");
    console.log(modal, layer, move, times, steps);
    if(modal.length==0){
        alert("请选择替代模型！"); return;
    }
    else if(!move||!times||!steps){
        alert("输入选项为空！"); return;
    }

    data = {
        modal: modal,
        layer: layer,
        max_mv: move,
        mv_times: times,
        stp_times: steps,
    };
    $.ajax({
        type: "POST",
        cache: false,
        data: data,
        url: "/",
        datatype: "json",
        success: function (res) {
            console.log('----opt res----');
            res=JSON.parse(res);
            console.log(res);
            Atid = res.tid;
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        }
    })
    advresult();
}

function advresult(){
    var Eofdata;
    var timer=setInterval(()=>{
        data_adv = {
            tid: Atid
        }
        $.ajax({
            type: "POST",
            cache: false,
            data: data_adv,
            url: "/get_advresult",
            dataType: "json",

            success: function (res) {
                //判断结束标志
                Eofdata = res.Eof;
                console.log('Eofdata为'+Eofdata)
            }
        })
        if (Eofdata==true){
            clearInterval(timer);
            $('#middle_text').show();
            $('#adv_text').show();
            showFeaFig();
            optimize();
            showAdvFig()
        }
    }, 200000);

}

function nextChange() {
    var first = document.getElementById("sourcemodel");
    var second = document.getElementById("second");
    second.options.length = 0; // 清除second下拉框的所有内容
    if (first.selectedIndex == 1) {
        second.options.add(new Option("conv1_2", "0", false, true));  // 默认选中区
        second.options.add(new Option("conv2_2", "4"));
        second.options.add(new Option("conv3_3", "2"));
        second.options.add(new Option("conv4_3", "2"));
        second.options.add(new Option("conv5_3", "1"));
    }

    if (first.selectedIndex == 2) {
        second.options.add(new Option("conv2d_2b", "0", false, true));  // 默认选中区
        second.options.add(new Option("conv2d_4a", "1"));
        second.options.add(new Option("mixed_5b", "2"));
        second.options.add(new Option("mixed_6a", "3"));
        second.options.add(new Option("mixed_7a", "4"));
    }

    if (first.selectedIndex == 3) {
        second.options.add(new Option("conv2d_2b", "0", false, true));  // 默认选中区
        second.options.add(new Option("conv2d_4a", "1"));
        second.options.add(new Option("mixed_5b", "2"));
        second.options.add(new Option("mixed_6a", "3"));
        second.options.add(new Option("mixed_7a", "4"));
    }

    if (first.selectedIndex == 4) {
        second.options.add(new Option("block1/unit_3", "0", false, true));  // 默认选中区
        second.options.add(new Option("block1/unit_8", "1"));
        second.options.add(new Option("block1/unit_18", "2"));
        second.options.add(new Option("block1/unit_36", "3"));
        second.options.add(new Option("block1/unit_3", "4"));
    }
}
function heatmappshow(BackboxResult, model_names){
    
    var data1 = [];
    var heatmapData1 = [];
    var advRow1 = ["img_1","img_2","img_3","img_4","img_5","img_6","img_7"];
    var advCol1 = [];
    var i = 0
    for (var key in BackboxResult){
        advCol1.push(key);
        for( var j =0 ;j <7 ;j++){
            data1.push([i,j,BackboxResult[key]["img_"+(j+1)]["label"]]);
            if ( ["three-toed sloth","Christmas stocking",'jigsaw puzzle','sea urchin','shopping basket','mosquito net','standard poodle'].indexOf(BackboxResult[key]["img_"+(j+1)]["label_name"])>=0){
                BackboxResult[key]["img_"+(j+1)]["label_name"]=BackboxResult[key]["img_"+(j+1)]["label_name"].replace(/ /g, '\n');};
                
            heatmapData1.push([i,j,BackboxResult[key]["img_"+(j+1)]["label_name"]]);
        
        }
        i = i + 1;
    }
   
    var HeapDom = document.getElementById('heatmap');
    var heapChart = echarts.init(HeapDom);
    option = {
    tooltip: {
        position: 'top'
    },
    grid: {
        height: '60%',
        top: '20%',
        left:"15%"
    },
    xAxis: {
        name:"目标模型",
        nameLocation:'middle',
        nameTextStyle:{
            fontSize: 20,
            color: "white",
            fontWeight: "bolder",
            textBorderColor: "white",
            textBorderWidth: 0.5,
            textBorderType: "solid",                
        },
        nameGap:30,
        type: 'category',
        data: advCol1,
        axisLabel: {
            rotate:8,
            fontSize: 14,
            color: "white",
            fontWeight: "bolder",
            textBorderColor: "rgba(139, 238, 103, 0.98)",
            textBorderWidth: 0.2,
            textBorderType: "solid",
            
        },
        position:'top',
        splitArea: {
        show: true
        }
    },
    yAxis: {
        type: 'category',
        data: advRow1,
        axisLabel: {
            fontSize: 14,
            color: "white",
            fontWeight: "bolder",
            textBorderColor: "white",
            textBorderWidth: 0.2,
            textBorderType: "solid",
            
        },
        splitArea: {
        show: true
        }
    },
    visualMap: {
        show:false,
        min: 0,
        max: 1,
        seriesIndex:[1],
        orient: 'horizontal',
        color:['#3CB371','#B22222'],
        left: 'center',
        bottom: '15%'
    },
    series: [
        {
        name: 'wat',
        type: 'scatter',
        symbolSize:0.01,
        animationDuration: 3000,
        data: heatmapData1,
        label: {
            show: true,
            formatter: function (param) {
            return param.value[2];
            },
            fontSize:13,
            fontStyle:{
            
            }
        },
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        },
        {
        
        type: 'heatmap',
        data: data1,
        animationDuration: 3000,
        itemStyle:{
            borderWidth:2,
            borderColor:'#fff',
            opacity:1.0,
        },
        label: {
            show: false,
            formatter: function (params) {
            return params.value[2] + '\n\n';
            },
        },
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };
    heapChart.setOption(option);
}

function backboxresult(){
    
    var timer1=setInterval(()=>{
        data2={
            tid:Btid
        }
        console.log("Btid:",Btid);
        $.ajax({
            type: "POST",
            cache: false,
            data: data2,
            url: "/get_backboxdata",
            dataType: "json",

            success: function (res) {
                //判断结束标志
                backEof = res.Eof;
                BackboxResult = res.BackboxResult;
                console.log('展示对抗攻击结果');
                console.log(res);
            }
        });
        if(backEof == true){
            clearInterval(timer1);
            timer1=null;
            $("#backboxloading").hide();
            $('#heatmap').show();
            heatmappshow(BackboxResult,modelvalue);
            $('.filebtn1').removeAttr("disabled").css({"background-color":"transparent", "cursor": "default"});
        };
    },20000);
}
function showPreResult(){
    var modellist = document.getElementsByName("method");//输入模型
    for (var i=0;i<modellist.length;i++){
        if (modellist[i].checked) modelvalue.push(modellist[i].value);
    }
    console.log("参数确认：")
    console.log(modelvalue);
    if(modelvalue.length == 0 ){
        alert("请确认输入选项不为空！"); return;
    }
    if(Atid == "" ){
        alert("请先生成对抗样本"); return;
    }
    else {
        // 防止重复提交
        $('.filebtn1').attr("disabled", true).css({"background-color": "grey", "cursor": "no-drop"});
        event.stopPropagation();
    }
    data={
        model_names:JSON.stringify(modelvalue),
        Atid:Atid
    };
    console.log(data);
    $("#backboxloading").show();
    $("#heatmap").hide();
    $.ajax({
        type: "POST",
        cache: false,
        data: data,
        url: "/post_backbox",
        dataType: "json",
        success: function (res) {
            console.log('----res----');
            console.log(res);
            Btid = res.tid;
            if (res.status == "error"){
                alert("请先生成对抗样本！"); 
                $('.filebtn1').removeAttr("disabled").css({"background-color":"transparent", "cursor": "default"});
                $("#backboxloading").hide();
                $("#heatmap").show();
                return;
            }
            else{
                backboxresult();
            };
            }
        
    });
    
};

