<template>
  <div class="history">
    <p>History</p>
    <div class="his-cont">
      <p class="his-cont-item" v-for="item in historyList" :key="item.id">
        <span class="spot"></span><span class="item-title">{{item.title}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
name: 'History',
  data () {
    return {
      historyList: [
      ]
    }
  },
  created () {
    this.randomHistory(10, 20)
  },
  methods: {
    randomNum( Min, Max) {
      let Range = Max - Min
      let Rand = Math.random()
      let num = Min + Math.floor(Rand * Range)
      return num
    },
    randomHistory (Min, Max) {
      for (let i = 0; i < this.randomNum(Min, Max); i++) {
        this.historyList.push({
          title: `bjstdmngbgr${ i < 9 ? '0' + (i + 1) : i + 1}/Acceptance_test`,
          id: i + 1
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.history{
  padding: 0px 10px;
  box-sizing: border-box;
  p{
    font-size: 24px;
    color: #ccc;
    margin: 8px 0;
  }
  .his-cont{
    max-height: 200px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .his-cont-item{
      font-size: 12px;
      color: #999;
      line-height: 12px;
      cursor: pointer;
      .spot{
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 3px;
        height: 0;
        width: 0;
        border: 1.5px solid #ccc;
        border-radius: 50%;
      }
      .item-title{
        display: inline-block;
        width: 185px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      &:hover{
        color: #00B4CF;
      }
    }
  }
}
</style>
