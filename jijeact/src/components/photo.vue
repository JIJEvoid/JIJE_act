<!-- todo 图片模块 -->
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
        name: "photo",
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
                img: require('@/assets/t2.png'),
                isshow: false,
                transformRight:50,//右侧偏移
                //item 光球的尺寸
                itemList: [
                    {
                        title: '眼睛小超人',//标题
                        img: './img/photo/yjxcr.png',//图片背景
                        url:'https://www.zcool.com.cn/work/ZMzM4OTE3Mjg=.html',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 70,
                        top: 20,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间

                    },
                    {
                        title: '北京青年影展',//标题
                        img: './img/photo/bjqnyz.png',//图片背景
                        url:'https://www.zcool.com.cn/work/ZMzM4NzEzNDQ=.html',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 66,
                        top: 25,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '鹿肉零食包装Venison snack packaging',//标题
                        img: './img/photo/lurou.png',//图片背景
                        url:'https://www.behance.net/gallery/48959401/Venison-snack-packaging?tracking_source=search%257C%25E5%2587%25A0%25E4%25BB%258B',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 80,
                        top: 51,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: 'Artcorp VI 寰艺教育 品牌',//标题
                        img: './img/photo/Artcorp.png',//图片背景
                        url:'https://www.behance.net/gallery/50026349/Artcorp-VI-?tracking_source=search%257C%25E5%2587%25A0%25E4%25BB%258B',
                        size: parseInt(Math.random()*20)+30,//光球尺寸
                        left: 90,
                        top: 28,
                        duration: parseInt(2*Math.random()+6)+'s',//持续时间
                        delay: parseInt(3*Math.random())+'s',//延迟时间
                    },
                    {
                        title: '好滴租车',//标题
                        img: './img/photo/haodi.png',//图片背景
                        url:'https://www.zcool.com.cn/work/ZMzQxNDM0NTY=.html',
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
