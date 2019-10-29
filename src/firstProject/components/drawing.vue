<template>
  <div class="scrawl-main" id="scrawl-main">
    <div class="drawing">
      <div class="drawBoard border_style" >
        <canvas id="canvas-borad" class="brushBorad">
        </canvas>
        <div class="picBoard" id="picBoard" style=""></div>
      </div>

      <div class="operateBar">
        <button id="J_prevStep" class="prevStep" title="上一步" @click="gotoPrevStep" >
          <em class="icon"></em>
        </button>
        <button id="J_nextStep" class="nextStep" title="下一步" @click="gotoNextStep" >
          <em class="icon"></em>
        </button>

        <button id="J_clearBoard" class="clearBoard" title="清空" @click="clearBoard" >
          <em class="icon"></em>
        </button>
        <!--<span id="J_sacleBoard" class="scaleBoard">-->
        <!--<em class="icon"></em>-->
        <!--<em class="text">缩放背景</em>-->
        <!--</span>-->
      </div>
    </div>
    <div class="drawToolbar border_style">
      <div class="settiing ">
        <div class="colorBar layout" >
        <span v-for="(item,index) in colorData" :key="index" :data-color="item" @click="setColor(item,index)" :class="colorIndex==(index||0)?'active':''"
              :style="{background:item}" ></span>
        </div>
        <div class="layout">
          <div class="sectionBar">
            <em class="brushIcon"></em>
            <!--画笔大小-->
            <a href="javascript:void(0)" @click="setSize(1)" class="brush-size size1"></a>
            <a href="javascript:void(0)" @click="setSize(3)" class="brush-size size2"></a>
            <a href="javascript:void(0)" @click="setSize(5)" class="brush-size size3"></a>
            <a href="javascript:void(0)" @click="setSize(7)" class="brush-size size4"></a>
          </div>
          <div class="sectionBar">
            <!--橡皮擦-->
            <em class="eraserIcon"></em>
            <a href="javascript:void(0)" @click="eraserSize(5)" class="eraser-size size1"></a>
            <a href="javascript:void(0)" @click="eraserSize(10)" class="eraser-size size2"></a>
            <a href="javascript:void(0)" @click="eraserSize(15)" class="eraser-size size3"></a>
            <a href="javascript:void(0)" @click="eraserSize(20)" class="eraser-size size4"></a>
          </div>
        </div>

        <div class="layout">
          <div class="sectionBar">
            <!--虚化-->
            <em class="blurIcon"></em>
            <a href="javascript:void(0)" @click="setShadow(0)" class="blur-size size1"></a>
            <a href="javascript:void(0)" @click="setShadow(2)" class="blur-size size2"></a>
            <a href="javascript:void(0)" @click="setShadow(4)" class="blur-size size3"></a>
            <a href="javascript:void(0)" @click="setShadow(6)" class="blur-size size4"></a>
          </div>
          <div class="sectionBar" @click="saveImage">
            <span id="J_saveImg" class="saveImg">
                <em class="icon"></em>
                <em class="text">保存</em>
            </span>
          </div>
        </div>
        <!--<div class="sectionBar">-->
        <!--<span id="clearSetting" class="clearSetting" @click="clearSetting">-->
        <!--<em class="icon"></em>-->
        <!--<em class="text">初始化</em>-->
        <!--</span>-->
        <!--</div>-->

      </div>
      <!--<div class="sectionBar">-->
      <!--<div id="J_addImg" class="addImgH" @click="addBg">-->
      <!--<em class="icon"></em>-->
      <!--<em class="text">添加背景</em>-->
      <!--<input type="file" class="upload" id="J_canvas_bg"-->
      <!--accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"/>-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="sectionBar" @click="deleteBg">-->
      <!--<span id="J_removeImg" class="removeImg">-->
      <!--<em class="icon"></em>-->
      <!--<em class="text">删除背景</em>-->
      <!--</span>-->
      <!--</div>-->

    </div>
  </div>

</template>

<script>
  import anime from '@/firstProject/components/animate.vue'

  export default {
    components:{
      anime
    },
    name: 'home',
    data() {
      return {
        drawing: false,//是否正在绘制
        erasering: false,//是否正在擦除
        prevSteps: [],//返回上一步操作集合
        nextSteps: [],//恢复下一步操作集合
        context: null,//上下文
        colorIndex:0,
        configs: {},
        canvas: null,
        options: {},
        prevBtn: false,//上一步
        nextBtn: false, //下一步
        clearBtn: false, //清空画板
        screenWidth:document.body.clientWidth,
        isPc:false,
        colorData:[
          '#0099CC','#003366','#993333','#FF9900','#0000CC','#CC3333','#F4D03F','#4A235A','#009966','#ffff00','#7D6608','#FF33CC','#990066','#ffffff','#9bbb59','#CCFFFF','#FFCCCC','#CC99CC'
        ],

      }
    },
    watch:{

    },
    mounted() {

      let _this = this
      let Canvas = function (options) {
        this.options = options
        _this.configs = {
          width: 360,
          height: 300,
          save: function (data) {
          }
        }; //默认配置
        options = options || {};
        $.extend(_this.configs, options);
        _this.canvas = $("#" + _this.configs.canvasId)[0]; //画布
        _this.canvas.width = _this.configs.width;
        _this.canvas.height = _this.configs.height;
        _this.context = _this.canvas.getContext("2d"); //绘图环境

        _this.context.lineCap = "round";　//设置线条两端为圆弧
        _this.context.lineJoin = "round";　//设置线条转折为圆弧
        //设置默认颜色
        _this.setColor();
        _this.drawing = false; //是否正在绘制
        _this.erasering = false; //是否正在擦除
        _this.prevSteps = []; //返回上一步操作集合
        _this.nextSteps = []; //恢复下一步操作集合
        $("#picBoard").css({
          width: _this.configs.width + "px",
          height: _this.configs.height + "px"
        });
      }

      //pc端触发
      function pcForm() {
        new Canvas({
          canvasId: "canvas-borad",
          width: _this.screenWidth,
          height: 700,
          save: function (data) {
//            $.post("upload.php", {imgBase64: data}, function (res) {
//              if (res.code == "000") {
//                alert("图片保存成功！");
//                location.href = res.url;
//              } else {
//                alert(res.url);
//              }
//            }, "json");
          }
        });
        _this.canvas .onmousedown = function (e) {
          _this.startDrawing(e)
          _this.canvas .onmousemove = function (e) {
            _this.doDrawing(e)
            // 鼠标抬起事件 把上一个的move的事件清空
            _this.canvas .onmouseup = function () {
              _this.stopDrawing()
            }
            _this.canvas .onmouseout = function () {
              _this.stopDrawing()
            }
          }

        }
      }
      //移动端触发
      function mobileForm(){
        new Canvas({
          canvasId: "canvas-borad",
          width: _this.screenWidth,
          height: 400,
          save: function (data) {
//            $.post("upload.php", {imgBase64: data}, function (res) {
//              if (res.code == "000") {
//                alert("图片保存成功！");
//                location.href = res.url;
//              } else {
//                alert(res.url);
//              }
//            }, "json");
          }
        });
        _this.canvas.addEventListener("touchstart", function(e){
          _this.startDrawing(e)
          _this.canvas .addEventListener("touchmove", function(e){
            _this.doDrawing(e)
          }, false)
          _this.canvas.addEventListener('touchend',function (event) {//手机离开屏幕的事件
            _this.stopDrawing()
          },false)

        }, false)
      }

      //判断是pc还是移动
      function IsPC() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
        let flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      }
      if(IsPC()){
        _this.isPc=true
        pcForm();
        _this.clearBoard();
      }else{
        _this.isPc=false
        mobileForm();
        _this.clearBoard();
      }

    },
    methods: {
      //返回上一步操作
      gotoPrevStep() {
        if (this.prevSteps.length > 0) {
          //保存当前状态到下一步的操作历史库
          this.nextSteps.push(this.context.getImageData(0, 0, this.configs.width, this.configs.height));
          let popData = this.prevSteps.pop();
          this.context.putImageData(popData, 0, 0);
          $("#J_nextStep").removeAttr("disabled");
          if (this.prevSteps.length == 0) {
            $("#J_preStep").attr({"disabled":"disabled"});
          }
        }
      },
      //恢复下一步操作
      gotoNextStep() {
        if (this.nextSteps.length > 0) {
          //保存当前状态到上一步的操作历史库
          this.prevSteps.push(this.context.getImageData(0, 0, this.configs.width, this.configs.height));
          let imgData = this.nextSteps.pop();
          this.context.putImageData(imgData, 0, 0);
          $("#J_preStep").removeAttr("disabled");
          if (this.nextSteps.length == 0) {
            $("#J_nextStep").attr({"disabled":"disabled"});
          }
        }
      },
      // 清空画板
      clearBoard() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.prevSteps = [];
        this.nextSteps = [];
        $("#J_clearBoard").attr({"disabled":"disabled"});
        $("#J_preStep").attr({"disabled":"disabled"});
        $("#J_nextStep").attr({"disabled":"disabled"});
      },
      //设置画笔颜色
      setColor(color,index) {
        this.colorIndex=index
        if (!color) {
          color = $(".colorBar .active:eq(0)").data("color");
        }
        this.context.strokeStyle = color;
        this.context.shadowColor = color;
      },
      //保存图片
      saveImage() {

        if ($("#picBoard img").length > 0) {
          let image = new Image();
          image.src = $("#picBoard img:eq(0)").attr("src");
          image.onload = function () {
            this.context.save();
            this.context.shadowBlur = 0;
            this.context.shadowColor = '#FFF';
            this.context.globalCompositeOperation = "destination-atop";
            this.context.drawImage(this, 0, 0, this.configs.width, this.configs.height);
            this.context.restore();

            this.configs.save(this.canvas.toDataURL("image/png"));
          }

        } else {
          this.configs.save(this.canvas.toDataURL("image/png"));
        }
      },
      // 开始绘制
      startDrawing(e) {
        this.drawing = true;
        //记录上一步的数据
        this.prevSteps.push(this.context.getImageData(0, 0, this.configs.width, this.configs.height));
        // 创建一个新的绘图路径
        this.context.beginPath();
        // 把画笔移动到鼠标位置
        let offset = $(this.canvas).offset();
        if( this.isPc){
          this.context.moveTo(e.pageX - offset.left, e.pageY - offset.top);
        }else{
          this.context.moveTo(e.touches[0].pageX- offset.left, e.touches[0].pageY - offset.top);
        }
        if (typeof this.options.onDraw == "function") {
          this.options.onDraw({
            opt: "start",
            x: e.pageX - offset.left,
            y: e.pageY - offset.top,
          });
        }
      },

      // 停止绘制
      stopDrawing() {
        this.drawing = false;
        //清空下一步的数据集合，从新开始记录
        this.nextSteps = [];
        $("#J_nextStep").attr({"disabled":"disabled"});
        if (this.prevSteps.length == 1) {
          $("#J_preStep").removeAttr("disabled");
          $("#J_clearBoard").removeAttr("disabled");
        }
      },

      //移动画笔
      doDrawing(e) {
        if (this.drawing) {
          // 找到鼠标最新位置
          let offset = $(this.canvas).offset();
          let x=0
          let y=0
          if(this.isPc){
            x = e.pageX - offset.left;
            y = e.pageY - offset.top;
          }else{
            x = e.touches[0].pageX - offset.left;
            y = e.touches[0].pageY - offset.top;
          }
          // 画一条直线到鼠标最新位置
          this.context.lineTo(x, y);
          this.context.stroke();
          if (typeof  this.options.onDraw == "function") {
            this.options.onDraw({
              opt: "drawing",
              lineWidth: this.context.lineWidth,
              shadowBlur: this.context.shadowBlur,
              strokeStyle: this.context.strokeStyle,
              shadowColor: this.context.shadowColor,
              x: x,
              y: y,
            });
          }
        }
      },
      //初始化设置
      clearSetting() {
        this.context.lineWidth = 1;
        this.setColor($(".colorBar span:first").data("color"));
        this.context.shadowBlur = 0;
      },

      //上传背景图片
      addBg() {

        if ($("#picBoard img").length > 0) {
          $("#picBoard img:eq(0)").attr("src", window.URL.createObjectURL(this.files[0]));
          return;
        }
        let $img = '<img src="' + window.URL.createObjectURL(this.files[0]) + '" width="' + this.configs.width + '" height="' + this.configs.height + '" />';
        $("#picBoard").append($img);

        // 激活删除背景按钮
        $("#J_removeImg").enable();

      },
      // 删除背景图片
      deleteBg() {
        $("#picBoard").empty();
        $(this).disable();
      },


      // 设置笔刷大小
      setSize(value) {

        this.context.restore(); //恢复到canvas的上一个状态
        this.context.lineWidth =value
        this.erasering = false;
      },

      // 设置笔触虚化
      setShadow(value) {
        this.context.shadowBlur = value
      },

      // 橡皮擦功能
      eraserSize() {

        if (this.erasering == true) {
          return;
        }
        this.erasering = true;
        this.context.save(); //保存canvas状态
        this.context.lineCap = "round";　//设置线条两端为圆弧
        this.context.lineJoin = "round";　//设置线条转折为圆弧
        this.context.lineWidth = 10;
        this.context.globalCompositeOperation = "destination-out";

      },
    },


  }

</script>

<style  lang="less" scoped>
  .scrawl-main {

    a {
      text-decoration: none;
    }
    em {
      font-style: normal;
    }
    .drawing {

      text-align: center;
      .drawBoard {
        border:1px solid #a28b8b;
        box-shadow: 1px 1px 2px #888888;
        width: 100%;
        position: relative;
        cursor: crosshair;
        .brushBorad {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 998;
          .picBoard {
            border: none;
            text-align: center;
            cursor: default;
          }
        }
      }
      .operateBar {
        margin: 10px 0;
        font-size: 12px;
        text-align: center;
        span {
          margin-left: 10px;
        }
        button {
          background: #e1e1e1;
          border: 1px solid #cccccc;
          cursor: default;
        }
        .prevStep{
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/undo.png");
          }
          .active {
            cursor: pointer;
            background: #FFFFFF;
            border-color: #56CCCC;
            .icon {
              background-image: url("../assets/images/undoH.png");
            }
          }
        }
        .nextStep{
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/redo.png");
          }
          .active {
            cursor: pointer;
            background: #FFFFFF;
            border-color: #56CCCC;
            .icon {
              background-image: url("../assets/images/redoH.png");
            }
          }
        }
        .clearBoard {
          cursor: default;
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/empty.png");
          }
          .active {
            cursor: pointer;
            background: #FFFFFF;
            border-color: #56CCCC;
            .icon {
              background-image: url("../assets/images/emptyH.png");
            }
          }
        }
        .scaleBoard{
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/scale.png");
            cursor: default;
          }
          .iconH {
            background-image: url("../assets/images/scaleH.png");
          }
          .text {
            color: #ccc;
            cursor: default;
          }
        }
      }
    }
    .drawToolbar {
      max-width: 600px;
      margin:0 auto;
      .brushIcon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../assets/images/brush.png");
      }
      .eraserIcon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("../assets/images/eraser.png");
      }
      .blurIcon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../assets/images/blur.png) -2px -2px;
        background-size: 22px 20px;
      }
      .colorBar {
        padding-right: 5px;
        box-sizing: border-box;
        margin-top: 10px;
        span {
          float: left;
          margin: 2px 3px;
          width: 10px;
          height: 10px;
          border: 1px solid #c1c1c1;
          border-radius: 3px;
          cursor: pointer;

        }
        .active {
          border-color: #FF0000;
          box-shadow: 2px 2px 5px #d3d6da;
        }
      }
      .settiing{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .layout{
          width: 33%;
        }
      }
      #clearSetting {
        cursor: pointer;
      }
      .sectionBar {
        margin-top: 15px;
        font-size: 12px;
        a {
          display: inline-block;
          width: 10px;
          height: 12px;
          color: #888;
          text-indent: -999px;
          opacity: 0.3;
        }
        .size1 {
          background: url("../assets/images/size.png") 1px center no-repeat;
        }
        .size2 {
          background: url("../assets/images/size.png") -10px center no-repeat;
        }
        .size3 {
          background: url("../assets/images/size.png") -22px center no-repeat;
        }
        .size4 {
          background: url("../assets/images/size.png") -35px center no-repeat;
        }
        .icon {
          position: relative;
          top: 3px;
        }
        .clearSetting{
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/init.png");
            background-size: 16px 16px;
          }

        }
        .addImgH{
          position: relative;
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/addimg.png");
            cursor: default;
          }
          .upload {
            position: absolute;
            left: 18px;
            top: -1px;
            width: 75px;
            height: 21px;
            opacity: 0;
            cursor: pointer;
            opacity: 0;
          }

        }
        .removeImg{
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/delimg.png");
            cursor: default;
          }
          .text {
            color: #ccc;
            cursor: default;
          }
          .active {
            cursor: pointer;
            .icon {
              background-image: url("../assets/images/delimgH.png");
            }
            .text {
              color: #000;
              cursor: default;
            }
          }
        }
        .saveImg {
          cursor: pointer;
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/save.png");
            background-size: 18px 18px;
            cursor: default;
          }
        }
      }
    }

  }




</style>

