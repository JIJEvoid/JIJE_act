<!--todo 电影模块 page3-->
<template>

    <div style="width: 100%;height: 100%;">

        <div class="txt right" :style="{height:imgHeight}" :class="{'active':hide}">
            <img class="img" :src="img">
        </div>

        <div class="dot" :class="{'active':hide}" @click.self="hideImg">
            <i class="iball" :title="item.title" @click="onclickItem(item)"
               :style="{width:item.size+'px',height:item.size+'px',top:item.top+'%',left:item.left+'%'}"
               v-for="(item,index) in itemList" :key="index">
                <b class="dotChild" :style="{animationDuration:item.duration,animationDelay:item.delay}">

                </b>
            </i>
        </div>


    </div>

</template>
<script>
    import img3d from './child/transform3d_img'

    export default {
        name: "movie",
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
                img: require('@/assets/t4.png'),
                isshow: false,
                transformRight:50,//右侧偏移
                //item 光球的尺寸
                itemList: [
                    {
                        title: 'paperEngine壁纸集',//标题
                        img: './img/movie.png',//图片背景
                        url:'http://jijevoid.com/movie/',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 70,
                        top: 20,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },

                    /*{
                        title: '侠客天涯路',//标题
                        img: './show1.jpg',//图片背景
                        url:'https://www.baidu.com',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 66,
                        top: 25,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '侠客天涯路',//标题
                        img: './show1.jpg',//图片背景
                        url:'https://www.baidu.com',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 80,
                        top: 51,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '侠客天涯路',//标题
                        img: './show1.jpg',//图片背景
                        url:'https://www.baidu.com',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 90,
                        top: 28,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '侠客天涯路',//标题
                        img: './show1.jpg',//图片背景
                        url:'https://www.baidu.com',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 83,
                        top: 61,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },*/
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
            this.isshow = true
        }
    }

</script>
<style scoped>
</style>
