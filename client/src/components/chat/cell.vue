<template>
    <div class="flexAC flexJB msgBox pad10">
        <div class="flexAC infoColor">
            <img src="../../assets/img/20210113105735.jpg" alt="" class="headImg">
          <div class="mgl10 height50 flexDc flexJA ">
              <p class="fontS16">{{value.username}}</p>
              <p class="fontS15">{{value.content}}...</p>
          </div>
        </div>
        <div class="height50 fontS1 time">
          {{value.send_time}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "cell",
      props:[
        "value"
      ]
    }
</script>

<style scoped>
.msgBox{
  height: 58px;
  border-bottom: 1px solid #d0d0d0;
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
