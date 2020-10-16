<template>
  <div class="agent">
    <div class="agent-cart">
<!--   顶部统计卡片   -->
      <summary-card></summary-card>
    </div>
<!--    搜索-->
    <div class="agent-search-phone" v-if="device === 'phone'">
      <div class="agent-search-input">
        <el-input
          placeholder="请输入内容"
          v-model="searchSome">
          <i slot="prefix" class="el-input__icon icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="agent-search">
      <el-radio-group v-model="activeName" @change="currentAgentTypeChange">
        <el-radio-button label="All" ></el-radio-button>
        <el-radio-button label="Physical"></el-radio-button>
        <el-radio-button label="Virtual"></el-radio-button>
      </el-radio-group>
      <div class="agent-search-input" v-if="device !== 'phone'">
        <el-input
          placeholder="请输入内容"
          @input="onSearch"
          v-model="searchSome">
          <i slot="prefix" class="el-input__icon icon-search"></i>
        </el-input>
      </div>
      <div class="agent-toggle" v-if="device === 'desktop' || device === 'desktopHD'">
        <i class="icon-th-card" :class="activeType === 'card' ? 'active-toggle' : ''"></i>
        <i class="icon-th-list" :class="activeType === 'list' ? 'active-toggle' : ''"></i>
      </div>
    </div>
<!--    主体-->
    <div class="agent-body">
      <el-card
        shadow="hover"
        class="agent-card"
        v-for="(item, index) in agentList"
        :key="index"
        :class="device === 'phone' ? item.type : ''">
        <div class="agent-card-item">
          <div class="image" v-if="device === 'desktopHD'">
            <img :src="item.image" alt="">
          </div>
          <div class="cont">
            <div class="agent-info">
              <p class="agent-title"><i class="icon-desktop"></i>{{item.title}}</p>
              <span class="agent-type" :class="item.type" v-if="device !== 'phone'">{{item.type}}</span>
              <p class="agent-ip"><i class="icon-info"></i>{{item.ip}}</p>
              <p class="agent-path"><i class="icon-folder"></i>{{item.path}}</p>
            </div>
            <div class="browser">
              <p class="browser-add-btn" @click="addBrowserHandle(index)" v-if="device !== 'desktopHD'"><i class="icon-plus"></i></p>
              <el-popover
                class="add-browser-popover"
                v-if="device === 'desktopHD'"
                placement="bottom-start"
                title=""
                width="570"
                v-model="item.showPopover"
                trigger="manual">
                <div class="popover-cont">
                  <i class="icon-close" @click="item.showPopover = false"></i>
                  <p>Separate multiple resource name with commas</p>
                  <el-autocomplete
                    class="inline-input"
                    v-model="browser"
                    :fetch-suggestions="querySearch"
                    placeholder="input value"
                    :trigger-on-focus="false"
                  ></el-autocomplete>
                  <div class="footer">
                    <p @click="submitResource(item)">Add Resources</p>
                    <p @click="item.showPopover = false">Cancel</p>
                  </div>
                </div>
                <p class="browser-add-btn" slot="reference" @click="item.showPopover = true"><i class="icon-plus"></i></p>
              </el-popover>
              <div>
                <span class="browser-item" v-for="bor in item.browser" :key="bor">{{bor}}<i class="icon-trash" @click="deleteBrowser(bor, item)"></i></span>
                <span class="deny"><i class="icon-deny"></i>Deny</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <add-browser-drawer ref="addBrowserDrawer" @onsubmit="addResource"></add-browser-drawer>
    <add-browser-dialog ref="addBrowserDialog" @onsubmit="addResource"></add-browser-dialog>
  </div>
</template>

<script>
import SummaryCard from './component/SummaryCard'
import AddBrowserDrawer from './component/AddBrowserDrawer'
import AddBrowserDialog from './component/AddBrowserDialog'
import autoComplate from './component/autoComplate'
import _ from 'lodash'
export default {
  name: 'index',
  mixins: [autoComplate],
  components: {
    SummaryCard,
    AddBrowserDrawer,
    AddBrowserDialog
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
  },
  created () {
    this.cloneAgentList = _.cloneDeep(this.agentList)
  },
  data () {
    return {
      activeName: 'All',
      searchSome: '',
      activeType: 'list',
      agentList: [
        {
          ip: '192.168.30.89',
          type: 'idle',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr01.thoughtworks.com',
          image: require('./../../assets/image/windows.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Physical'
        },
        {
          ip: '192.168.30.143',
          type: 'building',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr08.thoughtworks.com',
          image: require('./../../assets/image/windows.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Physical'
        },
        {
          ip: '192.168.1.80',
          type: 'building',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr11.thoughtworks.com',
          image: require('./../../assets/image/ubuntu.png'),
          browser: ['Firefox', 'Safari'],
          showPopover: false,
          category: 'Virtual'
        },
        {
          ip: '192.168.1.117',
          type: 'building',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr55.thoughtworks.com',
          image: require('./../../assets/image/debin.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Virtual'
        },
        {
          ip: '192.168.1.110',
          type: 'idle',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr11.thoughtworks.com',
          image: require('./../../assets/image/suse.png'),
          browser: [],
          showPopover: false,
          category: 'Virtual'
        },
        {
          ip: '192.168.1.102',
          type: 'idle',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr01.thoughtworks.com',
          image: require('./../../assets/image/cent_os.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Virtual'
        },
        {
          ip: '192.168.30.89',
          type: 'idle',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr01.thoughtworks.com',
          image: require('./../../assets/image/windows.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Physical'
        },
        {
          ip: '192.168.30.89',
          type: 'idle',
          path: '/var/lib/cruise-agent',
          title: 'bjstdmngbgr01.thoughtworks.com',
          image: require('./../../assets/image/windows.png'),
          browser: ['Firefox', 'Safari', 'Ubuntu', 'Chrome'],
          showPopover: false,
          category: 'Physical'
        },
      ],
      showPopover: false,
      currentIndex: null,
      cloneAgentList: [],
    }
  },
  methods: {
    // 搜索
    onSearch () {
      if (this.searchSome === '') {
        this.currentAgentTypeChange(this.activeName)
      } else {
        this.agentList = this.agentList.filter(item => {
          if (item.ip.includes(this.searchSome) || item.title.includes(this.searchSome)) {
            return item
          }
        })
      }
    },
    // 切换选项卡查数据
    currentAgentTypeChange (type) {
      if (type === 'All') this.agentList = this.cloneAgentList
      else this.agentList = this.cloneAgentList.filter(item => item.category === type)
    },
    // 打开添加浏览器弹框
    addBrowserHandle (idx) {
      this.currentIndex = idx
      if (this.device === 'phone') this.$refs.addBrowserDrawer.show()
      if (this.device === 'desktop' || this.device === 'mobile') this.$refs.addBrowserDialog.show()
    },
    // 添加浏览器到数据
    addResource (browser) {
      this.agentList.forEach((item, index) => {
        if (this.currentIndex === index) {
          item.browser.push(browser)
        }
      })
    },
    // 删除
    deleteBrowser (bor, row) {
      row.browser = row.browser.filter(item => item !== bor)
    },
    submitResource (item) {
      if (this.browser === '') return
      item.showPopover = false
      item.browser.push(this.browser)
    },
    showPopoverHandler (row) {
      console.log(row, 'sss')
      row.showPopover = true
    }
  }
}
</script>

<style>
.el-popper[x-placement^="bottom"]{
  box-shadow: 0px 3px 5px rgba(0,0,0,.3);
}
</style>
<style scoped lang="scss">
.agent{
  padding: 15px;
  box-sizing: border-box;
  .agent-cart{
  }
  .agent-search{
    height: 50px;
    background: #fff;
    /deep/ .el-radio-button--mini .el-radio-button__inner{
      padding: 18px 0;
      width: 80px;
      border: none;
      border-radius: 0;
      border-right: 1px solid #f3f3f3;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner{
      background: transparent;
      color: #00B4CF;
      border-bottom: 3px solid #00B4CF;
      box-shadow: none;
    }
    .agent-search-input{
      display: inline-block;
      margin-left: 20px;
      /deep/ .el-input__prefix{
        font-size: 20px;
      }
      /deep/ .el-input--mini .el-input__inner{
        background: #f3f3f3;
        border: none;
      }
    }
    .agent-toggle{
      height: 100%;
      float: right;
      font-size: 20px;
      line-height: 50px;
      margin-right: 25px;
      i{
        margin-left: 10px;
      }
    }
    .active-toggle{
      color: #00B4CF;
    }
  }
  .agent-search-phone{
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 10px;
    box-sizing: border-box;
    /deep/ .el-input__prefix{
      font-size: 20px;
    }
    /deep/ .el-input--mini .el-input__inner{
      background: #f3f3f3;
      border: none;
    }
  }
  .agent-body{
    margin-top: 15px;
    /deep/ .el-card__body{
      padding: 15px;
    }
    .agent-card{
      margin-bottom: 15px;
      .agent-card-item{
        display: flex;
        .image{
          width: 100px;
          img{
            height: 80px;
            display: inline-block;
          }
        }
        .cont{
          flex: 1;
          .agent-info{
            padding: 5px 0;
            box-sizing: border-box;
            p{
              margin: 0;
              padding: 0;
              display: inline-block;
              line-height: 28px;
            }
            .agent-title,.agent-ip,.agent-path{
              font-size: 14px;
              color: #00B4CF;
              font-weight: bold;
              i{
                font-size: 20px;
                vertical-align: middle;
                margin-right: 10px;
                color: #ccc;
                margin-top: -1px;
              }
            }
            .agent-type{
              display: inline-block;
              padding: 2px 6px;
              background: #7FBC39;
              color: #fff;
              margin: 0 30px;
              margin-right: 50px;
            }
            .building{
              background: #FF9A2A;
            }
            .agent-ip, .agent-path{
              margin-right: 35px;
              color: #666;
              font-weight: normal;
            }
          }
          .browser{
            margin-top: 15px;
            display: flex;
            div{
              flex: 1;
            }
            span{
            }
            .browser-item{
              padding: 3px 5px;
              background-color: #efefef;
              cursor: pointer;
              font-size: 14px;
              margin-bottom: 5px;
              display: inline-block;
              margin-right: 5px;
              i{
                margin-left: 5px;
              }
            }
            .browser-add-btn{
              padding: 0;
              margin: 0;
              height: 22px;
              width: 22px;
              text-align: center;
              line-height: 24px;
              font-size: 14px;
              background: #00B4CF;
              color: #fff;
              margin-right: 10px;
            }
            .deny{
              padding: 3px 8px 3px 5px;
              background: #00B4CF;
              color: #fff;
              float: right;
              cursor: pointer;
              i{
                margin: 0px 5px;
                vertical-align: middle;
                margin-top: -2px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px){
    /deep/ .el-radio-group{
      display: flex;
    }
    /deep/ .el-radio-button--mini{
      flex: 1;
    }
    /deep/ .el-radio-button__inner{
      width: 100% !important;
      flex-direction: row;
      justify-content: space-between;
    }
    .cont{
      .agent-info{
        p{
          display: block !important;
        }
      }
      .browser{
        margin-top: 0 !important;
      }
    }
    .agent-body{
      .idle{
        /deep/ .el-card__body{
          border-left: 4px solid #FF9A2A;
        }
      }
      .building{
        /deep/ .el-card__body{
          border-left: 4px solid #7FBC39;
        }
      }
    }
  }
}
.popover-cont{
  position: relative;
  i{
    position: absolute;
    right: 10px;
    top: -15px;
    font-size: 20px;
    color: #00B4CF;
  }
  p{
    color: #666;
  }
  .footer{
    p{
      width: 120px;
      text-align: center;
      color: #fff;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      &:nth-of-type(1){
        background: #00B4CF;
        margin-right: 10px;
      }
      &:nth-of-type(2){
        background: #435466;
      }
    }
  }
  /deep/.el-autocomplete,.inline-input{
    width: 100%;
    color: #00B4CF;
    border: none;
  }
}
</style>
