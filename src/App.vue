<template>
  <div >
      <!-- 通过v-bind到子组件,把属性传递到子组件中 -->
      <sell-header :seller="seller"></sell-header>
      <div class="tab border-1px">
          <div class="tab-item">
              <router-link to="/goods"><a class="tab-link">商品</a></router-link>
          </div>
          <div class="tab-item">
              <router-link to="/ranting"><a class="tab-link">评论</a></router-link>
          </div>
          <div class="tab-item">
              <router-link to="/seller"><a class="tab-link">商家</a></router-link>
          </div>
      </div>
      <!--路由出口-->
      <!--路由匹配的组件将显示在这里-->
      <router-view></router-view>
  </div>
</template>

<script>
import sellHeader from './components/header/header.vue'
const ERR_OK = 0
export default {
  name: 'App',
    data () {
      return {
          seller: {
          }
      }
    },
    created () { // 钩子函数
      this.$http.get('/api/seller').then((response) => {
          response = response.body
          if (response.errno === ERR_OK) {
                this.seller = response.data
                console.log(this.seller)
          }
      })
    },
    components: {
        sellHeader
    }
}

</script>

<style lang="stylus" scoped>
    @import "./common/stylus/mixin.styl"
        .tab
            display flex
            width 100%
            height 40px
            line-height 40px
            border-1px(rgba(7, 17, 27, 0.1))
            .tab-item
                flex 1
                text-align center
                a
                 display block
                 font-size 14px
                 color rgb(77,85,93)
                .router-link-active .tab-link
                    color rgb(240,20,20)
</style>
