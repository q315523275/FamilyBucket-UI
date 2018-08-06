import api from '../../../api/microservice' // eslint-disable-line
import Base from '../../Base/index'
import { deepCopy } from '../../../assets/utils/util'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'

export default class extends Base {
  async search () {
    const filter = this.vm.filters
    const res = await api.QueryTrace(filter, {
      validator: (obj) => {
        return true
      }
    })
    if (res) {
      this.vm.dataList = res
      if (res.length > 0) {
        let arr = deepCopy(res)
        this.vm.maxDuration = arr.sort((x, y) => { return y.Duration - x.Duration })[0].Duration
        // 200ms 为基数
        if (this.vm.maxDuration < 200000) {
          this.vm.maxDuration = 200000
        }
      }
    }
  }
  async echartInit () {
    const filter = this.vm.filters
    const res = await api.QueryTraceHistogram(filter, {
      validator: (obj) => {
        return true
      },
      loadID: 'echart'
    })
    if (res) {
      let dateList = res.map(x => x.Time)
      let valueList = res.map(x => x.Count)
      this.vm.accessChart = echarts.init(document.getElementById('myChart'))
      this.vm.accessChart.setOption({
        title: {
          left: 'center',
          text: '微服务接口调用量，数据来自链路追踪'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: -45
          },
          data: dateList
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          bottom: '110px'
        },
        series: {
          name: '请求量',
          type: 'line',
          areaStyle: {},
          data: valueList
        }
      })
    }
  }
  async echartSearch () {
    const filter = this.vm.filters
    const res = await api.QueryTraceHistogram(filter, {
      validator: (obj) => {
        return true
      },
      loadID: 'echart'
    })
    if (res) {
      let dateList = res.map(x => x.Time)
      let valueList = res.map(x => x.Count)
      this.vm.accessChart.setOption({
        xAxis: {
          data: dateList
        },
        series: {
          data: valueList
        }
      })
      if (this.vm.filters.limit > 0) {
        setTimeout(() => {
          this.vm.filters.startTimestamp = new Date(this.vm.$utils.Date.add(null, -2, 'hou')).getTime()
          this.vm.filters.finishTimestamp = new Date().getTime()
          this.echartSearch()
        }, this.vm.filters.limit * 1000)
      }
    }
  }
  async showDetail (traceId) {
    const res = await api.QueryTraceDetail(traceId, {
      validator: (obj) => {
        return true
      },
      loadID: 'edit'
    })
    if (res) {
      this.vm.detailModel = res
      this.vm.showDetail = true
    }
  }
  async showSpanDetail (spanId) {
    const res = await api.QuerySpanDetail(spanId, {
      validator: (obj) => {
        return true
      },
      loadID: 'edit'
    })
    if (res) {
      this.vm.editModel = res
      this.vm.showEdit = true
    }
  }
}
