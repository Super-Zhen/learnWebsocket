<template>
    <div class="flexAC flexJB msgBox pad10">
      <div class="flexAC infoColor">
        <img src="../../assets/img/20210113105735.jpg" alt="" class="headImg">
        <div class="mgl10 height50 flexDc flexJA ">
          <p class="fontS16">{{value.name}}</p>
          <p class="fontS15" v-if="value.content">{{value.content.substring(0,10)}}...</p>
        </div>
      </div>
      <slot name="right">

      </slot>

<!--      <div class="height50 fontS1 time" v-if="value.send_time">-->
<!--        {{value.send_time}}-->
<!--      </div>-->
    </div>

</template>

<script>
    import {Button} from 'vant'
    export default {
        name: "cell",
      props:[
        "value"
      ],
      components:{
          [Button.name]:Button
      },
    }
</script>

<style scoped>
.msgBox{
  height: 58px;
  border-bottom: 1px solid #eeeeee;
}
  .headImg{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .time{
    color: rgba(15,25,91,04);
  }
  .infoColor{
    color: #0F195B;
  }
</style>
