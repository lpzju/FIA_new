const Label={
    'VGG16':[  //替代模型为vgg16
        ['three-toed\nsloth','ringlet','poncho','Christmas\nstocking','jigsaw\npuzzle','velvet','carousel'], //#目标模型为inceptionv3,对于7张图像的预测结果
        ['three-toed\nsloth','ringlet','jigsaw\npuzzle','green\nmamba','mosquito\nnet','quilt','brassiere'], //#目标模型为inceptionv4
        ['three-toed\nsloth','lycaenid','jigsaw\npuzzle','green\nmamba','window\nscreen','head\ncabbage','wardrobe'],//#目标模型为inceptionresnetv2
        ['three-toed\nsloth','sea\nurchin','jigsaw\npuzzle','shopping\nbasket','quilt','quilt','wardrobe'],//#目标模型为resnet50
        ['teddy','ringlet','jigsaw\npuzzle','green\nmamba','window\nscreen','snail','carousel'],//#目标模型为resnet152
        ['starfish','thimble','tool kit','Christmas\nstocking','quilt','quilt','carousel'],//#目标模型为vgg16
        ['chiton','sea\nurchin','jigsaw\npuzzle','Christmas\nstocking','mosquito\nnet','pillow','theater\ncurtain'],//#目标模型为vgg19
    ],
    'InceptionV3':[ //#替代模型为inceptionv3
        ['mask','anemone','umbrella','mask','mosque','teapot','brassiere'],
        ['baboon','sea\nurchin','skunk','spindle','mosque','teapot','brassiere'],
        ['baboon','sea\nurchin','zebra','terrapin','castle','teapot','wardrobe'],
        ['panda','sea\nurchin','schipperke','hip','castle','snail','prayer\nrug'],
        ['baboon','lycaenid','bison','hip','monastery','snail','prayer\nrug'],
        ['panda','sea\nurchin','Bouvier des\nFlandres','tree\nfrog','palace','snail','comic\nbook'],
        ['gibbon','sea\nurchin','sloth\nbear','hip','castle','teapot','butcher\nshop'],
    ],
    'ResNet152':[//#替代模型为resnet152
        ['komondor','sea\nurchin','skunk','apron','window\nscreen','terrapin','butcher\nshop'],
        ['standard\npoodle','sea\nurchin','bighorn','African\nchameleon','fire\nscreen','snail','theater\ncurtain'],
        ['orangutan','sea\nurchin','black bear','bib','window\nscreen','brain\ncoral','butcher\nshop'],
        ['mask','sea\nurchin','Indian\nelephant','mask','spider\nweb','brain\ncoral','theater\ncurtain'],
        ['mask','coil','jigsaw\npuzzle','backpack','electric\nfan','soccer ball','church'],
        ['otterhound','sea\nurchin','jigsaw\npuzzle','poncho','jigsaw\npuzzle','terrapin','shoe shop'],
        ['orangutan','sea\nurchin','jigsaw\npuzzle','Christmas\nstocking','jigsaw\npuzzle','snail','butcher\nshop'],
    ],
    'InceptionResNetV2':[//#替代模型为inceptionresnetv2
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

const value={
    'VGG16':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'InceptionV3':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,1,0,0,1,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'ResNet152':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ],
    'InceptionResNetV2':[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ]

}

//热力图 

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
    img_names:[1,3,7,12,17,18,20],
    sourceModel: "VGG16",
    ground_truth:['panda','lycaenid','ostrich','lycaenid','monastery','espresso','military uniform'],

}

function at(w,x,y,c){
    return y*w*4+x*4+c
}

function req(fn){
    return 'http://127.0.0.1:5501/res/'+fn+'?t='+Math.random()
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

        // console.log([img_x,img_y,img_w,img_h])

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
        vm.sourceModel=obj.options[obj.selectedIndex].value

        w=100
        for (var i=0;i<7;i++){
                name=vm.img_names[i]
                this.cvxFadeinImg2('digi-accspec','tmp/'+vm.sourceModel+'/'+name+'_feature_0.png',1600,0*1600,w*i,0,80,80)                         
        }

       
    }
    function optimize(){
        
        w=100
        t=1000
        flag = true
        for(var f=1;f<10;f++){
            for(var i=0;i<7;i++){
                name=vm.img_names[i]
                this.cvxWipeImg2('digi-accspec','tmp/'+vm.sourceModel+'/'+name+'_feature_'+f+'.png',t,(t+500)*f,w*i,0,80,80)
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
                this.cvxFadeinImg2('digi-slice','tmp/'+vm.sourceModel+'/'+name+'_9.png',2000,0*2000,w*i,0,80,80)                         
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
    function showPreResult(){
        var opt = $("#sourcemodel option:selected").val();
        //console.log(opt+"haha");
        var tempdata = Label[opt];
        
        var tempH = value[opt];
        var heatmapData = [];
        var data = []
        for(i = 0;i<7;i++)
            for(j = 0;j<7;j++){
                heatmapData.push([i,j,tempdata[i][j]]);
                console.log(i+"和"+j+"he"+tempdata[i][j]);
                data.push([i,j,tempH[i][j]]);
            }

        // 
        var HeapDom = document.getElementById('heap');
        var heapChart = echarts.init(HeapDom);
        option = {
        tooltip: {
            position: 'top'
        },
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            name:"目标模型",
            nameLocation:'middle',
            nameTextStyle:{
                fontSize: 20,
                color: "rgba(4, 249, 208, 1)",
                fontWeight: "bolder",
                textBorderColor: "rgba(139, 238, 103, 0.98)",
                textBorderWidth: 0.5,
                textBorderType: "solid",                
            },
            nameGap:30,
            type: 'category',
            data: advCol,
            axisLabel: {
                rotate:8,
                fontSize: 10,
                color: "rgba(4, 249, 208, 1)",
                fontWeight: "bolder",
                textBorderColor: "rgba(139, 238, 103, 0.98)",
                textBorderWidth: 0.5,
                textBorderType: "solid",
                
            },
            position:'top',
            splitArea: {
            show: true
            }
        },
        yAxis: {
            type: 'category',
            data: advRow,
            axisLabel: {
                fontSize: 10,
                color: "rgba(4, 249, 208, 1)",
                fontWeight: "bolder",
                textBorderColor: "rgba(139, 238, 103, 0.98)",
                textBorderWidth: 0.5,
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
            data: heatmapData,
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
            data: data,
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



