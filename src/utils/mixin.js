/**
 * [reloadTitleMixin 切换当前页的documentTitle]
 * @type {Object}
 */
export const reloadTitleMixin = {
  data(){
    return {
      docTitle: '学工宝学生端公众号',
      defaultImg: require('@/assets/imgs/logo.png'),

      collectDefault: require('@/assets/imgs/icon-collected.png'),
      collectActive: require('@/assets/imgs/icon-collected-s.png'),
    }
  },
  computed:{
    documentTitle(){
      return this.$route.query.name
    },
    query(){
      return this.$route.query
    }
  },
  methods:{
    reLoadTitle(){
      document.title = this.docTitle || this.documentTitle
    }
  },
  created(){
    setTimeout(() => {
      this.reLoadTitle()
    }, 300)
  }
}

/**
 * [pushRouter 路由对象的push事件]
 * @type {Object}
 */
export const pushRouter = {
  methods: {
    $push(search){
      this.$router.push(search)
    }
  }
}
/**
 * [changeTabCurr 顶部导航的切换事件]
 * @type {Object}
 */
export const changeTabCurr = {
  data(){
    return {
      currTabIndex: 0,
    }
  },
  methods: {
    handleChangeTabCurr({index}){
      this.currTabIndex = index
      this.$emit('lisenterIndex', {index: index})
      return index
    },
  }
}

export const getListMore = {
  data(){
    return {
      canShow: false,
    }
  },
  methods: {
    handleScholl(e){
      let clientHeight = e.target.clientHeight ,
          scrollTop = e.target.scrollTop,
          scrollHeight = e.target.scrollHeight
          if(scrollHeight  == clientHeight + scrollTop){
            this.getMore()
          }
    },
    getMore(){
      console.log('is loading')
    }
  }
}
