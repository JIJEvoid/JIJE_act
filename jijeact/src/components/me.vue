<!-- todo 图片模块 -->
<template>

    <div style="width: 100%;height: 100%;">

        <div class="txt" :style="{height:imgHeight,top:imgTop}" :class="{'active':hide}" style="transform: translateX(-50%);left: 50%;">
            <img class="img" :src="img">
        </div>

        <!--<div class="dot" :class="{'active':hide}" @click.self="hideImg">
            <i class="iball" :title="item.title" @click="onclickItem(item)"
               :style="{width:item.size+'px',height:item.size+'px',top:item.top+'%',left:item.left+'%'}"
               v-for="(item,index) in itemList" :key="index">
                <b class="dotChild" :style="{animationDuration:item.duration,animationDelay:item.delay}">

                </b>
            </i>
        </div>-->


    </div>

</template>
<script>
    export default {
        name: "me",

        props: {
            hide: Boolean
        },
        data() {
            return {
                target_img: '',//点击查看的图片
                target_url: '',//点击查看的url
                img: require('@/assets/t6.png'),
                isshow: false,
                transformRight:50,//右侧偏移
                //item 光球的尺寸
                itemList: [
                    {
                        title: '侠客天涯路',//标题
                        img: './show1.jpg',//图片背景
                        url:'https://www.baidu.com',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 70,
                        top: 20,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间

                    },
                    {
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
                    return `25%`;
                }
            },
            imgTop:function () {
                if(window.innerHeight>window.innerWidth){
                    return `80%`;
                }else{
                    return `50%`;
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
