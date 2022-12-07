var renderer, scene, camera;
// var ballGroup;
const gltfLoader = new THREE.GLTFLoader()

function init(){
    scene = new THREE.Scene()
    // scene.fog = new THREE.Fog(0x090b33,5,50)
    
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.shadowMap.enable=true
    
    document.body.appendChild(renderer.domElement)
    
    camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,0.1,100)
    camera.position.set(0, 20, 30)
    camera.lookAt(scene.position)
    
    // 載入GLTF start ----
    gltfLoader.load( '/gltf/scene.gltf', function ( dataUrl ) {
    // gltfLoader.load( '/gltf/scene.glb', function ( dataUrl ) {
        var object = dataUrl.scene;
        object.position.set(0, 0, 0);

        scene.add( object );
        console.log(dataUrl);
    }, undefined, function ( error ) {
        console.error( error );
    } );
    // 載入GLTF end ----

    // // ---- 畫一顆中子球 start ----
    // ballGroup = new THREE.Object3D()
    // scene.add(ballGroup)
    // function generateBall(r,color,name,x,y,z){
    
    //     var sphereGeometry = new THREE.SphereGeometry(r,32,32)
    //     var sphereMaterial =new THREE.MeshLambertMaterial({
    //         color: color
    //     })
    //     var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
    //     sphere.name = name
    //     sphere.position.set(x || 0,y || 0,z || 0)
    //     ballGroup.add(sphere)
    //     return sphere
    // }
    // // generateBall(5,"#f24","test")
    // // generateBall(5,"#24f","test",-5)
    // // generateBall(5,"#2f4","test",5)
    // var radius = 2
    // var stepdiv = 4
    // var dd =true
    // for(var angle1 = 0;angle1<Math.PI*2;angle1+=Math.PI/stepdiv){
        
    //     for(var angle2 = 0;angle2<Math.PI*2;angle2+=Math.PI/stepdiv){
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
    // // ---- 畫一顆中子球 end ----





    // ---- 添加光線 start ----
    var ambientLight = new THREE.AmbientLight("#333")
    scene.add(ambientLight)
    
    var directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
    scene.add(directionalLight)
    
    var spotLight = new THREE.SpotLight({color: "#fff"})
    spotLight.position.set(-20,20,10)
    spotLight.CastShadow=true
    scene.add(spotLight)
    // ---- 添加光線 end ----
    
    cameraControl = new THREE.OrbitControls(camera,renderer.domElement)

}
init()

function render(){
    renderer.render(scene,camera)
    cameraControl.update()

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