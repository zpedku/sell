<template>
        <transition name="fade">
            <div v-show="showFlag" class="food" ref="food">
                <div class="food-content">
                    <div class="image-header">
                        <img :src="food.image">
                        <div class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                       <h1 class="title">{{food.name}}</h1>
                       <div class="detail">
                           <span class="sell-count">月售{{food.sellCount}}份</span>
                           <span class="rating">好评率{{food.rating}}%</span>
                       </div>
                       <div class="price">
                           <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                       </div>
                        <div class="cartcontrol-wrapper">
                            <cartctrol :food="food" @drop="_drop"></cartctrol>
                        </div>
                        <transition name="fade">
                            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车
                            </div>
                        </transition>
                   </div>
                </div>
            </div>
        </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import cartctrol from '../cartcontrol/cartcontrol'
    export default {
        name: 'food',
        props: {
            food: {
                type: Object
            }
        },
        data () {
            return {
                showFlag: false
            }
        },
        methods: {
            addFirst () {
                this.$emit('drop', event.target)
                Vue.set(this.food, 'count', 1)
            },
            show () {
                this.showFlag = true
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            },
            hide () {
                this.showFlag = false
            },
            _drop () { // TODO 这里父子组件多重传递,不是理想做法,迟些需要更正
                this.$emit('drop', event.target)
            }
        },
        components: {
            cartctrol
        }
    }
</script>

<style lang="stylus" scoped>
    .food
        position: fixed
        top 0
        left 0
        bottom 48px
        width 100%
        background-color: #fff;
        z-index 0
        transform: translate3d(0, 0, 0)
        &.fade-enter-active,&.fade-leave-active
            transition all .2s linear
        &.fade-enter,&.fade-leave-to
            transform: translate3d(100%, 0, 0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff
        .content
            position: relative
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
            .detail
                margin-bottom 18px
                line-height:10px
                font-size: 0
                .sell-count,.rating
                    font-size 10px
                    color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .cartcontrol-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 10px
                color: #fff
                background: rgb(0, 160, 220)
                opacity: 1
                &.fade-enter-active,&.fade-leave-active
                    transition: all 0.2s
                &.fade-enter, &.fade-leave-to
                    opacity: 0
</style>
