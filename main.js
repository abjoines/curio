var container, stats;
var camera, scene, renderer, controls;
var mouseX = 0, mouseY = 0;
var midX = window.innerWidth / 2;
var midY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8e8e8e );

    // camera
    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 200;
    scene.add( camera );

    // controls
    // controls = new THREE.TrackballControls( camera );
	// 			controls.rotateSpeed = 1.0;
	// 			controls.zoomSpeed = 1.2;
	// 			controls.panSpeed = 0.8;
	// 			controls.noZoom = false;
	// 			controls.noPan = false;
	// 			controls.staticMoving = true;
	// 			controls.dynamicDampingFactor = 0.3;

    // lights
    var ambientLight = new THREE.AmbientLight( 0x404040 , 1 );
    var ambientLight2 = new THREE.AmbientLight( 0x404040 , 1.7 );
    scene.add( ambientLight2 );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.1 );
    camera.add( pointLight );


    // models
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };
    var onError = function () { };
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
        .setPath( './media/' )
        .load( 'roomPresetTRY2.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'RoomPresetTRY2.obj', function ( object ) {
                    object.position.y = - 25;
                    scene.add( object );
                }, onProgress, onError );
        } );

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
        .setPath( './media/' )
        .load( 'Alyssa2.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'Alyssa2.obj', function ( object ) {
                    object.position.y = - 32.5;
                    object.rotateY(160);
                    object.scale.set(2.7,2.7,2.7);
                    scene.add( object );
                }, onProgress, onError );
        } );

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
        .setPath( './media/' )
        .load( 'Andy2.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'Andy2.obj', function ( object ) {
                    object.position.y = - 35;
                    object.position.x = -10;
                    object.rotateY(180);
                    object.scale.set(3,3,3);
                    scene.add( object );
                }, onProgress, onError );
        } );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    midX = window.innerWidth / 2;
    midY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight - 100 );
}
function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - midX ) / 2;
    mouseY = ( event.clientY - midY ) / 2;
}


function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    // controls.update();
    camera.position.x += ( - mouseX/2 - camera.position.x ) * 0.5;
    camera.position.y += ( mouseY/2 - camera.position.y ) * 0.5;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}