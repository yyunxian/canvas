<template>
 <div>
   <vuedraggable class="wrapper" v-model="list">
     <!--transition-group vue中的过渡动画-->
     <transition-group>
       <div v-for="item in list" :key="item" class="item">
         <p>{{item}}</p>
       </div>
     </transition-group>
     <!--<div v-for="item in list" :key="item" class="item">-->
     <!--<p>{{item}}</p>-->
     <!--</div>-->
   </vuedraggable>
   <div class="move" ref="move" @mousedown="down" @mousemove="move" @mouseup="up">

   </div>
 </div>
</template>

<script>
  import vuedraggable from 'vuedraggable';

  export default {
    name: '',
    components: {vuedraggable},
    props: {
    },
    data() {
      return {
        list: [1,2,34,4,54,5]
      }
    },

    mounted(){


    },
    methods: {
      down(){
        console.log('按下')
      },

      move(){
        console.log('移动')
      },

      up(){
        console.log('放开')
      },





//      move(){
//
//        var oDiv = document.getElementsByClassName('move')
//        oDiv.onmousedown = function () {
//          console.log('按下')
//          document.onmousemove = function (ev) {
//            console.log('移动')
//            var event = window.event || ev;
//            oDiv.style.left = event.clientX + "px";
//            oDiv.style.top = event.clientY + "px";
//          }
//          document.onmouseup = function () {
//            console.log('放开')
//            document.onmousemove = null;
//            document.onmouseup = null;
//          }
//        }
//      }
    }
  }
</script>
<style scoped>
  .wrapper {
    /*display: flex;*/
    /*justify-content: center;*/
    /*width: 100%;*/
  }
  .item{
    width: 300px;
    height: 50px;
    background-color: #42b983;
    color: #ffffff;

  }
  .move{
    width: 20px;
    height: 20px;
    background-color: green;
  }
</style>
