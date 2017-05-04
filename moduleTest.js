/**
 * Created by LCGC-04406-257-PC on 2017/4/27.
 */


$(function(){

    var banner = "banner";
    var Banner = function ( element,opt){    //opt 是DEFAULTS的值  element 是调用这个插件的元素
        //this.num = 4;  //需要轮播的图片的数量。
        this.index = 0;
        this.abc = 10;
        //this.speedBan = 1500;  //图片切换的速度
        //this.speed = 4000;   // 轮播的时间间隔；
        this.timer = null;   //设置定时器的；
        this.hasStarted = false;
        //this.banner = className;
        //console.log(this.options.numLi)
        //this.ele = element;
        this.$elem = $(element);   //this.el引用该div 而$(this.el)将通过jq检索他等价的元素 $('#myViewElement').
        this.option = opt;
        this.banPicUl = this.$elem.find("ul");
        this.imgStr1 = "<li><a><img src='images/m_0";
        this.imgStr2 = ".jpg'></a></li>";
        console.log("Banner");
        console.log(this.$elem);
        this.creatPic();
        this.init();
    };

    //插件的默认值属性
    Banner.DEFAULTS = {
        //bannerContent: $(".banner"),
        numLi: 4,
        speed:{
            speed1: 4000,
            speed2: 1500
        }
    };
    Banner.prototype.init = function(){
        this.autoPlay();
        //setInterval(this.autoPlay(), 1000);

    };

    //设置自动轮播
    Banner.prototype.start = function(){
        if(!this.hasStarted){
            this.hasStarted = true;
            var that = this;
            this.timer = setInterval(function(){that.autoPlay()},this.option.speed.speed1);
        }
    };

    //设置暂停轮播
    Banner.prototype.stop = function(){
        clearInterval(this.timer);
        this.hasStarted = false;
    };

    //创建图片li
    Banner.prototype.creatPic = function(){
        console.log("creatPic");
        var str = "";
        for(var i = 1;i <= this.option.numLi;i ++){
            str = str + this.imgStr1+i+this.imgStr2;
        }
        this.banPicUl.append(str);
        //添加圆点
        for (var i = 1;i <= this.option.numLi;i ++){
            str = str + "<li><a></a></li>"
        }
    };

    //轮播时执行的变化
    Banner.prototype.autoPlay = function(){
        console.log("autoPlay");
        var index2 = (this.index + 1) % this.option.numLi;
        var li = this.banPicUl.find("li");
        $(li).eq(this.index).css({"opacity":1}).animate({"opacity":0},this.option.speed.speed2);
        $(li).eq(index2).css({"opacity":0}).animate({"opacity":1},this.option.speed.speed2);
        this.index = index2;
        this.start();

    };

    //插件的扩展方法名称.调用的时候可以("#domName").easySlider({})，
    // 或者("#domName").easySlider({})，或者(".domName").easySlider({})
    // 或者更多的方式来调用这个插件。
    $.fn[banner] = function(options){   //options 是传入的用户设置的初始值
        return this.each(function(){
            var $this = $(this);
            var module = $this.data( banner ); //获取banner的数据，将数据赋给module
            var opts = null;
            if( !!module ){
                if ( typeof options === 'string' ) {
                    module[options]();
                } else {
                    throw 'unsupported options!';
                }
            } else {
                //继承，静态方法表示继承, 目标对象opts将拥有源对象Banner.DEFAULTS的所有属性和方法。
                // typeof 返回数据的类型
                opts = $.extend( {}, Banner.DEFAULTS, ( typeof options === 'object' && options ));
                module = new Banner(this, opts);   //新建一个对象
                $this.data( banner, module );   //向备选元素$this附加数据

                //初始化数据
                module.init();

                //注册事件，鼠标移动到图片时停止播放
                module.$elem.hover(function (){
                    module.stop();
                    console.log("stop")
                }, function (){
                    module.start();
                    console.log("start")
                });

                module.$elem.on('click',function(){
                    console.log(module.abc)
                });
            }
        });
    };
});