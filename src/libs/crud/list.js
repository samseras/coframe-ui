import _ from 'lodash'
import moment from 'moment'
export default {
  computed: {
    gridList() {
      if (this.gridData) {
        if (!_.isArray(this.gridData)) {
          let arr = []
          Object.keys(this.gridData).forEach(key => {
            if (_.isArray(this.gridData[key])) {
              arr = this.gridData[key]
            }
          })
          return arr
        } else {
          return this.gridData
        }
      } else {
        return []
      }
    },
    gridTotal() {
      if (this.gridData && !_.isArray(this.gridData)) {
        return this.gridData.totalElements || this.gridData.total
      } else return 0
    },
    isShowPaging() {
      return this.gridTotal > 10
    },
  },
  data() {
    return {
      dialogVisible: false,
      selectRow: null,
      orderby: [],
      sortBy: [],
      selections: [],
      gridData: {
        data: [],
        total: 0,
      },
      query: {
        limit: 10,
        offset: 1,
      },
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.selectRow = null
      }
    },
  },
  methods: {
    async changePageSizer(pageSize) {
      this.query.limit = pageSize
      this.changePage()
    },

    createCriteria(Criteria, query){
      let cri = _.cloneDeep(Criteria)
      cri.criteria._and.forEach(and => {
        and._expr.forEach(expr => {
          if (query[expr._property]) {
            if (expr._min === '' && expr._max === '') {
              if (query[expr._property][0]) {
                expr._min = moment(query[expr._property][0]).format(expr.partten || 'YYYY-MM-DD')
              }
              if (query[expr._property][1]) {
                expr._max = moment(query[expr._property][1]).format(expr.partten || 'YYYY-MM-DD')
              }
            } else {
              expr._value = query[expr._property]
            }
          }
        })
      })
      cri.criteria._and.forEach(and => {
        and._expr = and._expr.filter(expr => query[expr._property])
      })
      cri.criteria._orderby = this.orderby
      cri.pageIndex = query.offset - 1
      cri.pageSize = query.limit
      cri.page = {begin: cri.pageIndex * cri.pageSize, length: cri.pageSize}
      return cri
    },
    async sortChange(sort){
      if (sort.prop) {
        this.orderby = [
          {
            "_property": sort.prop,
            "_sort": sort.order.replace('ending', '')
          }
        ]
        this.sortBy = {
          sortField: sort.prop,
          sortOrder: sort.order.replace('ending', ''),
        }
      } else {
        this.orderby = []
      }
      this.search()
    },
    otherQuery(data){
      return {
        ...data,
        ...this.sortBy,
        pageIndex: data.offset,
        pageSize: data.limit,
        page: {
          begin: (data.offset - 1) * data.limit, length: data.limit,
        }
      }
    },
    format(data, partten){
      if (data) {
        return moment(data).format(partten)
      }
    },
    openAdd() {
      this.dialogVisible = true
    },
    openEdit(row) {
      this.selectRow = row
      this.dialogVisible = true
    },
    remove(row, message) {
      this.$confirm(message || '此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          if (this.removeBody) {
            let resp = await this.removeBody.call(this, row)
            if (!resp.error) {
              this.search && this.search.call(this)
            }
          }
        })
        .catch(() => {
          this.removeReject && this.removeReject.call(this, row)
        })
    },
    batchOperate(command){
      if (command === 'batchRemove') {
        if (this.selections && this.selections.length > 0) {
          this.remove(this.selections)
        }
      }
    },
    selectionChange(selections){
      this.selections = selections
    },
    async changePage(index) {
      this.query = {...this.query, offset: index || 1}
      this.search()
    },
    async search(page) {
      if (!isNaN(page)) {
        this.query.offset = page <= 0 ? 1 : page
      }
      if (this.searchBody) {
        let resp = await this.searchBody.call(this)
        if (resp) {
          return (this.gridData = resp.data)
        } else {
          return null
        }
      }
      return null
    },
  },
}
