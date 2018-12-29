<template>
  <section class="calendar-wrapper">
    <vue-event-calendar
      :events="mock"
      @day-changed="handleDayChange"
      @month-changed="handleMonthChange"></vue-event-calendar>
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {formatTime} from '@/utils/global'
const date = new Date()
export default {
  props: {},
  name: '',
  components: {},
  computed: {},
  data(){
    return {
      mock: [{
        date: '2018/11/12', // 必填
        title: 'Foo', // 必填
      }, {
        date: '2018/12/15',
        title: 'Bar',
        desc: 'description',
      }],
      searchMonth: {
        times: formatTime(new Date()),
        data: '',
        curmonth: `${date.getFullYear()}-${date.getMonth()+1}-1`
      }
    }
  },
  methods: {
    ...mapActions(['GetEventsDate', 'GetEventsAll']),
    handleDayChange(e){
      this.fetchDataByData(e.date)
    },
    handleMonthChange(e){
      this.fetchDataByMonth()
    },
    fetchDataByMonth(){
      this.GetEventsAll({search: this.searchMonth}).then(res => {
        let _temp = res.map(ii => {
          return ii = {title: '提醒', date: `${date.getFullYear()}/${date.getMonth() + 1}/${ii}`}
        })
        this.mock = _temp
      })
    },
    fetchDataByData(date){
      this.GetEventsDate({date}).then(res => {
        let _temp = res.map(ii => {
          return ii = {title: ii.title, date, desc: ii.content}
        })
        this.mock = _temp
      })
    }
  },
  created(){
    let year = date.getMonth() + 2 > 12 ? date.getFullYear() + 1 : date.getFullYear()
    this.searchMonth.data = `${year}-${date.getMonth() + 2 > 12 ? 1 : date.getMonth() +1}-1`
    this.fetchDataByMonth()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.calendar-wrapper{
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: @base-background;
}
</style>
