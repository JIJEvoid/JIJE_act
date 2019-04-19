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
        <img :src="img.logo" style="position: absolute;top: 0;left: 0;z-index: 999" alt="">
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
                selectIndex: -1,
                orienter: null,
                self: {
                    drag: {lon: 0, lat: 0},
                    aim: {lat: 0, lon: 0},
                    fix: {lon: 0, lat: 0}
                },
                targetlon: 0,
                targetlat: 0,
                lon: 0,
                lat: 0,
                target: new window.THREE.Vector3(),
                phi: 0,
                theta: 0,
                img:{
                    logo:require('@/assets/logo.png'),
                }
            }
        },
        components: {
            game,
            photo,
            movie,
            other,
        },
        methods: {
            /**
             * todo 判断浏览os
             */
            checkOS: function () {
                if (this.$tools.IsPC) {
                    this.$store.state.OS = `pc`;
                } else {
                    this.$store.state.OS = `mobile`;
                }
            },

            // 初始化重力感应
            initDevices: function () {

                this.orienter = new window.Orienter();

                this.orienter.onOrient = (obj) => {
                    if (Math.abs(obj.lat - this.self.aim.lat) >= 1 || Math.abs(obj.lon - this.self.aim.lon) >= 1) {//防抖
                        this.self.aim.lat = obj.lat;
                        this.self.aim.lon = -obj.lon;
                    }
                    this.renderOrienter();
                }
                this.orienter.init();
            },

            // 重力感应处理
            renderOrienter: function () {

                this.targetlon = (this.self.aim.lon + this.self.fix.lon + this.self.drag.lon);
                this.targetlat = (this.self.aim.lat + this.self.fix.lat + this.self.drag.lat) * 0.35;

                if (Math.abs(this.targetlon - this.lon) >= 100) {
                    this.lon = this.targetlon;
                }

                this.lon += (this.targetlon - this.lon) * 0.15;
                this.lat += (this.targetlat - this.lat) * 0.15;

                this.lat = Math.max(-80, Math.min(80, this.lat));

                this.phi = window.THREE.Math.degToRad(90 - this.lat);
                this.theta = window.THREE.Math.degToRad(this.lon + 180);

                this.target.x = Math.sin(this.phi) * Math.cos(this.theta);
                this.target.y = Math.cos(this.phi);
                this.target.z = Math.sin(this.phi) * Math.sin(this.theta);

                if (window.three.particleSystem) {
                    window.three.particleSystem.position.x = this.target.x * 15;
                    window.three.particleSystem.position.y = this.target.y * 15;
                    window.three.particleSystem.rotation.y = this.target.z / 10;
                }

            }

        },

        mounted: function () {
            //this.$refs.fullpage.api.moveSectionDown()
            let me = this;
            new window.fullpage('#fullpage', {
                //options here
                autoScrolling: true,
                licensekey: 'open-source-gplv3-license',
                scrollHorizontally: true,
                onLeave: function (origin, destination) {
                    window.three.handleSlider(origin.index, destination.index);
                    me.selectIndex = destination.index;
                },

                scrollingSpeed: 1800,
            });

            window.onLoad();

        },

        created: function () {
            window.vm = this;
            this.checkOS();
            this.initDevices();
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

    .container {
        height: 100vh;
        width: 100vw;
    }

</style>
