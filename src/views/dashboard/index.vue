<template>
  <div class="dashboard-container"><component :is="currentPlatform"></component></div>
</template>

<script>
import AdminDashboard from './home/dashboard.vue'

export default {
  name: 'dashboard',
  components: { AdminDashboard},
  data() {
    return {
      currentPlatform: 'AdminDashboard',
    }
  },
  created() {
  },
}
</script>
