<template>
  <div>input</div>

</template>

<script>


  export default {
    name: '',
    components: {},
    props: {
    },
    data() {
      return {
        list: [1,2,34,4,54,5]
      }
    },
    updated() {
      console.log(this.list)
    },
    methods: {
    }
  }
</script>
<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .item{
    width: 300px;
    height: 50px;
    background-color: #42b983;
    color: #ffffff;
  }
</style>
