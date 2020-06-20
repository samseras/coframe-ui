<template>
  <div>test
    <down-load-file v-model="loadfile"></down-load-file>
    <TreeList :data="listtt"></TreeList>
    <BackToTop></BackToTop>
    <DndList :list1="list1" :list2="list2"></DndList>
    <!--<Tinymce></Tinymce>-->
    <ThemePicker></ThemePicker>
    <SlideVerify></SlideVerify>
    <JsonEditor v-model="pythen"></JsonEditor>
    <Kanban></Kanban>
    <ScrollPane>
      <div style="height: 1000px;">
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
        gcsd
      </div>
    </ScrollPane>

  </div>
</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import DndList from '@/components/DndList'
  import Tinymce from '@/components/Tinymce'
  import ThemePicker from '@/components/ThemePicker'
  import SlideVerify from '@/components/SlideVerify'
  import ScrollPane from '@/components/ScrollPane'
  import JsonEditor from '@/components/JsonEditor'
  import Kanban from '@/components/Kanban'
  import {TreeList} from './common'
  export default {
    name: 'text',
    components: {
      BackToTop,
      DndList,
      ThemePicker,
      SlideVerify,
      ScrollPane,
      JsonEditor,
      Kanban,
      Tinymce,
      TreeList
    },
    data () {
      return {
        loadfile: '',
        listtt: [
          {
            label: 'das',
            name: 'das',
            id: '22',
            children: [
              {
                label: 'xasx',
                name: 'xasx',
                id: 'e3'
              }
            ]
          }
        ],
        pythen: '',
        list1: [
          {name: 'zhangsan', id: 1},
          {name: 'lisi', id: 2},
          {name: 'wangmaiz', id: 3},
          {name: 'zhangfei', id: 4},
          {name: 'guanyiu', id: 5},
          {name: 'liubei', id: 6},
        ],
        list2: [
          {name: 'zhangsan', id: 1},
          {name: 'lisi', id: 2},
          {name: 'wangmaiz', id: 3},
          {name: 'zhangfei', id: 4},
          {name: 'guanyiu', id: 5},
          {name: 'liubei', id: 6},
        ]
      }
    },
    mounted() {
      setTimeout(() => {
        this.loadfile = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1592588910&di=b853f0f980eb106ddf6b3e2fe0095935&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
      },5000)
    },
    watch: {
      pythen (val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped>
  .JsonEditor {
    height: 50px;
    line-height: 50px;
    transform: translate(0, 10px);
  }

</style>
