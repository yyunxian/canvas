<template>
  <div class="home" >
    <!--<h2>c3动画</h2>-->
    <!--<anime></anime>-->
    <!--进度条  value完成的值 max总值-->
    <!--<progress  value="20" max="100"></progress>-->
    <!--画板-->
    <!--<drawing></drawing>-->
    <!--图形统计表-->
    <!--<vcharts></vcharts>-->
    <!--百度地图-->
    <!--<map ></map>-->
    <div>骨架屏</div>
    <img src="" alt="" style="width: 200px;height: 20px;">
    <img src="" alt="" style="width: 200px;height: 20px;">
    <img src="" alt="" style="width: 200px;height: 20px;">
    <p>ddddddddddddddddd</p>
    <p>ddddddddddddddddd</p>
    <p>ddddddddddddddddd</p>
  </div>
</template>

<script>
  import anime from '@/firstProject/components/animate.vue'
  import drawing from '@/firstProject/components/drawing.vue'
  import vcharts from '@/firstProject/components/vcharts.vue'
//  import map from '@/firstProject/components/vcharts.vue'

  export default {
    components:{
      anime,drawing,vcharts
    },
    name: 'home',
    data() {
      return {

      }
    },
    watch:{

    },
    mounted() {


    },
    methods:{

    }


  }

</script>

<style  lang="less" scoped>


</style>

