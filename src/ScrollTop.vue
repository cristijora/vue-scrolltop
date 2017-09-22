<template>
    <transition :name="transition">
        <div class="scroll-top"
             :style="styles"
             :class="[{ 'hover': shouldHover }, {'hoverable': hover}]"
             v-show="showBackToTop"
             @mouseenter="shouldHover = true"
             @mouseleave="shouldHover = false"
             @click="toTop">
            <slot>
                <chevron-up-icon style="color: white;"></chevron-up-icon>
            </slot>
        </div>
    </transition>
</template>
<script>
    import throttle from 'throttle-debounce/throttle'
    import {ChevronUpIcon} from 'vue-feather-icons'
    import SmoothScroll from 'smoothscroll-polyfill'
    SmoothScroll.polyfill()
    export default {
        props: {
            at: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: ''
            },
            hover: {
                type: Boolean
            },
            transition: {
                type: String,
                default: "back-top-fade"
            },
            scrollDuration: {
                type: Number,
                default: 200
            },
            scrollFunction: {
                type: Function,
                default: () =>{
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                }
            }
        },
        components: {
            ChevronUpIcon
        },
        data () {
            return {
                showBackToTop: false,
                shouldHover: false,
                timeout: 0,
                scrollInterval: 20
            }
        },
        computed: {
            styles () {
                let styles = {}
                if(this.color){
                    styles.backgroundColor = this.color;
                }
                return styles
            }
        },
        methods: {
            toTop () {
                if(this.hover) {
                    this.shouldHover = false
                }
                this.showBackToTop = false
                this.scrollFunction()
            },
            handleScroll () {
                this.showBackToTop = (document.body.scrollTop || document.documentElement.scrollTop) >= 0.1 * document.body.clientHeight
            }
        },
        mounted () {
            this.throttledScrollHandler = throttle(300, this.handleScroll)
            document.addEventListener('scroll', this.throttledScrollHandler)
        },
        beforeDestroy () {
            document.removeEventListener('scroll', this.throttledScrollHandler)
        }
    }
</script>
<style lang="scss">
    $primary_color: #F55536;
    .scroll-top {
        background-color: $primary_color;
        position: fixed;
        right: 20px;
        bottom: 70px;
        size: 50px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        cursor: pointer;
        opacity: 1;
        transition: .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        &.hoverable {
            opacity: 0.4;
        }
        &.hover {
            opacity: 1;
        }
    }

    .back-top-fade-enter,
    .back-top-fade-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
</style>