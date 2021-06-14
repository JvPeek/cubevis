var scene, camera, renderer, maincube;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();
    maincube = new THREE.Group();

    initCube();
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initCube() {
    let mat = new THREE.MeshBasicMaterial( { color:0xff0ff0, vertexColors: THREE.FaceColors } );
    let cube=[];
    for (let i=0;i<8;i++) {
      cube[i] = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), mat);
      cube[i].translateZ(i*2);
    }

    //cube[0].geometry.faces[ 5 ].color.setHex( 0x00ffff );

    for (let i=0; i<8;i++) {
      maincube.add(cube[i]);
    }
    scene.add( maincube );

}

function rotateCube() {
    maincube.rotation.x -= SPEED * 2;
    maincube.rotation.y -= SPEED;
    maincube.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateCube();
    renderer.render(scene, camera);
}

init();
render();
