<template>
  <section class="wrapper content-wrapper">
    <transition name = 'slide-fade' mode="out-in">
      <router-view />
    </transition>
  </section>
</template>
<script>
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
.bouce-enter-active{
  animation: bounce-in 1s ease;
}
.bounce-leave-active{
  animation: bounce-in 1s ease reverse;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}
@keyframes bounce-in{
  0%{
    transform: translateX(-100%);
  }
  50%{
    transform: scale(.8)
  }
  100%{
    transform: scale(1);
  }
}
</style>
