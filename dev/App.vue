<template>
    <div style="height:300vh">
        <scroll-top>
        </scroll-top>
        <scroll-top class="rectangle second" color="#2CA8FF">
        </scroll-top>
        <scroll-top class="square third" color="#18ce0f">
        </scroll-top>
        <scroll-top class="fourth" color="#FF3636" hover>
        </scroll-top>
    </div>
</template>
<script>
    import ScrollTop from '../src/index'
    export default {
        components: {ScrollTop},
        data () {
            return {
                msg: 'Hello'
            }
        }
    }
</script>
<style>
    .scroll-top.rectangle {
       border-radius: 0;
        width: 100px;
        height: 40px;
    }
    .scroll-top.square {
        border-radius: 0;
    }
    .scroll-top.second{
        right: 100px;
    }
    .scroll-top.third{
        right: 230px;
    }
    .scroll-top.fourth{
        right: 300px;
    }
</style>