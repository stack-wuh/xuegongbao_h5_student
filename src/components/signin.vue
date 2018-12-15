<template>
  <section class=" signin-wrapper wrapper">
    <section class="img-box">
      <img src="../assets/imgs/logo.png" alt="logo">
      <img src="../assets/imgs/title.png" alt="title">
    </section>

    <section class="form-wrapper">
      <van-field class="my-field"
        v-model="form.username"
        placeholder="请编辑用户名"
        label="用户名"
        clearable
        ></van-field>
      <van-field class="my-field"
        v-model="form.password"
        type="password"
        placeholder="请编辑密码"
        label="密码"
        clearable ></van-field>
      <van-button @click="submit" size="large" class="btn-submit">登录</van-button>
    </section>
  </section>
</template>
<script>
import {reloadTitleMixin} from '@/utils/mixin'
import $http from '@/utils/axios'
import {mapActions } from 'vuex'
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      form: {
        username: '',
        password: '',
      },
      docTitle: '学生登录'
    }
  },
  methods: {
    ...mapActions([
      'SignIn'
    ]),
    submit(){
      if(!this.form.username){
        this.$toast({
          type: 3,
          msg: '请编辑用户名'
        })
        return
      }
      if(!this.form.password){
        this.$toast({
          type: 3,
          msg: '请编辑登陆密码'
        })
        return
      }
      this.SignIn(this.form).then(res => {
        res.error == 0 &&
        setTimeout(() => {
          this.$router.push({path: '/index'})
          this._setItem('userinfo', this.form)
        }, 1000)
      })
    }
  },
  created(){},
  mixins: [reloadTitleMixin]
}
</script>
<style lang="less" scoped>
@import '../assets/style/color.less';
.wrapper{
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;

  img[alt="logo"]{
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  img[alt='title']{
    width: 5.8rem;
    height: .9rem;
  }
  .img-box{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .form-wrapper{
    margin-top: .7rem;
  }
  .my-field{
    width: 90vw;
    height: .8rem;
    margin-top: .4rem;
    padding: 0;
    padding: 0 .3rem;
    line-height: .8rem;
    border:1px solid #eee;

  }
  .btn-submit{
    height: .8rem;
    margin-top: 1rem;
    line-height: .8rem;
    border-radius: 4px;
    color: @text-color-revser;
    background-color: @base-color;
  }
}
</style>
