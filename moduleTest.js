/**
 * Created by LCGC-04406-257-PC on 2017/4/27.
 */


$(function(){

    var banner = "banner";
    var Banner = function ( element,opt){    //opt ��DEFAULTS��ֵ  element �ǵ�����������Ԫ��
        //this.num = 4;  //��Ҫ�ֲ���ͼƬ��������
        this.index = 0;
        this.abc = 10;
        //this.speedBan = 1500;  //ͼƬ�л����ٶ�
        //this.speed = 4000;   // �ֲ���ʱ������
        this.timer = null;   //���ö�ʱ���ģ�
        this.hasStarted = false;
        //this.banner = className;
        //console.log(this.options.numLi)
        //this.ele = element;
        this.$elem = $(element);   //this.el���ø�div ��$(this.el)��ͨ��jq�������ȼ۵�Ԫ�� $('#myViewElement').
        this.option = opt;
        this.banPicUl = this.$elem.find("ul");
        this.imgStr1 = "<li><a><img src='images/m_0";
        this.imgStr2 = ".jpg'></a></li>";
        console.log("Banner");
        console.log(this.$elem);
        this.creatPic();
        this.init();
    };

    //�����Ĭ��ֵ����
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

    //�����Զ��ֲ�
    Banner.prototype.start = function(){
        if(!this.hasStarted){
            this.hasStarted = true;
            var that = this;
            this.timer = setInterval(function(){that.autoPlay()},this.option.speed.speed1);
        }
    };

    //������ͣ�ֲ�
    Banner.prototype.stop = function(){
        clearInterval(this.timer);
        this.hasStarted = false;
    };

    //����ͼƬli
    Banner.prototype.creatPic = function(){
        console.log("creatPic");
        var str = "";
        for(var i = 1;i <= this.option.numLi;i ++){
            str = str + this.imgStr1+i+this.imgStr2;
        }
        this.banPicUl.append(str);
        //���Բ��
        for (var i = 1;i <= this.option.numLi;i ++){
            str = str + "<li><a></a></li>"
        }
    };

    //�ֲ�ʱִ�еı仯
    Banner.prototype.autoPlay = function(){
        console.log("autoPlay");
        var index2 = (this.index + 1) % this.option.numLi;
        var li = this.banPicUl.find("li");
        $(li).eq(this.index).css({"opacity":1}).animate({"opacity":0},this.option.speed.speed2);
        $(li).eq(index2).css({"opacity":0}).animate({"opacity":1},this.option.speed.speed2);
        this.index = index2;
        this.start();

    };

    //�������չ��������.���õ�ʱ�����("#domName").easySlider({})��
    // ����("#domName").easySlider({})������(".domName").easySlider({})
    // ���߸���ķ�ʽ��������������
    $.fn[banner] = function(options){   //options �Ǵ�����û����õĳ�ʼֵ
        return this.each(function(){
            var $this = $(this);
            var module = $this.data( banner ); //��ȡbanner�����ݣ������ݸ���module
            var opts = null;
            if( !!module ){
                if ( typeof options === 'string' ) {
                    module[options]();
                } else {
                    throw 'unsupported options!';
                }
            } else {
                //�̳У���̬������ʾ�̳�, Ŀ�����opts��ӵ��Դ����Banner.DEFAULTS���������Ժͷ�����
                // typeof �������ݵ�����
                opts = $.extend( {}, Banner.DEFAULTS, ( typeof options === 'object' && options ));
                module = new Banner(this, opts);   //�½�һ������
                $this.data( banner, module );   //��ѡԪ��$this��������

                //��ʼ������
                module.init();

                //ע���¼�������ƶ���ͼƬʱֹͣ����
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