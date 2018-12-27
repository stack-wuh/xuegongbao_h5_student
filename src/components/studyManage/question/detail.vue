<template>
  <section class="wrapper">
    <section class="header">
        <h3>{{info.title}}</h3>
        <p>{{info.describe}}</p>
        <time>截止时间: {{info.endtime}}</time>
    </section>

    <ul class="list">
      <li v-for="(ll, lid) in data" :key="lid" class="list-item">
        <p class="item-title">
          <span class="item-title__text">{{ll.title}}</span>
          <span class="item-title__tips">【{{ll.type}}】</span>
        </p>
        <p v-if="ll.type === '单选题'">
          <van-radio-group v-model="ll.content">
            <van-cell-group>
              <van-cell
                v-for="(rr, rid) in ll.option"
                :key="rid" :title="rr.option"
                clickable>
                <van-radio :name="rr.id" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </p>
        <p v-if="ll.type === '多选题'">
          <van-checkbox-group v-model="ll.content" >
            <van-cell-group>
              <van-cell
                v-for="(cc, cid) in ll.option" :key="cid"
                @click="toggle(cid)" :title="cc.option"
                clickable>
                  <van-checkbox :name="cc.id" ref="checkbox" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </p>
        <p v-if="ll.type === '问答题'">
          <van-cell style="padding: 0;">
            <van-field v-model="ll.content" type="textarea" placeholder="请编辑内容" />
          </van-cell>
        </p>
        <div class="matrix" v-if="ll.type === '矩阵题'">
          <div class="matrix-index">
            <span v-for="(ss, sid) in ll.option"
              :key="sid"
              >{{ss.option}}
            </span>
          </div>
          <div class="matrix-box" v-for="(ss, sid) in ll.option" :key="sid" >
            <span>{{ss.option}}</span>
            <van-radio-group v-model="ss.content">
              <van-radio
                  v-for="(rr, rid) in ll.option"
                  :key="rid" :name="rr.option"
                  class="margin-bm__10" ></van-radio>
            </van-radio-group>
          </div>
        </div>
      </li>
    </ul>
    <section style="height: 1.4rem;"></section>
    <my-button :childClick="handleSubmit" size="large" />
  </section>
</template>
<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {reloadTitleMixin} from '@/utils/mixin'
import MyButton from '@/views/forms/button'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  computed: {},
  data(){
    return {
      radio: 1,
      result: [],

      info: {},
      data:[]
    }
  },
  methods: {
    ...mapActions({
      'GetQuesDetail': 'GetQuesDetail',
      'QuesPost': 'QuesPost'
    }),
    toggle(index){
      this.$refs.checkbox[index].toggle()
    },
    handleSubmit(){
      let _data = JSON.parse(JSON.stringify(this.data)), temp_form = []
      _data.map(ii => {
        if(ii.type == '单选题'){
          ii = {type: 1, id: ii.id, content: [].concat(ii.content)}
          temp_form.push(ii)
        }else if(ii.type == '多选题'){
          ii = {type: 2, id: ii.id, content: ii.content}
          temp_form.push(ii)
        }else if(ii.type == '问答题'){
           ii = {type: 3, id: ii.id, content: [].concat(ii.content)}
           temp_form.push(ii)
        }else{
          let labels = ii.label.split(';').map((ll, lid) => {
            return ll = {type: 4, id: ii.id, label: ll, content: [].concat(ii.option[lid].content) }
          })
          temp_form = [...temp_form, ...labels]
        }
      })
      this.QuesPost({id: this.query.id, data: temp_form})
    }
  },
  created(){
    this.docTitle = '问卷调查详情'
    this.GetQuesDetail({id: this.query.id}).then(res => {
      this.info = res.info
      this.data = res.data
    })
  },
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../../../assets/style/color.less';
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  background-color: @base-background;

  .header{
    height: 2rem;
    padding: .3rem;
    margin-bottom: .3rem;
    background-color: #fff;
    box-sizing: border-box;
    font-size: .26rem;
    color: #666;
    text-align: center;
    line-height: 1.6;
    h3{
      font-size: .32rem;
      color: #333;
    }
  }

  .list{
    .list-item{
      margin-bottom: .4rem;
      .item-title{
        padding: .2rem 0;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        .item-title__text{
          padding-left: .2rem;
          border-left: .1rem solid @base-color;
        }
        .item-title__tips{
          color: #3F9CE2;
          font-size: .24rem;
        }
      }

      .matrix{
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        box-sizing: border-box;
        .matrix-box{
          display: flex;
          flex-flow: column wrap;
          align-items: center;
        }
        .matrix-index{
          width: .3rem;
          margin-top: .3rem;
          line-height: 2.4;
        }
      }
    }
  }
}
</style>
