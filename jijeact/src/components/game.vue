<!--todo 游戏模块 page1-->
<template>
    <div style="width: 100%;height: 100%;">

        <div class="txt left" :class="{'active':hide}">
            <img class="img" :src="img">
        </div>

        <div class="dot" :class="{'active':hide}" @click.self="hideImg">
            <i class="iball" :title="item.title" @click="onclickItem()" :style="{width:item.size+'px',height:item.size+'px',top:item.top+'px',left:item.left}" v-for="(item,index) in itemList" :key="index">
                <b class="dotChild">

                </b>
            </i>
        </div>

        <transition name="slide-fade">
            <img3d v-if="$store.state.imgPath"></img3d>
        </transition>

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
                        img: '',//图片背景
                        size: parseInt(Math.random()*15)+25,//光球尺寸
                        left: 20*Math.random()+'%',
                        top: 20*Math.random()+'%',
                    }
                ],
            }
        },
        methods: {
            onclickItem: function () {
                this.$store.state.imgPath = './show1.jpg';
                this.$store.state.url = "https://www.baidu.com";
            },
            hideImg() {
                this.$store.state.imgPath = '';
            }
        },
        mounted: function () {
            this.isshow = true
        }
    }

</script>

<style scoped>


</style>
