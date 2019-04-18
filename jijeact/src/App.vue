<template>
    <div>
        <div style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 999">
            <div id="fullpage" style="color: #fff;width: 100vw;height: 100vh;">

                <div class="section">
                    <game class="container" :hide="selectIndex==0">

                    </game>
                </div>
                <div class="section ">
                    <photo class="container" :hide="selectIndex==1">

                    </photo>
                </div>
                <div class="section ">
                    <other class="container" :hide="selectIndex==2">

                    </other>
                </div>
                <div class="section ">
                    <movie class="container" :hide="selectIndex==3">

                    </movie>
                </div>

            </div>

        </div>

        <div id="world" style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 99">

        </div>
    </div>

</template>

<script>

    import game from './components/game'
    import photo from './components/photo'
    import movie from './components/movie'
    import other from './components/other'

    export default {
        name: 'app',
        data: function () {
            return {
                selectIndex:-1,
            }
        },
        components:{
            game,
            photo,
            movie,
            other,
        },
        methods: {

        },

        mounted:function () {
            //this.$refs.fullpage.api.moveSectionDown()
            let me = this;
            new window.fullpage('#fullpage', {
                //options here
                autoScrolling:true,
                licensekey:'open-source-gplv3-license',
                scrollHorizontally: true,
                onLeave: function(origin, destination){
                    window.three.handleSlider(origin.index, destination.index);
                    me.selectIndex = destination.index;
                },

                scrollingSpeed:1800,
            });
            window.onLoad();
        },
        created:function () {
            window.vm = this;
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
