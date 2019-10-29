<template>
  <div id="home">
    <ul>
    <li>
      第二个项目
    </li>
    </ul>
    <button @click="go()">下一</button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return{

      }
    },
    methods:{
      go(){
        this.$router.push('/secondProject/pages/drag')
      }
    }
  }
</script>

<style>
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
