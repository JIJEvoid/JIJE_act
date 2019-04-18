<!--todo 游戏模块 page1-->
<template>
    <div style="width: 100%;height: 100%;">
        <div class="txt" :class="{'active':start}">
            <img class="img" src="//game.gtimg.cn/images/up/act/a20170301pre/images/298692010400560.png">
        </div>
        <div class="dot" :class="{'active':start}">
            <i>
                <b class="dotChild">

                </b>
            </i>

        </div>
    </div>
</template>

<script>
    export default {
        name: "game",
        methods: {
            init() {
                this.start = true;
            },
        },
        data() {
            return {
                start: false,
            }
        },
        mounted: function () {
            this.init();
        }
    }
</script>

<style scoped>



</style>
