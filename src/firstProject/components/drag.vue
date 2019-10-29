
<template>
  <div>
    <canvas
      :id="radom"
      :class="{canDraw: 'canvas'}"
      :width="width"
      :height="height"
      :style="{'width':`${width}px`,'height':`${height}px`,}"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
      @touchstart="canvasDown($event)"
      @touchend="canvasUp($event)"
      @touchmove="canvasMove($event)">
    </canvas>
  </div>
</template>
<script>
  // import proxy from './proxy.js'
  const uuid = require('node-uuid')
  export default {
    props: {
      canDraw: { // 图片路径
        type: Boolean,
        default: true
      },
      url: { // 图片路径
        type: String
      },
      info: { // 位置点信息
        type: Array
      },
      width: { // 绘图区域宽度
        type: String
      },
      height: { // 绘图区域高度
        type: String
      },
      lineColor: { // 画笔颜色
        type: String,
        default: 'red'
      },
      lineWidth: { // 画笔宽度
        type: Number,
        default: 2
      },
      lineType: { // 画笔类型
        type: String,
        default: 'circle'
      }
    },
    watch: {
      info (val) {
        if (val) {
          this.initDraw()
        }
      }
    },
    data () {
      return {
        // 同一页面多次渲染时，用于区分元素的id
        radom: uuid.v4(),
        // canvas对象
        context: {},
        // 是否处于绘制状态
        canvasMoveUse: false,
        // 绘制矩形和椭圆时用来保存起始点信息
        beginRec: {
          x: '',
          y: '',
          imageData: ''
        },
        // 储存坐标信息
        drawInfo: [],
        // 背景图片缓存
        img: new Image()
      }
    },
    mounted () {
      this.initDraw()
    },
    methods: {
      // 初始化绘制信息
      initDraw () {
        // 初始化画布
        const canvas = document.getElementById(this.radom)
        this.context = canvas.getContext('2d')
        // 初始化背景图片
        this.img.setAttribute('crossOrigin', 'Anonymous')
        this.img.src = this.url
        this.img.onerror = () => {
          var timeStamp = +new Date()
          this.img.src = this.url + '?' + timeStamp
        }
        this.img.onload = () => {
          this.clean()
        }
        // proxy.getBase64({imgUrl: this.url}).then((res) => {
        //   if (res.code * 1 === 0) {
        //     this.img.src = 'data:image/jpeg;base64,'+res.data
        //     this.img.onload = () => {
        //       this.clean()
        //     }
        //   }
        // })
        // 初始化画笔
        this.context.lineWidth = this.lineWidth
        this.context.strokeStyle = this.lineColor
      },
      // 鼠标按下
      canvasDown (e) {

        if (this.canDraw) {
          console.log(e,'按下')
          this.canvasMoveUse = true
          // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
          const canvasX = e.clientX - e.target.parentNode.offsetLeft
          const canvasY = e.clientY - e.target.parentNode.offsetTop
          // 记录起始点和起始状态
          this.beginRec.x = canvasX
          this.beginRec.y = canvasY
          this.beginRec.imageData = this.context.getImageData(0, 0, this.width, this.height)
          // 存储本次绘制坐标信息
          this.drawInfo.push({
            x: canvasX / this.width,
            y: canvasY / this.height,
            type: this.lineType
          })
        }
      },
      Area (p0,p1,p2) {
        let area = 0.0 ;
        area = p0.x * p1.y + p1.x * p2.y + p2.x * p0.y - p1.x * p0.y - p2.x * p1.y - p0.x * p2.y;
        return area / 2 ;
      },
      // 计算多边形质心
      getPolygonAreaCenter (points) {
        let sum_x = 0;
        let sum_y = 0;
        let sum_area = 0;
        let p1 = points[1];
        for (var i = 2; i < points.length; i++) {
          let p2 = points[i];
          let area = this.Area(points[0],p1,p2) ;
          sum_area += area ;
          sum_x += (points[0].x + p1.x + p2.x) * area;
          sum_y += (points[0].y + p1.y + p2.y) * area;
          p1 = p2 ;
        }
        return {
          x: sum_x / sum_area / 3,
          y: sum_y / sum_area / 3
        }
      },
      // 根据坐标信息绘制图形
      drawWithInfo () {
        this.info.forEach(item => {
          this.context.beginPath()
          if (!item.type) {
            // 设置颜色
            this.context.strokeStyle = item.regionColor
            this.context.fillStyle = item.regionColor
            // 绘制多边形的边
            if (typeof item.region === 'string') {
              item.region = JSON.parse(item.region)
            }
            item.region.forEach(point => {
              this.context.lineTo(point.x * this.width, point.y * this.height)
            })
            this.context.closePath()
            // 在多边形质心标注文字
            let point = this.getPolygonAreaCenter(item.region)
            this.context.fillText(item.areaName, point.x * this.width, point.y * this.height)
          } else if (item.type === 'rec') {
            this.context.rect(item.x * this.width, item.y * this.height, item.w * this.width, item.h * this.height)
          } else if (item.type === 'circle') {
            this.drawEllipse(this.context, (item.x + item.a) * this.width, (item.y + item.b) * this.height, item.a > 0 ? item.a * this.width : -item.a * this.width, item.b > 0 ? item.b * this.height : -item.b * this.height)
          }
          this.context.stroke()
        })
      },
      // 鼠标移动时绘制
      canvasMove (e) {
        if (this.canvasMoveUse && this.canDraw) {
          // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
          let canvasX = e.clientX - e.target.parentNode.offsetLeft
          let canvasY = e.clientY - e.target.parentNode.offsetTop
          if (this.lineType === 'rec') { // 绘制矩形时恢复起始点状态再重新绘制
            this.context.putImageData(this.beginRec.imageData, 0, 0)
            this.context.beginPath()
            this.context.rect(this.beginRec.x, this.beginRec.y, canvasX - this.beginRec.x, canvasY - this.beginRec.y)
            let info = this.drawInfo[this.drawInfo.length - 1]
            info.w = canvasX / this.width - info.x
            info.h = canvasY / this.height - info.y
          } else if (this.lineType === 'circle') { // 绘制椭圆时恢复起始点状态再重新绘制
            this.context.putImageData(this.beginRec.imageData, 0, 0)
            this.context.beginPath()
            let a = (canvasX - this.beginRec.x) / 2
            let b = (canvasY - this.beginRec.y) / 2
            this.drawEllipse(this.context, this.beginRec.x + a, this.beginRec.y + b, a > 0 ? a : -a, b > 0 ? b : -b)
            let info = this.drawInfo[this.drawInfo.length - 1]
            info.a = a / this.width
            info.b = b / this.height
          }
          this.context.stroke()
        }
      },
      // 绘制椭圆
      drawEllipse (context, x, y, a, b) {
        context.save()
        var r = (a > b) ? a : b
        var ratioX = a / r
        var ratioY = b / r
        context.scale(ratioX, ratioY)
        context.beginPath()
        context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false)
        context.closePath()
        context.restore()
      },
      // 鼠标抬起
      canvasUp (e) {
        if (this.canDraw) {
          this.canvasMoveUse = false
        }
      },
      // 获取坐标信息
      getInfo () {
        return this.drawInfo
      },
      // 清空画布
      clean () {
        this.context.drawImage(this.img, 0, 0, this.width, this.height)
        this.drawInfo = []
        if (this.info && this.info.length !== 0) this.drawWithInfo()
      }
    }
  }
</script>

<style>
  .canvas{
    cursor: crosshair;
  }
</style>

