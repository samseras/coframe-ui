<template>
  <div class="icon-select">
    <el-input
      :readOnly="true"
      :value="value"
      :placeholder="placeholder"
      @change="clearValue"
      clearable>
      <div v-if="value" slot="prepend" class="f-18">
        <i :class="'iconfont icon-' + value" ></i>
      </div>
      <el-button v-if="!disabled" type="primary" slot="append" icon="el-icon-more" @click.stop="showSelect"></el-button>
    </el-input>
    <transition name="el-zoom-in-top">
      <div v-if="mode !== 'dialog'" v-show="showOptions" class="drop-section">
        <i class="popper_arrow"></i>
        <div ref="scroll" class="drop-down scroll">
          <div
            v-for="(v, k) in iconMap"
            :key="k"
            :class="v.font_class === value ?'icon-item icon-item-drop icon-item-active' : 'icon-item-drop icon-item'">
            <el-tooltip :enterable="false" :open-delay="200" effect="dark" :content="v.font_class" placement="bottom-start">
              <i :class="'iconfont icon-' + v.font_class" ></i>
            </el-tooltip>
          </div>
        </div>
      </div>
    </transition>

    <el-dialog v-if="mode === 'dialog'" title="图标" :visible.sync="showOptions" :append-to-body="true">
      <el-row>
        <el-col :span="16" :md="14" :lg="10">
          <el-form-item label-width="100px" label="关键字筛选：">
            <el-input v-model="keywords" placeholder="筛选的关键字" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <section ref="scroll" class="scroll">
        <el-row>
          <el-col v-for="(v, k) in iconMap" :key="k" :xs="6" :sm="4" :md="3" :lg="2">
            <el-tooltip :enterable="false" :open-delay="200" effect="dark" :content="v.font_class" placement="bottom-start">
              <div :class="v.font_class === value ? 'icon-item icon-item-active' : 'icon-item'">
                <i :class="'iconfont icon-' + v.font_class" @click="selectSvg(v.font_class)" ></i>
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
        <div v-show="!iconMap.length" class="null">
          <i class="el-icon-document"></i>
          <p class="f-14">没有符合条件的图标</p>
        </div>
      </section>
    </el-dialog>
  </div>
</template>

<script>
let iconList = []
import('@/assets/iconfont/message.json').then(json => {
  json.list.forEach(item => {
    import(`@/assets/iconfont/resources/${item.fileName}/iconfont.json`).then(file => {
      iconList = [...iconList, ...file.glyphs]
    })
  })
})
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mode: { //默认弹窗模式，传入其他任意值为下拉模式
      type: String,
      default: 'dialog'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showOptions: false,
      keywords: ''
    }
  },
  created() {

  },
  mounted() {
    if (this.mode !== 'dialog') {
      document.body.addEventListener('click', this.hiddSelect)
    }
  },
  computed: {
    iconMap() {
      return iconList.filter(v => v.font_class.indexOf(this.keywords) !== -1)
    }
  },
  methods: {
    getPath (url) {
      return url.split('icon-')[1]
    },
    selectSvg(path) {
      this.$emit('input', path)
      this.hiddSelect()
    },
    showSelect() {
      this.showOptions = true
    },
    hiddSelect() {
      this.showOptions = false
    },
    clearValue() {
      this.$emit('input', '')
    }
  },
  beforeDestroy() {
    if (this.mode !== 'dialog') {
      document.body.removeEventListener('click', this.hiddSelect)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/iconfont/iconfont.css';

section {
  max-height: 400px;
  overflow: auto;
  min-height: 300px;
  .null{
    text-align: center;
    opacity: .6;
    padding-top: 50px;
    i{
      font-size: 80px;
    }
  }
  .icon-item{
    margin-bottom: 10px;
  }
}
.icon-item {
  width: 40px;
  height: 40px;
  border: 1px dashed #dcdfe6;
  text-align: center;
  font-size: 24px;
  border-radius: 4px;
  line-height: 40px;
  cursor: pointer;
  i {
    font-size: 28px
  }
  &-active{
    i{
      color: blue;
    }
  }
  &:hover{
    i{
      font-size: 30px;
      color: blue;
    }
  }
}
.icon-select {
  position: relative;
  .iconfont{
    font-size: 20px
  }
  .drop-section {
    position: absolute;
    z-index: 999;
    i {
      position: absolute;
      top: -2px;
      left: 20px;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
      border-width: 6px;
      &::after {
        content: ' ';
        display: block;
        border-width: 6px;
        width: 0;
        height: 0;
        position: absolute;
        top: 1px;
        border-color: transparent;
        border-style: solid;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
      }
    }
    .drop-down {
      margin-top: 10px;
      border: 1px solid #ebeef5;
      max-height: 200px;
      overflow: auto;
      background-color: #fff;
      width: 412px;
      border-radius: 4px;
      padding: 10px 0;
      .icon-item-drop {
        float: left;
        box-sizing: border-box;
        border-radius: 0;
        border: none;
      }
    }
  }
}
.scroll::-webkit-scrollbar-thumb {
    border-radius: 4px;
    width: 6px;
  }
</style>
