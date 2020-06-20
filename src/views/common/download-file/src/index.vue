<template>
  <div>
    <form id="myForm" ref="myForm" :method="method" target="myFrame"></form>
    <iframe name="myFrame" style="display: none" ref="download" frameborder="0"></iframe>
  </div>
</template>
<script>
  import {OtherUtil} from '@lib'
  export default {
    name: 'download-file',
    props: {
      value: {},
      method: {
        default: 'get',
      }
    },
    watch: {
      value(url){
        this.download(url)
      }
    },
    methods: {
      download(url){
        if (url) {
          if (['chrome', 'firefox', 'safari'].includes(OtherUtil.getBrowse().name)) {
            this.$refs['myForm'].action = url
            this.$refs['myForm'].submit()
//            this.$refs['download'].src = url
          } else {
            window.open(url)
          }
        }
        this.$emit('input', null)
      }
    }
  }
</script>
