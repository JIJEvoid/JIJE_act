<!--todo 其他模块-->
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
    </div>
</template>

<script>
    export default {
        name: "other",methods: {

        },
        props:{
            hide:Boolean
        },
        data() {
            return {
                img:require('@/assets/t3.png'),
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
    }
</script>

<style scoped>

</style>
