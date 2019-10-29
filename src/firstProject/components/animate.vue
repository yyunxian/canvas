<template>
  <div id="preloader_3"></div>
</template>
<script>
  export default {}
</script>
<style lang="less" scoped>
  #preloader_3{
    position:absolute;
    left: 47%;
    top:45%;
    z-index: 10000;
  }
  #preloader_3:before{
    width:20px;
    height:20px;
    border-radius:20px;
    background:blue;
    content:'';
    position:absolute;
    background:#9b59b6;
    -webkit-animation: preloader_3_before 1.5s infinite ease-in-out;
    -moz-animation: preloader_3_before 1.5s infinite ease-in-out;
    -ms-animation: preloader_3_before 1.5s infinite ease-in-out;
    animation: preloader_3_before 1.5s infinite ease-in-out;
  }

  #preloader_3:after{
    width:20px;
    height:20px;
    border-radius:20px;
    background:blue;
    content:'';
    position:absolute;
    background:#2ecc71;
    left:22px;
    -webkit-animation: preloader_3_after 1.5s infinite ease-in-out;
    -moz-animation: preloader_3_after 1.5s infinite ease-in-out;
    -ms-animation: preloader_3_after 1.5s infinite ease-in-out;
    animation: preloader_3_after 1.5s infinite ease-in-out;
  }

  @-webkit-keyframes preloader_3_before {
    0% {-webkit-transform: translateX(0px) rotate(0deg)}
    50% {-webkit-transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
    100% {-webkit-transform: translateX(0px) rotate(0deg)}
  }
  @-webkit-keyframes preloader_3_after {
    0% {-webkit-transform: translateX(0px)}
    50% {-webkit-transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
    100% {-webkit-transform: translateX(0px)}
  }

  @-moz-keyframes preloader_3_before {
    0% {-moz-transform: translateX(0px) rotate(0deg)}
    50% {-moz-transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
    100% {-moz-transform: translateX(0px) rotate(0deg)}
  }
  @-moz-keyframes preloader_3_after {
    0% {-moz-transform: translateX(0px)}
    50% {-moz-transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
    100% {-moz-transform: translateX(0px)}
  }


  @-ms-keyframes preloader_3_before {
    0% {-ms-transform: translateX(0px) rotate(0deg)}
    50% {-ms-transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
    100% {-ms-transform: translateX(0px) rotate(0deg)}
  }
  @-ms-keyframes preloader_3_after {
    0% {-ms-transform: translateX(0px)}
    50% {-ms-transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
    100% {-ms-transform: translateX(0px)}
  }

  @keyframes preloader_3_before {
    0% {transform: translateX(0px) rotate(0deg)}
    50% {transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
    100% {transform: translateX(0px) rotate(0deg)}
  }
  @keyframes preloader_3_after {
    0% {transform: translateX(0px)}
    50% {transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
    100% {transform: translateX(0px)}
  }


</style>
