<template>
  <div :class="{dialog: type === 'dialog' }" v-show="showDialog || type !== 'dialog'">
    <section :class="{section: type === 'dialog' }" @mouseleave="onMouseLeave">
      <el-row class="title" v-if="type === 'dialog'">
        <el-col :span="22">请完成安全认证</el-col>
        <el-col :span="2"><i @click="showDialog = false" class="el-icon-close"></i></el-col>
      </el-row>
      <div
        :style="{width: width + 'px' || '310px'}"
        class="slide-verify"
        id="slideVerify"
        onselectstart="return false;"
      >
        <div
          :class="{abs: type === 'hover' }"
          v-show="type !== 'hover' || showcanvas"
        >
          <canvas :height="height" :width="width" ref="canvas" ></canvas>
          <i @click="refresh" class="el-icon-refresh"></i>
          <canvas
            :height="height"
            :width="width"
            class="slide-verify-block"
            ref="block"
          />
        </div>
        <!-- container -->
        <div
          :class="{'container-active' :containerActive, 'container-success': containerSuccess, 'container-fail': containerFail}"
          @mouseenter="showcanvas = true; leave = false"
          class="slide-verify-slider"
        >
          <div :style="{width: sliderMaskWidth}" class="slider-mask">
            <!-- slider -->
            <div :style="{left: sliderLeft}"
              @mousedown="sliderDown"
              @touchstart="touchStartEvent"
              class="slider">
              <div class="slider-icon"></div>
            </div>
          </div>
          <span class="slider-text" v-show="!containerActive && !containerSuccess && !containerFail">{{sliderText}}</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import images from './img'
  const PI = Math.PI;
  export default {
    name: 'SlideVerify',
    props: {
      type: {
        type: String,
        default: 'inherent',
      },
        // block length
      l: {
        type: Number,
        default: 42,
      },
      radius: {
        type: Number,
        default: 10,
      },
        // canvas width
      width: {
        type: Number,
        default: 310,
      },
        // canvas height
      height: {
        type: Number,
        default: 155,
      },
      sliderText: {
        type: String,
        default: '滑动验证',
      },
      imgs: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        accuracy: 5,
        containerActive: false, // container active class
        containerSuccess: false, // container success class
        containerFail: false, // container fail class
        canvasCtx: null,
        blockCtx: null,
        block: null,
        block_x: '', // container random position
        block_y: '',
        left: this.l + this.radius * 2 + 3, // block real lenght
        img: '',
        originX: '',
        originY: '',
        isMouseDown: false,
        trail: [],
        sliderLeft: 0, // block right offset
        sliderMaskWidth: 0, // mask width
        showcanvas: false, // hover 模式
        showDialog: false, // dialog模式
        leave: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      showDialogFuct () {
        this.showDialog = true
      },
      init() {
        this.initDom()
        this.initImg()
        this.bindEvents()
      },
      initDom() {
        this.block = this.$refs.block
        this.canvasCtx = this.$refs.canvas.getContext('2d')
        this.blockCtx = this.block.getContext('2d')
      },
      initImg() {
        const img = this.createImg(() => {
          this.drawBlock()
          this.canvasCtx.drawImage(img, 0, 0, this.width, this.height)
          this.blockCtx.drawImage(img, 0, 0, this.width, this.height)
          let { block_x: x, block_y: y, radius, left } = this
          let _y = y - radius * 2 - 1
          let ImageData = this.blockCtx.getImageData(x, _y, left, left)
          this.block.width = left
          this.blockCtx.putImageData(ImageData, 0, _y)
          });
        this.img = img
      },
      drawBlock() {
        this.block_x = this.getRandomNumberByRange(this.left + 10, this.width - (this.left + 10))
        this.block_y = this.getRandomNumberByRange(10 + this.radius * 2, this.height - (this.left + 10))
        this.draw(this.canvasCtx, this.block_x, this.block_y, 'fill')
        this.draw(this.blockCtx, this.block_x, this.block_y, 'clip')
      },
      draw(ctx, x, y, operation) {
        let { l, radius } = this
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x + l / 2, y - radius + 2, radius, 0.72 * PI, 2.26 * PI)
        ctx.lineTo(x + l, y)
        ctx.arc(x + l + radius - 2, y + l / 2, radius, 1.21 * PI, 2.78 * PI)
        ctx.lineTo(x + l, y + l)
        ctx.lineTo(x, y + l)
        ctx.arc(x + radius - 2, y + l / 2, radius + 0.4, 2.76 * PI, 1.24 * PI, true)
        ctx.lineTo(x, y)
        ctx.lineWidth = 2
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.stroke()
        ctx[operation]()
        ctx.globalCompositeOperation = 'overlay'
      },
      createImg(onload) {
        const img = document.createElement('img')
        img.crossOrigin = "Anonymous"
        img.onload = onload
        img.onerror = () => {
          img.src = this.getRandomImg()
        }
        img.src = this.getRandomImg()
        return img
      },
      // 随机生成img src
      getRandomImg() {
        let imgArr = this.imgs.length ? this.images : images
        return imgArr[this.getRandomNumberByRange(0, imgArr.length)]
      },
      getRandomNumberByRange(start, end) {
        return Math.round(Math.random() * (end - start) + start)
      },
      refresh() {
        if (!this.containerSuccess) {
          this.reset()
        }
      },
      sliderDown(event) {
        if (!this.containerSuccess) {
          this.originX = event.clientX
          this.originY = event.clientY
          this.isMouseDown = true
        }
      },
      touchStartEvent(e) {
        if (!this.containerSuccess) {
          this.originX = e.changedTouches[0].pageX
          this.originY = e.changedTouches[0].pageY
          this.isMouseDown = true
        }
      },
      bindEvents() {
        document.addEventListener('mousemove', this.mousemove)
        document.addEventListener('mouseup', this.mouseup)
      },
      mousemove(e) {
        if (!this.isMouseDown) return false
        const moveX = e.clientX - this.originX
        const moveY = e.clientY - this.originY
        if (moveX < 0 || moveX + 38 >= this.width) return false
        this.sliderLeft = this.getPX(moveX)
        let blockLeft = (this.width - 40 - 20) / (this.width - 40) * moveX
        this.block.style.left = this.getPX(blockLeft)
        this.containerActive = true
        this.sliderMaskWidth = this.getPX(moveX)
        this.trail.push(moveY)
      },
      mouseup(e) {
        if (!this.isMouseDown) return
        this.isMouseDown = false
        this.containerActive = false
        if (this.verify()) {
          this.containerSuccess = true
          this.$emit('input', true)
          this.$emit('success')
          this.$message({
            message:'验证通过',
            type: 'success'
          })
          this.removeEvent()
          if (this.leave) { this.showcanvas = false }
          this.type === 'dialog' && (this.showDialog = false)
        } else {
          this.containerFail = true
          this.reset()
        }
      },
      verify() {
        const arr = this.trail
        const average = arr.reduce((x, y) => x + y) / arr.length
        const deviations = arr.map(x => x - average)
        const left = parseInt(this.block.style.left)
        return Math.abs(left - this.block_x) <= this.accuracy
      },
      reset() {
        setTimeout(() => {
          this.containerActive = false
          this.containerSuccess = false
          this.containerFail = false
          this.sliderLeft = 0
          this.block.style.left = 0
          this.sliderMaskWidth = 0
          let { width, height } = this
          this.canvasCtx.clearRect(0, 0, width, height)
          this.blockCtx.clearRect(0, 0, width, height)
          this.block.width = width
          this.img.src = this.getRandomImg()
        }, 200)
      },
      onMouseLeave () {
        if (!this.isMouseDown) {
          this.showcanvas = false
        } else {
          this.leave = true
        }
      },
      getPX (num) {
        return num + 'px'
      },
      removeEvent() {
        document.removeEventListener('mouseup', this.mouseup)
        document.removeEventListener('mousemove', this.mousemove)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dialog {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .section{
    padding: 10px 10px 20px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .title {
    font-size: 16px;
    line-height: 40px;
    color: #777;
    border-bottom: 1px solid #f1f2f3;
    margin-bottom: 20px;
    .el-icon-close{
      font-size: 18px;
    }
  }
  i{
    cursor: pointer;
  }
  .abs {
    position: absolute;
    top: -156px;
    left: 0;
  }
  .slide-verify {
    position: relative;
    margin-bottom: 18px;
    border-radius: 4px;
    .el-icon-refresh {
      position: absolute;
      right: 6px;
      top: 6px;
      cursor: pointer;
      font-size: 24px;
      color: #777;
    }
    .slide-verify-block {
      position: absolute;
      left: 0;
      top: 0;
    }
    .slide-verify-slider {
      position: relative;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-top: 15px;
      background: #f7f9fa;
      color: #45494c;
      border: 1px solid #e4e7eb;
      .slider-mask {
        position: absolute;
        left: 0;
        top: 0;
        height: 40px;
        border: 0 solid #1991FA;
        background: #D1E9FE;
        .slider {
          position: absolute;
          // top: 0;
          left: 0;
          width: 39px;
          height: 39px;
          background: #fff;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: background .2s linear;
          &:hover{
            background: #1991FA;
            .slider-icon {
              background-position: 0 -13px;
            }
          }
          .slider-icon {
            position: absolute;
            top: 15px;
            left: 13px;
            width: 14px;
            height: 12px;
            background: url("~@static/images/slideverify/icon_light.png") 0 -26px;
            background-size: 34px 471px;
          }
        }
      }
    }
    .container{
      &-active{
        .slider {
          height: 38px;
          top: -1px;
          border: 1px solid #1991FA;
        }
        .slider-mask {
          height: 38px;
          border-width: 1px;
        }
      }
      &-success{
        .slider {
          height: 38px;
          top: -1px;
          border: 1px solid #52CCBA;
          background-color: #52CCBA !important;
        }
        .slider-mask {
          height: 38px;
          border: 1px solid #52CCBA;
          background-color: #D2F4EF;
        }
        .slider-icon {
          background-position: 0 0 !important;
        }
      }
      &-fail{
        .slider {
          height: 38px;
          top: -1px;
          border: 1px solid #f57a7a;
          background-color: #f57a7a ;
        }
        .slider-mask {
          height: 38px;
          border: 1px solid #f57a7a;
          background-color: #fce1e1;
        }
        .slider-icon {
          top: 14px;
          background-position: 0 -82px !important;
        }
      }
    }
  }
</style>
