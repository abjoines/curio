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

    // scenes
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

    // // Profile IMG
    var spriteMap = new THREE.TextureLoader().load( "./media/messaging.png" );
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(30,60);
    sprite.position.set( -40, 3, 10 );
    scene.add( sprite );

    // model
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
        .load( 'Alyssa2.mtl', function ( materials ) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( './media/' )
                .load( 'Alyssa2.obj', function ( object ) {
                    object.position.y = - 60;
                    object.position.x = 20;
                    object.rotateY(160);
                    object.scale.set(9,9,9);
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
    camera.position.x += ( - mouseX/2 - camera.position.x ) * 0.5;
    camera.position.y += ( mouseY/2 - camera.position.y ) * 0.5;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
