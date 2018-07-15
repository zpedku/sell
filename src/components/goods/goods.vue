<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item"
                    v-for ="(item,index) in goods"
                    :key="index"
                    :class = "{'current':currentIndex===index}"
                    @click="selectMenu(index,$event)"
                >
                <span class="text border-1px">
                    <span
                        class="icon"
                        v-show="item.type>0"
                        :class="classMap[item.type]">
                    </span>
                     {{item.name}}
                </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list food-list-hook"
                    ref="foodListHook"
                    v-for="(item , index) in goods"
                    :key="index"
                >
                <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item"
                         v-for="(food,idx) in item.foods"
                         :key="idx"
                        >
                            <div class="icon"><img :src="food.icon" width="57" height="57"></div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart></shopcart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import shopcart from '../shopcart/shopcart'
    const ERR_OK = 0
    export default {
        name: 'goods',
        data () {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            }
        },
        computed: {
          currentIndex () {
              for (let i = 0; i < this.listHeight.length; i++) {
                  let height1 = this.listHeight[i]
                  let height2 = this.listHeight[i + 1]
                  if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                      // console.log('i: ${}', i)
                      return i
                  }
              }
              return 0
          }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            this.$http.get('/api/goods').then((response) => {
                response = response.body
                if (response.errno === ERR_OK) {
                    this.goods = response.data
                    this.$nextTick(() => {
                        this._initScroll()
                        this._calculateHeight()
                    })
                }
            })
        },
        methods: {
            selectMenu (index, event) {
                //   event._constructed 旧版本的better-srcoll 在pc端 会触发两次点击此事件,
                //   原因是原生event调用一次,better-scroll也派发了一次,所以需要判断此事件的来源, better-scroll派发事件带有_constructed
                // if (!event._constructed) {
                //      return
                // }
                let foodList = this.$refs.foodListHook
                let el = foodList[index]
                this.foodsScroll.scrollToElement(el, 300)
            },
            /* 初始化滚动容器 */
            _initScroll () {
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3 // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                })

                this.foodsScroll.on('scroll', (pos) => {
                    // 监听foodsWrapper滚动事件,回调函数获取pos对象,可以得到y轴滚动像素
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight () {
                let foodList = this.$refs.foodListHook
                let height = 0
                this.listHeight.push(height)
                foodList.forEach((food, i) => {
                    height += foodList[i].clientHeight
                    this.listHeight.push(height)
                })
                 // console.log(this.listHeight)
            }
        },
        components: {
            shopcart
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixin"
    .goods
        display flex
        position absolute
        top 174px
        bottom 46px
        width 100%
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position relative
                    z-index 10
                    margin-top -1px
                    background #fff
                    font-weight 700
                    .text
                        border none
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7, 17,27,0.1))
                    font-size 12px
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height: 26px
                line-height: 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    margin-bottom 0
                    border-none() /*这是是把最后一个元素的伪元素下划线设置为none */
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        margin-bottom 8px
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                    .desc
                        line-height 12px;
                        margin 8px
                    .extra
                        .count
                            margin-right 12px
                    .price
                        font-weight 700
                        line-height 24px
                        .now
                            margin-right 8px
                            font-size 14px
                            color rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
</style>
