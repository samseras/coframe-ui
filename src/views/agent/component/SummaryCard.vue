<template>
  <div class="summary-comp">
    <el-row :gutter="40">
      <el-col :span="device === 'phone' ? 12 : 8"><div class="agent-cart-content animations">
        <p class="s-title">Building</p>
        <i class="icon-cog"></i>
        <p class="b-num">3</p>
      </div></el-col>
      <el-col :span="device === 'phone' ? 12 : 8"><div class="agent-cart-content idle">
        <p class="s-title">idle</p>
        <i class="icon-coffee"></i>
        <p class="b-num">5</p>
      </div></el-col>
      <el-col :span="device === 'phone' ? 24 : 8">
        <div class="agent-cart-content summary">
          <el-row v-if="device === 'desktopHD' || device === 'phone'">
            <el-col :span="8"><div class="summary-cont">
              <p>ALL</p>
              <p>8</p>
            </div></el-col>
            <el-col :span="8"><div class="summary-cont">
              <p>PHYSICAL</p>
              <p>4</p>
            </div></el-col>
            <el-col :span="8"><div class="summary-cont">
              <p>VIRTUAL</p>
              <p>4</p>
            </div></el-col>
          </el-row>
          <div v-if="device === 'desktop' || device === 'mobile'" class="desktop-summary">
            <p>
              <span>ALL</span>
              <span>8</span>
            </p>
            <p>
              <span>PHYSICAL</span>
              <span>4</span>
            </p>
            <p>
              <span>VIRTUAL</span>
              <span>4</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SummaryCard',
  computed: {
    device() {
      return this.$store.state.app.device
    },
  }
}
</script>

<style scoped lang="scss">
.summary-comp{
  .agent-cart-content{
    height: 130px;
    background: #FF9A2A;
    text-align: center;
    color: #fff;
    position: relative;
    margin-bottom: 20px;
    p{
      margin: 0;
    }
    .s-title{
      font-size: 18px;
      font-weight: bold;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .b-num{
      font-size: 48px;
      float: right;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    i{
      font-size: 144px;
      line-height: 130px;
      display: inline-block;
      opacity: .2;
    }
  }
  .animations{
    i{
      -webkit-animation: turn 2s linear infinite;
    }
  }
  @-webkit-keyframes turn{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
  .idle{
    background: #7FBC39;
  }
  .summary{
    background: #fff;
    color: #333;
    .summary-cont{
      height: 130px;
      text-align: center;
      p:nth-of-type(1){
        font-size: 12px;
        line-height: 60px;
      }
      p:nth-of-type(2){
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
      }
    }
    .desktop-summary{
      padding: 10px 20px;
      box-sizing: border-box;
      p{
        line-height: 36px;
        text-align: left;
        position: relative;
        span:nth-of-type(2){
          font-size: 20px;
          font-weight: bold;
          display: inline-block;
          text-align: right;
          position: absolute;
          right: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 768px){
    .agent-cart-content{
      height: 100px;
      i{
        font-size: 110px;
        line-height: 100px;
      }
    }
    .summary{
      p{
        line-height: 50px !important;
      }
    }
  }
}
</style>
