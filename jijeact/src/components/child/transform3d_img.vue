<template>
    <div class="center">
        <div id="img" class="tar" @click="go">
            <img :src="$store.state.imgPath" :style="{maxHeight:maxheight}"/>
            <div class="size" id="mask"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "transform3d_img",
        data(){
            return{
                //img:require('@/assets/show1.jpg'),
            }
        },

        methods:{
            go(){
                window.open(this.$store.state.url)
            },
            init(){
                var height =document.body.clientHeight;
                var width =document.body.clientWidth;
                var move_k = 10;
                var change_x=0,
                    change_y=0,
                    now_x = 0,
                    now_y = 0,
                    light =[0,0],
                    deg = [0,0];
                document.body.addEventListener('mousemove',function (e) {
                    var x = e.offsetX;
                    var y = e.offsetY;

                    change_x = (x - width/2)/(width/2) ;
                    change_y = (y - height/2)/(height/2) ;
                    deg[1] = (x/width)*180+90;

                    light[1] = Math.abs((y-height/2)/(height/2));
                    ani();
                })
                //window.requestAnimationFrame(ani);
                var img = document.getElementById('img');
                var mask = document.getElementById('mask');
                function ani() {
                    now_x = now_x+(change_x-now_x)*0.15;
                    now_y = now_y+(change_y-now_y)*0.15;
                    deg[0] = deg[0]+(deg[1]-deg[0])*0.15;
                    light[0] = light[0]+(light[1]-light[0])*0.15;
                    img.style='perspective: 1000px; transform-style: preserve-3d; transform: rotateY('+now_x*move_k+'deg) rotateX('+now_y*move_k+'deg);background: linear-gradient('+deg[0]+'deg, rgba(255, 255, 255, '+light[0]+') 0%, rgba(255, 255, 255, 0) 80%)';
                    mask.style = 'background: linear-gradient('+deg[0]+'deg, rgba(255, 255, 255, '+light[0]+') 0%, rgba(255, 255, 255, 0) 80%)';
                    //window.requestAnimationFrame(ani);
                }
            }
        },

        mounted:function () {
            this.init();
            console.log(this.$store.state.imgPath);
        },

        computed:{
            maxheight:function () {
                return (window.innerHeight*0.7)+'px';
            }
        }
    }
</script>

<style scoped>
    .center{
        position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);
        perspective: 1000px;
        transform-style: preserve-3d;

    }
    .size{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .tar{
        cursor: pointer;
    }
</style>
