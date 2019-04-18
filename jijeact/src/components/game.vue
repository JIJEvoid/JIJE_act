<!--todo 游戏模块 page1-->
<template>
    <div style="width: 100%;height: 100%;">
        <div class="txt left" :class="{'active':hide}">
            <img class="img" :src="img">
        </div>
        <div class="dot" :class="{'active':hide}">
            <i>
                <b class="dotChild">

                </b>
            </i>

        </div>
        <img3d v-if="isshow"></img3d>
    </div>
</template>

<script>
    import img3d from './child/transform3d_img'

    export default {
        name: "game",
        methods: {

        },
        components:{
            img3d
        },
        props:{
            hide:Boolean
        },
        data() {
            return {

                img:require('@/assets/t1.png'),
                isshow:false,
                //item 光球的尺寸
                sizeList:[],
                item:[
                    {
                        title:'',//标题
                        img:'',//图片背景
                        size:'',//光球尺寸
                    }
                ],
            }
        },
        mounted:function () {
            this.isshow = true
        }
    }

</script>

<style scoped>



</style>
