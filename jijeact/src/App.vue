<template>

    <div :class="{'mobile':$store.state.OS!='pc'}">

        <div style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 999;overflow: hidden;">
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

                <div class="section ">
                    <me class="container" :hide="selectIndex==4">

                    </me>
                </div>

            </div>

            <transition name="slide-fade">
                <img3d v-if="$store.state.imgPath" style=""></img3d>
            </transition>

        </div>


        <div id="world" style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 1">

        </div>

        <transition name="fade">
        <div v-cloak class="mouse" v-show="isInit&&$store.state.OS=='pc'&&selectIndex!=4">
            <div class="outline"></div>
            <div class="wheel"></div>
        </div>
        </transition>


        <transition name="fade">
        <div v-cloak class="mouse1" v-show="isInit&&$store.state.OS!='pc'&&selectIndex!=4">
            <div class="outline"></div>
            <div class="wheel"></div>
        </div>
        </transition>

        <transition name="fade">
            <img :src="img.logo" v-if="isInit" :style="{'top': +style.top+'px','left': +style.left+'px'}"  style="position: absolute;z-index: 100;opacity: 0.9" alt="">
        </transition>

        <audio src="./bgm.mp3" loop="loop" style="visibility: hidden;" autoplay="autoplay"></audio>

    </div>

</template>

<script>
    import game from './components/game'
    import photo from './components/photo'
    import movie from './components/movie'
    import other from './components/other'
    import me from './components/me'

    import img3d from './components/child/transform3d_img'

    export default {
        name: 'app',

        data: function () {
            return {
                isInit:false,
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
                },
                /**mouse事件数据**/

                // 位置偏移量
                nowtransiform:{
                    x:0,
                    y:0,
                },
                // 旋转角度偏移量
                nowrotate:{
                    x:0,
                    y:0,
                    z:0,
                }
            }
        },

        components: {
            game,
            photo,
            movie,
            other,
            me,
            img3d
        },

        methods: {

            init(){
                this.selectIndex = 0;
                this.createFullpage();
                if(this.$store.state.OS!='pc')this.initDevices();
                else{
                    this.initMouseEvent();
                }


            },

            // 判断浏览os
            checkOS: function () {
                if (this.$tools.IsPC()) {
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
                    window.three.particleSystem.position.x = this.target.y * 30;
                    window.three.particleSystem.position.y = this.target.x * 5;
                    window.three.particleSystem.rotation.y = this.target.z / 10;
                }

            },

            // 初始化鼠标mouse事件 随着鼠标屏幕位置,模型进行位移旋转
            initMouseEvent :function(){
                this.
                document.body.addEventListener(`mousemove`,(e)=>{
                    // 根据xy 进行模型位置的阻尼运动 系数0.15
                    console.log(e.clientX,e.clientY);


                },false)
            },

            // 创建fullpage
            createFullpage:function () {
                this.isInit = true;
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
                    anchors: ['page1', 'page2', 'page3', 'page4','page5',],
                    navigation: true,
                    navigationPosition:'left',
                    navigationTooltips:['game','idea','other','medie','me'],
                    slidesNavigation:true,
                });
            },

            // link指定page
            linkto:function(i){
                console.log(i);
            },

        },

        computed:{
            style:function () {
                if(this.$store.state.OS=='pc'){
                    return{
                        top: 35,
                        left: 55
                    }
                }
                else{
                    return{
                        top: 10,
                        left: 10
                    }
                }
            }
        },

        mounted: function () {
            window.onLoad();
        },

        created: function () {
            window.vm = this;
            this.checkOS();

        }
    }
</script>

<style>
    #myMenu{
        position: absolute;top: 0;left: 0;z-index: 100;
        color: #fff;
    }

    .section {
        text-align: center; font: 50px "Microsoft Yahei"; color: #fff;
    }

    #fp-nav{
        z-index: 10000;
    }

    #fp-nav.fp-left {
        left: 0px;
    }

    #fp-nav ul li a span, .fp-slidesNav ul li a span{
        background-color: #FFF;
    }
    .nav{
        position: fixed;
        left: 2%;
        top: 50%;
        z-index: 12;
        width: 100px;
        height: 600px;
        margin-top: -300px;
    }

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

    .mouse {
        position: fixed;
        left: 50%;
        bottom: 20px;
        width: 50px;
        height: 68px;
        z-index: 100;
        margin-top: -47px;
        margin-left: -23px;
        pointer-events: none;
        transition: opacity 3s 3s;
        -webkit-tap-highlight-color: transparent;
    }

    .mouse .outline {
        background-position: -122px 0px;
        width: 40px;
        height: 76px;
        opacity: .7;
        background-repeat: no-repeat;
        background-image: url('./assets/sprite.png');

    }

    .mouse .wheel {
        background-position: 0px -184px;
        width: 8px;
        height: 12px;
        position: absolute;
        top: 1px;
        left: 16px;
        -webkit-animation: mousewheel 2s 2s infinite;
        animation: mousewheel 2s 2s infinite;
        background-repeat: no-repeat;
        background-image: url(//game.gtimg.cn/images/up/act/a20170301pre/images/up2017pre_z.png);
    }

    .mouse1 {
        content: '';
        background-image: url('./assets/downani.png');
        width: 14px;
        height: 28px;
        background-size: cover;
        position: fixed;
        bottom: 20px;
        left: 50%;
        margin-left: -7px;
        opacity: 1;
        z-index: 999;
        display: block;
        -webkit-animation: mousewheelmobile 4s 2s infinite;
        animation: mousewheelmobile 4s 2s infinite;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        margin-top: -47px;
        animation: mousewheel 2s 2s infinite;
    }

</style>
