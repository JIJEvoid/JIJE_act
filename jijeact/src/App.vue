<template>
    <div>
        <div style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 999">
            <full-page ref="fullpage" :options="options" id="fullpage">
                <div class="section">
                    <h3>Section 1</h3>
                </div>
                <div class="section">
                    <h3>Section 2</h3>
                </div>
                <div class="section">
                    <h3>Section 3</h3>
                </div>
                <div class="section">
                    <h3>Section 4</h3>
                </div>
            </full-page>

        </div>
        <div id="world" style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 99"></div>
    </div>



</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {
                options: {
                    licenseKey:"OPEN-SOURCE-GPLV3-LICENSE",
                    afterLoad: this.afterLoad,
                    scrollBar: false,
                    menu: '#menu',
                    navigation: true,
                    //anchors: ['page1', 'page2', 'page3'],
                }
            }
        },

        methods: {
            afterLoad: function (before, end) {
                console.log(before.index, end.index);

            },
        },

        mounted:function () {
            //console.log(this.$refs);
            //this.$refs.fullpage.api.moveSectionDown()
            window.onLoad();
        }

    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .page-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

</style>
