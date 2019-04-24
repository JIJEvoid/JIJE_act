class ThreeDWorld {
    // 初始化数据层
    initVo() {
        // 是否初始化完成
        this.isInit = false;
        // 开始模型索引
        this.start = 0;
        // 结束模型索引
        this.end = 0;
        // 模型数量
        this.objLen = 0;
        // 模型文件路径
        this.modelingFiles = [
            'obj/robot.fbx',// 雪人 => game
            'obj/cpbook2.json', // book => h5海报
            'obj/cpac5.json', // bird =>
            'obj/cpmovie4.json', //电影 => 媒体
        ];
        // 记录每个模型的缩放倍数,旋转角度,位移偏差 todo 第一组为pc端样式 第二组为移动端样式
        this.transformInfo = [
            [
                {
                    scale: 0.08,
                    rotate: [-Math.PI / 2, 0, 0],
                    translate: [50, 0, 20],
                },
                {
                    scale: 80,
                    rotate: [0, Math.PI / 4, 0],
                    translate: [-30, 0, 0],
                },
                {
                    scale: 60,
                    rotate: [0, -Math.PI / 4, 0],
                    translate: [50, 0, 0],
                },
                {
                    scale: 40,
                    rotate: [Math.PI / 2, Math.PI / 8, 0],
                    translate: [-30, 0, 0],
                },
                {
                    scale: 0.4,
                    rotate: [0, 0 , 0],
                    translate: [0, -50, 0],
                },
            ],
            [
                {
                    scale: 0.08,
                    rotate: [-Math.PI / 2, 0, 0],
                    translate: [30, 0, 0],
                },
                {
                    scale: 80,
                    rotate: [0, Math.PI / 4, 0],
                    translate: [-30, 0, 0],
                },
                {
                    scale: 60,
                    rotate: [0, -Math.PI / 4, 0],
                    translate: [30, 0, 0],
                },
                {
                    scale: 25,
                    rotate: [Math.PI / 2, Math.PI / 4, 0],
                    translate: [0, -10, 0],
                },
                {
                    scale: 0.2,
                    rotate: [0,0, 0],
                    translate: [0, -0, 35],
                },
            ],
        ];

        //jijevoid 模型
        this.textMesh = null;
    }

    constructor(canvasContainer) {
        // canvas容器
        this.container = canvasContainer || document.body;
        // 数据层初始化
        this.initVo();
        // 创建场景
        this.createScene();
        // 创建灯光
        this.createLights();
        // 性能监控插件
        //this.initStats();
        // 鼠标交互事件监听
        this.addMouseListener();
        // 添加logo文字模型
        this.createText();
        // 轨道控制插件（鼠标拖拽视角、缩放等）
        /*this.orbitControls = new THREE.OrbitControls(this.camera);
        this.orbitControls.autoRotate = true;
        this.orbitControls.enableKeys = false;
        this.orbitControls.enableZoom = false;*/

        this.scene.add(this.camera);
        // 循环更新场景
        this.update();
    }

    // 创建场景
    createScene() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        // 创建场景
        this.scene = new THREE.Scene();
        // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
        this.scene.fog = new THREE.Fog(0x090918, 100, 600);
        // 创建相机
        let aspectRatio = this.WIDTH / this.HEIGHT;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 10000;
        /**
         * PerspectiveCamera 透视相机
         * @param fieldOfView 视角
         * @param aspectRatio 纵横比
         * @param nearPlane 近平面
         * @param farPlane 远平面
         */
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        // 设置相机的位置
        this.camera.position.x = 0;
        this.camera.position.z = 150;
        this.camera.position.y = 0;
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 在 css 中设置背景色透明显示渐变色
            alpha: true,
            // 开启抗锯齿
            antialias: true
        });
        // 渲染背景颜色同雾化的颜色
        this.renderer.setClearColor(this.scene.fog.color);
        // 定义渲染器的尺寸；在这里它会填满整个屏幕
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        // 打开渲染器的阴影地图
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMapSoft = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 在 HTML 创建的容器中添加渲染器的 DOM 元素
        this.container.appendChild(this.renderer.domElement);
        // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);

    }

    // 创建光源
    createLights() {
        // 户外光源
        // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

        // 环境光源
        this.ambientLight = new THREE.AmbientLight(0xdc8874, .2);

        // 方向光是从一个特定的方向的照射
        // 类似太阳，即所有光源是平行的
        // 第一个参数是关系颜色，第二个参数是光源强度
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

        // 设置光源的方向。
        this.shadowLight.position.set(50, 50, 50);

        // 开启光源投影
        this.shadowLight.castShadow = true;

        // 定义可见域的投射阴影
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;

        // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;

        // 为了使这些光源呈现效果，只需要将它们添加到场景中
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
        this.scene.add(this.ambientLight);
    }

    // 初始化性能监控
    initStats() {
        this.stats = new Stats();
        // 将性能监控屏区显示在左上角
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 100;
        this.container.appendChild(this.stats.domElement);
    }

    // 窗口改变自适应
    handleWindowResize() {
        // 更新渲染器的高度和宽度以及相机的纵横比
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }

    // 添加事件监听
    addMouseListener() {
        // 层层往上寻找模型的父级，直至它是场景下的直接子元素
        function parentUtilScene(obj) {
            if (obj.parent.type === 'Scene') return obj;
            while (obj.parent && obj.parent.type !== 'Scene') {
                obj = obj.parent;
            }
            return obj;
        }

        // canvas容器内鼠标点击事件添加
        this.container.addEventListener("mousedown", (event) => {
            this.handleRaycasters(event, (objTarget) => {
                // 寻找其对应父级为场景下的直接子元素
                let object = parentUtilScene(objTarget);
                // 调用拾取到的物体的点击事件
                object._click && object._click();
                // 遍历场景中除当前拾取外的其他物体，执行其未被点击到的事件回调
                this.scene.children.forEach((objItem) => {
                    if (objItem !== object) {
                        objItem._clickBack && objItem._clickBack();
                    }
                });
            });
        });
        // canvas容器内鼠标移动事件添加
        this.container.addEventListener("mousemove", (event) => {
            this.handleRaycasters(event, (objTarget) => {
                // 寻找其对应父级为场景下的直接子元素
                let object = parentUtilScene(objTarget);
                // 鼠标移动到拾取物体上且未离开时时，仅调用一次其悬浮事件方法
                !object._hover_enter && object._hover && object._hover();
                object._hover_enter = true;
                // 遍历场景中除当前拾取外的其他物体，执行其未有鼠标悬浮的事件回调
                this.scene.children.forEach((objItem) => {
                    if (objItem !== object) {
                        objItem._hover_enter && objItem._hoverBack && objItem._hoverBack();
                        objItem._hover_enter = false;
                    }
                });
            })
        });
        // 为所有3D物体添加上“on”方法，可监听物体的“click”、“hover”事件
        THREE.Object3D.prototype.on = function (eventName, touchCallback, notTouchCallback) {
            switch (eventName) {
                case "click":
                    this._click = touchCallback ? touchCallback : undefined;
                    this._clickBack = notTouchCallback ? notTouchCallback : undefined;
                    break;
                case "hover":
                    this._hover = touchCallback ? touchCallback : undefined;
                    this._hoverBack = notTouchCallback ? notTouchCallback : undefined;
                    break;
                default:
                    ;
            }
        }
    }

    // 切换模型
    handleSlider(begin, end) {
        let dir = ``;
        if (end > begin) {
            dir = `down`;
        } else {
            dir = `up`;
        }
        this.checkNextStep(this.particleSystem, this.pos, dir,begin,end);
        this.runTweenByType(this.order);
    }

    // 射线处理
    handleRaycasters(event, callback) {
        let mouse = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        let intersects = raycaster.intersectObjects(this.scene.children, true)
        if (intersects.length > 0) {
            callback && callback(intersects[0].object);
        }
    }

    // 阴影添加
    onShadow(obj) {
        if (obj.type === 'Mesh') {
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
        if (obj.children && obj.children.length > 0) {
            obj.children.forEach((item) => {
                this.onShadow(item);
            })
        }
        return;
    }

    // 自定义模型加载
    loader(pathArr) {
        let jsonLoader = new THREE.JSONLoader();
        let fbxLoader = new THREE.FBXLoader();
        let mtlLoader = new THREE.MTLLoader();
        let objLoader = new THREE.OBJLoader();
        let stlLoader = new THREE.STLLoader();
        let gltfLoader = new THREE.GLTFLoader();
        let basePath, pathName, pathFomat;
        let promiseArr = pathArr.map((path) => {
            basePath = path.substring(0, path.lastIndexOf('/') + 1);
            pathName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
            // 后缀为js或json的文件统一当做js格式处理
            pathFomat = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
            switch (pathFomat) {
                case 'js':
                    return new Promise(function (resolve) {
                        jsonLoader.load(path, (geometry, material) => {
                            resolve({
                                geometry: geometry,
                                material: material
                            })
                        });
                    });
                    break;
                case 'json':
                    return new Promise(function (resolve) {
                        jsonLoader.load(path, (geometry, material) => {
                            resolve({
                                geometry: geometry,
                                material: material
                            })
                        });
                    });
                    break;
                case 'fbx':
                    return new Promise(function (resolve) {
                        fbxLoader.load(path, (object) => {
                            resolve(object);
                        });
                    });
                    break;
                case 'gltf':
                    return new Promise(function (resolve) {
                        gltfLoader.load(path, (object) => {
                            resolve(object);
                        });
                    });
                    break;
                case 'obj':
                    return new Promise(function (resolve) {
                        objLoader.load(path, (object) => {
                            resolve(object);
                        });
                    });
                    break;
                case 'mtl':
                    return new Promise(function (resolve) {
                        mtlLoader.setBaseUrl(basePath);
                        mtlLoader.setPath(basePath);
                        mtlLoader.load(pathName + '.mtl', (mtl) => {
                            resolve(mtl);
                        });
                    });
                    break;
                case 'objmtl':
                    return new Promise(function (resolve, reject) {
                        mtlLoader.setBaseUrl(basePath);
                        mtlLoader.setPath(basePath);
                        mtlLoader.load(`${pathName}.mtl`, (mtl) => {
                            mtl.preload();
                            objLoader.setMaterials(mtl);
                            objLoader.setPath(basePath);
                            objLoader.load(pathName + '.obj', resolve, undefined, reject);
                        });
                    });
                    break;
                case 'stl':
                    return new Promise(function (resolve, reject) {
                        stlLoader.load(path, (geometry, material) => {
                            resolve({
                                geometry: geometry,
                                material: material
                            })
                        });
                    });
                    break;
                default:
                    return '';
            }
        });
        return Promise.all(promiseArr);
    }

    IsPC(){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    }

    createText(){
        var text = "JIJE void",
            height = 20,
            size = 50,
            hover = 30,
            curveSegments = 4,
            bevelThickness = 2,
            bevelSize = 1.5,
            bevelEnabled = true,
            font = undefined,
            fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
            fontWeight = "bold"; // normal bold

        var loader = new THREE.FontLoader();
        var me = this;
        loader.load( './obj/typeface.json', function ( response ) {

            font = response;

            refreshText();

        });

        var refreshText =function () {
            var textGeo = new window.THREE.TextGeometry( text, {
                font: font,
                size: size,
                height: height,
                curveSegments: curveSegments,
                bevelThickness: bevelThickness,
                bevelSize: bevelSize,
                bevelEnabled: bevelEnabled
            });

            textGeo.computeBoundingBox();

            textGeo.computeVertexNormals();

            var materials = [
                new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
                new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
            ];

            var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
            textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
            var textMesh1 = new THREE.Mesh( textGeo, materials );
            textMesh1.position.x = centerOffset;
            textMesh1.position.y = hover;
            textMesh1.position.z = 0;
            textMesh1.rotation.x = 0;
            textMesh1.rotation.y = Math.PI * 2;

            me.textMesh = textMesh1;
            console.log(`text mesh`);
            console.log(me.textMesh);
            me.addObjs();
        }
    }

    // 模型加入场景
    addObjs() {
        this.loader(this.modelingFiles).then((result) => {
            let objs = [];
            //pc环境加载第一套样式 mobiles走第二套样式
            if(this.IsPC())this.transformInfo = this.transformInfo[0];
            else this.transformInfo = this.transformInfo[1];

            objs[0] = result[0].children[1].geometry;
            objs[1] = result[1].geometry;
            objs[2] = result[2].geometry;
            objs[3] = result[3].geometry;
            objs[4] = this.textMesh.geometry;

            for (var i = 0; i < objs.length; i++) {
                objs[i].scale(this.transformInfo[i].scale, this.transformInfo[i].scale, this.transformInfo[i].scale);
                objs[i].center();
                objs[i].rotateX(this.transformInfo[i].rotate[0]);
                objs[i].rotateY(this.transformInfo[i].rotate[1]);
                objs[i].rotateZ(this.transformInfo[i].rotate[2]);
                objs[i].translate(this.transformInfo[i].translate[0], this.transformInfo[i].translate[1], this.transformInfo[i].translate[2]);

            }

            this.addPartices(objs);
        });
    }

    // 几何模型转缓存几何模型
    toBufferGeometry(geometry) {
        if (geometry.type === 'BufferGeometry') return geometry;
        return new THREE.BufferGeometry().fromGeometry(geometry);
    }

    // 获取顶点数最多的item
    getMaxItem(arr) {
        let present = null;
        for (var i = 0; i < arr.length; i++) {
            if (present) {
                if (arr[i].attributes.position.array.length >= present.attributes.position.array.length) {
                    present = arr[i]
                }
            } else if (!present) {
                present = arr[i]
            }
        }
        return present;
    }

    // 粒子变换
    addPartices(objlist) {

        for (var i = 0; i < objlist.length; i++) {
            objlist[i] = this.toBufferGeometry(objlist[i]);
        }

        console.log(objlist)
        this.objLen = objlist.length;//设定模型数量 == 页面数

        //顶点数由大到小排序
        //objlist.sort((a,b)=>{return b.attributes.position.array.length-a.attributes.position.array.length});
        let moreObj = this.getMaxItem(objlist);
        let morePos = moreObj.attributes.position.array;
        let moreLen = morePos.length;

        let positionArr = [];
        for (var i = 0; i < objlist.length; i++) {
            let lessPos = objlist[i].attributes.position.array;
            let position = this.createParticleArray(moreLen, lessPos);
            positionArr.push(position);
        }

        // sizes用来控制每个顶点的尺寸，初始为4
        let sizes = new Float32Array(moreLen);
        let beginposition = new Float32Array(moreLen);
        for (let i = 0; i < moreLen; i++) {
            sizes[i] = 4;
            beginposition[i] = (Math.random() * 2000 - 1000);
        }

        // 挂载属性值
        moreObj.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

        moreObj.addAttribute('beginposition', new THREE.BufferAttribute(beginposition, 3));
        moreObj.addAttribute('position', new THREE.BufferAttribute(positionArr[0], 3));
        //moreObj.addAttribute('position', new THREE.BufferAttribute(beginposition, 3));
        moreObj.addAttribute('position2', new THREE.BufferAttribute(positionArr[1], 3));
        moreObj.addAttribute('position3', new THREE.BufferAttribute(positionArr[2], 3));
        moreObj.addAttribute('position4', new THREE.BufferAttribute(positionArr[3], 3));
        moreObj.addAttribute('position5', new THREE.BufferAttribute(positionArr[4], 3));
        console.log(moreObj);
        // 传递给shader共享的的属性值
        let uniforms = {
            // 顶点颜色
            color: {
                type: 'v3',
                value: new THREE.Color(0xffffff)
            },
            // 传递顶点贴图
            texture: {
                value: this.getTexture(64)
            },
            // 传递val值，用于shader计算顶点位置
            val: {
                value: 1.0
            },
            begin: {
                value: 0 //转变前的模型id
            },
            end: {
                value: 0 //转变目标模型id
            }
        };
        console.log(uniforms);
        // 着色器材料
        let shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        // 创建粒子系统
        let particleSystem = new THREE.Points(moreObj, shaderMaterial);
        let pos = {val: 1};
        this.particleSystem = particleSystem;
        this.pos = pos;

        // 粒子动画
        let tween = new TWEEN.Tween(pos).to({
            val: 0
        }, this.pos.val * 1500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(updateCallback.bind(this, null)).onComplete(completeCallBack.bind(this, 'go'));

        let tweenBack = new TWEEN.Tween(pos).to({
            val: 0
        }, this.pos.val * 1500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(updateCallback.bind(this, null)).onComplete(completeCallBack.bind(this, 'back'));

        //将这两个缓动形式保存起来,相互调用
        this.tweenInstance1 = tween;
        this.tweenInstance2 = tweenBack;

        particleSystem.material.uniforms.begin.value = 99;
        particleSystem.material.uniforms.end.value = 0;

        tween.start();

        // 动画持续更新的回调函数
        function updateCallback() {
            particleSystem.material.uniforms.val.value = pos.val;
            // 颜色过渡
            if (this.nextcolor) {
                //let val = this.order === 'back' ? (1 - pos.val) : pos.val;
                let val = pos.val;
                let uColor = particleSystem.material.uniforms.color.value;
                /*uColor.r = this.color.r + (this.nextcolor.r - this.color.r) * val;
                uColor.b = this.color.b + (this.nextcolor.b - this.color.b) * val;
                uColor.g = this.color.g + (this.nextcolor.g - this.color.g) * val;*/

                uColor.r = this.color.r * val + (this.nextcolor.r) * (1 - val);
                uColor.b = this.color.b * val + (this.nextcolor.b) * (1 - val);
                uColor.g = this.color.g * val + (this.nextcolor.g) * (1 - val);
            }
        }

        // 每轮动画完成时的回调函数
        function completeCallBack(order) {
            if (!this.isInit) {
                this.isInit = !this.isInit;
                window.vm.init();
            }
            let uColor = particleSystem.material.uniforms.color.value;
            // 保存动画顺序状态
            this.order = order;
            // 保存旧的粒子颜色
            this.color = {
                r: uColor.r,
                b: uColor.b,
                g: uColor.g
            }
            // 随机生成将要变换后的粒子颜色
            this.nextcolor = {
                r: Math.random() ,
                b: Math.random() ,
                g: Math.random()
            }
        }

        this.scene.add(particleSystem);
        this.particleSystem = particleSystem;
    }

    // 执行下一个缓动函数
    runTweenByType(type) {
        if (type == 'go') {
            this.tweenInstance2.start();
        }
        else {
            this.tweenInstance1.start();
        }
    }

    // 创建顶点信息描述文件
    createParticleArray(moreLen, lessPos) {
        // 根据最大的顶点数开辟数组空间，同于存放顶点较少的模型顶点数据
        let position2 = new Float32Array(moreLen);

        // 先把顶点较少的模型顶点坐标放进数组
        position2.set(lessPos);

        let lessLen = lessPos.length;

        // 剩余空间重复赋值
        for (let i = lessLen, j = 0; i < moreLen; i++, j++) {
            j %= lessLen;
            position2[i] = lessPos[j];
            position2[i + 1] = lessPos[j + 1];
            position2[i + 2] = lessPos[j + 2];
        }
        return position2;
    }

    // 判断下一个模型应该如何变化
    checkNextStep(particleSystem, pos,direction = 'down',b,e) {
        /*if (direction == `down`) {
            /!*if (particleSystem.material.uniforms.end.value == this.objLen - 1) {
                //缓动执行完毕,
                if (pos.val == 0) particleSystem.material.uniforms.begin.value = particleSystem.material.uniforms.end.value;
                particleSystem.material.uniforms.end.value = 0;
            } else {
                if (pos.val == 0) particleSystem.material.uniforms.begin.value = particleSystem.material.uniforms.end.value;
                particleSystem.material.uniforms.end.value = particleSystem.material.uniforms.end.value + 1;
            }*!/
            particleSystem.material.uniforms.begin.value = b;
            particleSystem.material.uniforms.end.value = e;


        } else {
            if (particleSystem.material.uniforms.end.value == 0) {
                particleSystem.material.uniforms.begin.value = 0;
                particleSystem.material.uniforms.end.value = this.objLen - 1;
            } else {
                particleSystem.material.uniforms.begin.value = particleSystem.material.uniforms.end.value;
                particleSystem.material.uniforms.end.value = particleSystem.material.uniforms.end.value - 1;
            }
        }*/
        particleSystem.material.uniforms.begin.value = b;
        particleSystem.material.uniforms.end.value = e;
        if (pos.val == 0) pos.val = particleSystem.material.uniforms.val.value = 1;
    }

    // 获得纹理
    getTexture(canvasSize = 64) {
        let canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        canvas.style.background = "transparent";
        let context = canvas.getContext('2d');
        let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 8, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, 'transparent');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
        context.fill();
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // 更新视图
    update() {
        TWEEN.update();
        //this.stats.update();
        let time = Date.now() * 0.005;
        if (this.particleSystem) {
            let bufferObj = this.particleSystem.geometry;
            //this.particleSystem.rotation.y = 0.01 * time;
            //this.camera.rotation.y+=0.0001;
            let sizes = bufferObj.attributes.size.array;
            let len = sizes.length;
            for (let i = 0; i < len; i++) {
                sizes[i] = 1.5 * (2.0 + Math.sin(0.02 * i + time));
            }
            bufferObj.attributes.size.needsUpdate = true;
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => {
            this.update()
        });
    }

}

function onLoad() {
    window.three = new ThreeDWorld(document.getElementById("world"));
}


