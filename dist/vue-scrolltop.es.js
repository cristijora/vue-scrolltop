import throttle from 'throttle-debounce/throttle';
import { ChevronUpIcon } from 'vue-feather-icons';
import SmoothScroll from 'smoothscroll-polyfill';

SmoothScroll.polyfill();
var ScrollTop$1 = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transition } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showBackToTop, expression: "showBackToTop" }], staticClass: "scroll-top", class: [{ 'hover': _vm.shouldHover }, { 'hoverable': _vm.hover }], style: _vm.styles, on: { "mouseenter": function mouseenter($event) {
                    _vm.shouldHover = true;
                }, "mouseleave": function mouseleave($event) {
                    _vm.shouldHover = false;
                }, "click": _vm.toTop } }, [_vm._t("default", [_c('chevron-up-icon', { staticStyle: { "color": "white" } })])], 2)]);
    }, staticRenderFns: [],
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
            default: function _default() {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            }
        }
    },
    components: {
        ChevronUpIcon: ChevronUpIcon
    },
    data: function data() {
        return {
            showBackToTop: false,
            shouldHover: false,
            timeout: 0,
            scrollInterval: 20
        };
    },

    computed: {
        styles: function styles() {
            var styles = {};
            if (this.color) {
                styles.backgroundColor = this.color;
            }
            return styles;
        }
    },
    methods: {
        toTop: function toTop() {
            if (this.hover) {
                this.shouldHover = false;
            }
            this.showBackToTop = false;
            this.scrollFunction();
        },
        handleScroll: function handleScroll() {
            this.showBackToTop = (document.body.scrollTop || document.documentElement.scrollTop) >= 0.1 * document.body.clientHeight;
        }
    },
    mounted: function mounted() {
        this.throttledScrollHandler = throttle(300, this.handleScroll);
        document.addEventListener('scroll', this.throttledScrollHandler);
    },
    beforeDestroy: function beforeDestroy() {
        document.removeEventListener('scroll', this.throttledScrollHandler);
    }
};

export default ScrollTop$1;
