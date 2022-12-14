let renderer, scene, camera;
// let ballGroup;
const gltfLoader = new THREE.GLTFLoader()

function init(){
    // * 建立場景
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x090b33,5,50); // 場景的霧氣
    
    // * 建立渲染器
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.shadowMap.enable=true
    // append 渲染到 body
    document.body.appendChild(renderer.domElement)
    
    // * 建立相機 -> 視角, 寬, 高, 最近的距離, 最遠的距離
    camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.1,100000)
    camera.position.set(0, 20, 30)
    camera.lookAt(scene.position)
    
    // * 載入GLTF
    // ---- 載入GLTF start ----
    gltfLoader.load( 'gltf/scene.gltf', function ( dataUrl ) {
    // gltfLoader.load( '/gltf/scene.glb', function ( dataUrl ) {
        let object = dataUrl.scene;
        object.position.set(0, 0, 0);

        scene.add( object );
        console.log(dataUrl);
    }, undefined, function ( error ) {
        console.error( error );
    } );
    // ---- 載入GLTF end ----

    // * 繪製圖案: 原子球
    // // ---- 畫一顆原子球 start ----
    // ballGroup = new THREE.Object3D()
    // scene.add(ballGroup)
    // function generateBall(r,color,name,x,y,z){
    
    //     let sphereGeometry = new THREE.SphereGeometry(r,32,32)
    //     let sphereMaterial =new THREE.MeshLambertMaterial({
    //         color: color
    //     })
    //     let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
    //     sphere.name = name
    //     sphere.position.set(x || 0,y || 0,z || 0)
    //     ballGroup.add(sphere)
    //     return sphere
    // }
    // // generateBall(5,"#f24","test")
    // // generateBall(5,"#24f","test",-5)
    // // generateBall(5,"#2f4","test",5)
    // let radius = 2
    // let stepdiv = 4
    // let dd =true
    // for(let angle1 = 0;angle1<Math.PI*2;angle1+=Math.PI/stepdiv){
        
    //     for(let angle2 = 0;angle2<Math.PI*2;angle2+=Math.PI/stepdiv){
    //         let layerRadius = Math.cos(angle1)*radius
    //         let ballColor = dd?"red":"#2e30d1"
        
    //         generateBall(0.9,ballColor,"atom",
    //             layerRadius*Math.cos(angle2),
    //             radius *Math.sin(angle1) ,
    //             layerRadius*Math.sin(angle2)
    //         )
    //         dd=!dd
    //     }
    //     dd=!dd
    // }
    // // ---- 畫一顆原子球 end ----


    // * 添加光線
    // ---- 添加光線 start ----
    let ambientLight = new THREE.AmbientLight("#aaa")
    scene.add(ambientLight)
    
    let directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
    scene.add(directionalLight)
    
    let spotLight = new THREE.SpotLight({color: "#fff"})
    spotLight.position.set(-20,20,10)
    spotLight.CastShadow=true
    scene.add(spotLight)
    // ---- 添加光線 end ----
    
    // * 控制相機 OrbitControls
    cameraControl = new THREE.OrbitControls(camera,renderer.domElement);
    cameraControl.enableZoom = true;      // 啟用縮放
    // enableDamping 與 dampingFactor 效果可以理解為在拖移旋轉時的「滑鼠靈敏度」
    cameraControl.enableDamping = true;   // 啟用阻尼效果
    cameraControl.dampingFactor = 1;   // 阻尼系數
    // cameraControl.autoRotate = true;      // 啟用自動旋轉

};
init();

function render(){
    renderer.render(scene,camera);

    // * 更新相機控制
    cameraControl.update();

    // ---- 球自己轉
    // ballGroup.rotation.y+=0.002
    
    requestAnimationFrame(render)
}
render()

window.addEventListener('resize',function(){
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})