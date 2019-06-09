<!--todo 游戏模块 page1-->
<template>

    <div style="width: 100%;height: 100%;">

        <div class="txt left" :style="{height:imgHeight}" :class="{'active':hide}">
            <img class="img" :src="img">
        </div>

        <div class="dot" :class="{'active':hide}" @click="hideImg">
            <i class="iball" :title="item.title" @click="onclickItem(item)" :style="{width:item.size+'px',height:item.size+'px',top:item.top+'%',left:item.left+'%'}" v-for="(item,index) in itemList" :key="index">
                <b class="dotChild" :style="{animationDuration:item.duration,animationDelay:item.delay}">

                </b>
            </i>
        </div>



    </div>

</template>

<script>
    import img3d from './child/transform3d_img'

    export default {
        name: "game",

        components: {
            img3d
        },
        props: {
            hide: Boolean
        },
        data() {
            return {
                target_img: '',//点击查看的图片
                target_url: '',//点击查看的url
                img: require('@/assets/t1.png'),
                isshow: false,
                //item 光球的尺寸
                itemList: [
                    {
                        title: '侠客天涯路',//标题
                        img: './img/game/xktyl.png',//图片背景
                        url:'http://news.yeyou.com/content/07232017/065934886_1.shtml',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 20,
                        top: 20,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间

                    },
                    {
                        title: '速八酷跑',//标题
                        img: './img/game/su8.png',//图片背景
                        url:'https://h5.jzhu.cn/static/game2_runToSu8/index.html?sourcehierarchy=2&sourceway=3',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 16,
                        top: 25,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '追月',//标题
                        img: './img/game/zhuiyue.png',//图片背景
                        url:'https://h5.jzhu.cn/static/game23_zhuiyue/index.html?sourcehierarchy=2&sourceway=3',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 30,
                        top: 51,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '光之旅途',//标题
                        img: './img/game/gzlt.png',//图片背景
                        url:'https://h5.jzhu.cn/static/game22_snakeVsBlock/index.html?sourcehierarchy=2&sourceway=3',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 40,
                        top: 28,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '太太乐堆出鲜美味',//标题
                        img: './img/game/ttl.png',//图片背景
                        url:'https://h5.jzhu.cn/static/game7_QieDanGao/index.html?sourcehierarchy=2&sourceway=3',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 10,
                        top: 61,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '更多游戏',//标题
                        img: './img/game/gengduo.png',//图片背景
                        url:'https://h5.jzhu.cn/static/newGameLib/',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 20,
                        top: 61,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },


                ],
            }
        },
        methods: {
            onclickItem: function (item) {
                this.$store.state.imgPath = item.img;
                this.$store.state.url = item.url;
                this.$store.state.imgName = item.title;
            },
            hideImg() {
                this.$store.state.imgPath = '';
            }
        },
        computed:{
            imgHeight:function(){
                if(window.innerHeight>window.innerWidth){
                    return `15%`;
                }else{
                    return `15%`;
                }
            }
        },
        mounted: function () {
            this.isshow = true;
            if(this.$store.state.OS==`pc`){

            }else{

            }


        }
    }

</script>

<style scoped>

</style>
