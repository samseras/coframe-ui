export default {
  data () {
    return{
      browser: '',
      restaurants: [
        {value: 'Firefox'},
        {value: 'Safari'},
        {value: 'Ubuntu'},
        {value: 'Chrome'}
      ]
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    submitResource () {
      if (this.browser === '') return
      this.$emit('onsubmit', this.browser)
      this.close()
    }
  }
}
