<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li class="menu-item"
                    v-for ="(item,index) in goods"
                    :key="index"
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
        <div class="foods-wrapper">
            <ul>
                <li class="food-list"
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
                                    <span class="count">月售{{food.cout}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const ERR_OK = 0
    export default {
        name: 'goods',
        data () {
            return {
                goods: []
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            this.$http.get('/api/goods').then((response) => {
                response = response.body
                if (response.errno === ERR_OK) {
                    this.goods = response.data
                }
            })
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
</style>
