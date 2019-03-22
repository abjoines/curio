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
    scene.background = new THREE.Color( 0xa0d39f );

    // camera
    camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 200;
    scene.add( camera );

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

    //     THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    // new THREE.MTLLoader()
    //     .setPath( './media/' )
    //     .load( 'PersonalizedRoom.mtl', function ( materials ) {
    //         materials.preload();
    //         new THREE.OBJLoader()
    //             .setMaterials( materials )
    //             .setPath( './media/' )
    //             .load( 'PersonalizedRoom.obj', function ( object ) {
    //                 object.position.y = - 25;
    //                 object.position.x = -2;
    //                 scene.add( object );
    //             }, onProgress, onError );
    //     } );

    //OFFICE
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
        .setPath( './media/' )
        .load( 'RoomPresetTRY2.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'RoomPresetTRY2.obj', function ( object ) {
                    object.position.y = - 25;
                    object.position.x = -2;
                    scene.add( object );
                }, onProgress, onError );
        } );

    //ALYSSA
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

    //ANDY
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

    //JO
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
        .setPath( './media/' )
        .load( 'JoTry1.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'JoTry1.obj', function ( object ) {
                    object.position.y = - 33.3;
                    object.position.x = 10;
                    object.rotateY(100);
                    object.scale.set(3,3,3);
                    scene.add( object );
                }, onProgress, onError );
        } );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( "click", popUp, false);
    document.addEventListener( 'keydown', onDocumentKeyDown, false);
}

function popUp() {
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    new THREE.MTLLoader()
    .setPath( './media/' )
    .load( 'MENU.mtl', function ( materials ) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials( materials )
            .setPath( './media/' )
            .load( 'MENU.obj', function ( object ) {
                object.position.y = -8;
                object.position.x = -13;
                object.position.z = 3;
                object.rotateY(0);
                object.scale.set(1.4,1.4,1.4);
                scene.add( object );
                })
        }) 
}

function onDocumentKeyDown (event) {
    var KeyCode = event.which;
    //zoom in
    if (KeyCode == 38){
        (camera.position.z -= 10) * 0.5;
    //zoom out
    } else if (KeyCode == 40){
        (camera.position.z += 10) * 0.5;
    }
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
    camera.position.x += ( - mouseX/2 - camera.position.x ) * 0.5;
    camera.position.y += ( mouseY/2 - camera.position.y ) * 0.5;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}