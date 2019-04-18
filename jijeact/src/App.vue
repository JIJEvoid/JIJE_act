<template>
    <div>
        <div style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 999">
            <div id="fullpage" style="color: #fff;width: 100vw;height: 100vh;">
                <div class="section ">
                    <game class="container">

                    </game>
                </div>
                <div class="section ">
                    <div class="container">

                    </div>
                </div>
                <div class="section ">
                    <div class="container">

                    </div>
                </div>
                <div class="section ">
                    <div class="container">

                    </div>
                </div>
            </div>

        </div>
        <div id="world" style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 99"></div>
    </div>

</template>

<script>

    import game from './components/game'

    export default {
        name: 'app',
        data: function () {
            return {

            }
        },
        components:{
            game,
        },
        methods: {

        },

        mounted:function () {
            //this.$refs.fullpage.api.moveSectionDown()
            new window.fullpage('#fullpage', {
                //options here
                autoScrolling:true,
                licensekey:'open-source-gplv3-license',
                scrollHorizontally: true,
                onLeave: function(origin, destination){
                    window.three.handleSlider(origin.index, destination.index);
                },
                scrollingSpeed:1800,
            });
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

    .container{
        height: 100vh;width: 100vw;
    }

</style>
