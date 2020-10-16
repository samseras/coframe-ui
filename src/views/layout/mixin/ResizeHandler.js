import store from '@/store'

const { body } = document
const WIDTH = 1024
const MOBILEWIDTH = 768
const DESKTOPWIDTH = 1200
const RATIO = 3
export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isTablet = this.isTablet()
    const isPhone = this.isPhone()
    if (isTablet || isPhone) {
      store.dispatch('toggleDevice', isPhone ? 'phone' :isTablet ? 'mobile' : 'desktop')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isDesktop() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < DESKTOPWIDTH
    },
    isTablet() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    isPhone () {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < MOBILEWIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isTablet = this.isTablet()
        const isPhone = this.isPhone()
        const isDesktop = this.isDesktop()
        if (isPhone) store.dispatch('toggleDevice', 'phone')
        else if (isTablet) store.dispatch('toggleDevice', 'mobile')
        else if (isDesktop) store.dispatch('toggleDevice', 'desktop')
        else store.dispatch('toggleDevice', 'desktopHD')

        if (isTablet) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    },
  },
}
