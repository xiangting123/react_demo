/**
 * Created by LCGC-04406-257-PC on 2017/4/27.
 */


$(function(){

    var banner = "banner";
    var Banner = function ( element,opt){    //opt 是DEFAULTS的值  element 是调用这个插件的元素
        this.index = 0;
        this.index2 = 1;
        this.timer = null;   //设置定时器的；
        this.hasStarted = false;
        this.$elem = $(element);   //element引用该div 而$(element)将通过jq检索他等价的元素 $('#myViewElement').
        this.option = opt;
        this.$banPicUl = $("<ul class='pic'></ul>");/*this.$elem.find(".pic").find("ul");*/
        this.$control = $("<div class='control'></div>");
        this.$dot = $("<ul class='dot'></ul>");
        this.btnA = "<div class='btnA'><span><a class='pre'></a></span><span><a class='next'></a></span></div>"
        this.imgStr1 = "<li><a><img src='"+this.option.imgSrc;
        this.imgStr2 = ".jpg'></a></li>";
    };

    //插件的默认值属性
    Banner.DEFAULTS = {
        numLi: 4,           //需要轮播的图片的数量。
        width: 650,         //banner 的宽度
        height:375,         //banner的高度
        imgSrc: "images/m_0",   //图片路径和命名格式
        speed:{
            speed1: 2000,    // 轮播的时间间隔；
            speed2: 1000     //图片切换的速度
        }
    };

    Banner.prototype.init = function(){
        this.$elem.css({"width":this.option.width,"height":this.option.height});
        this.creatPic();
        this.autoPlay();
    };

    //创建图片和圆点li
    Banner.prototype.creatPic = function(){
        var strPic = "";
        var strDot = "";
        for(var i = 1;i <= this.option.numLi;i ++){
            strPic = strPic + this.imgStr1+i+this.imgStr2;
        }
        this.$banPicUl.append(strPic);
        this.$elem.append(this.$banPicUl);
        //添加圆点

        for (var j = 1;j <= this.option.numLi;j ++){
            strDot = strDot + "<li><a></a></li>"
        }
        this.$dot.append(strDot);
        this.$control.append(this.$dot);
        this.$control.append(this.btnA);
        this.$elem.append(this.$control);
    };

    //设置自动轮播
    Banner.prototype.start = function(){
        if(!this.hasStarted){
            this.hasStarted = true;
            var that = this;
            this.timer = setInterval(function(){that.next()},this.option.speed.speed1);
        }
    };

    //设置暂停轮播
    Banner.prototype.stop = function(){
        clearInterval(this.timer);
        this.hasStarted = false;
    };

    //轮播时执行的变化
    Banner.prototype.autoPlay = function(){
        //var index2 = (this.index + 1) % this.option.numLi;
        var li = this.$banPicUl.find("li");
        $(li).eq(this.index).css({"opacity":1}).animate({"opacity":0},this.option.speed.speed2);
        $(li).eq(this.index2).css({"opacity":0}).animate({"opacity":1},this.option.speed.speed2);
        this.index = this.index2;
        this.start();
    };

    //下一张图片
    Banner.prototype.next = function(){
        this.index2 = (this.index + 1) % this.option.numLi;
        this.autoPlay();
    };

    //上一张图片
    Banner.prototype.pre = function(){
        this.index2 = (this.index - 1) % this.option.numLi;
        this.autoPlay();
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
                }, function (){
                    module.start();
                });

                module.$dot.find("li").on('click',function(){
                    var index = $(this).index();
                    module.index2 = index;
                    module.autoPlay();
                    module.stop();
                });

                //下一张图
                module.$control.find(".next").on('click',function(){
                    module.next();
                    module.stop();
                });

                //上一张图
                module.$control.find(".pre").on('click',function(){
                    module.pre();
                    module.stop();
                });
            }
        });
    };
});