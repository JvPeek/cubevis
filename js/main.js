var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const faceSize = 1;
const faceSpacing = 0.1;

const debugColors = [
  0xFF0000,
  0xCC0000,
  0x990000,
  0x660000,
  0x000000,
  0x000033,
  0x000099,
  0x0000CC,
  0x0000FF]
  const colors = [0xff9900, 0x0000ff, 0xff0000, 0x00CC00, 0xdddddd, 0xddff00, 0xFF00FF, 0xffffff];
  //              3 orange  1 blue    2 red     0 green   4 white   5 yellow
const cornerBlocks = {
  0:{
    colors: [5,3,2],
    sides: ["5-2", "3-2", "2-8"]
  },
  1:{
    colors: [4,3,2],
    sides: ["4-0", "3-0", "2-6"]
  },
  2:{
    colors: [4,3,0],
    sides: ["4-2", "3-6", "0-0"]
  },
  3:{
    colors: [5,3,0],
    sides: ["5-0", "3-8", "0-2"]
  },
  4:{
    colors: [5,1,2],
    sides: ["5-8", "1-8", "2-2"]
  },
  5:{
    colors: [4,1,2],
    sides: ["4-6", "1-6", "2-0"]
  },
  6:{
    colors: [4,1,0],
    sides: ["4-8", "1-0", "0-6"]
  },
  7:{
    colors: [5,1,0],
    //colors: [6,6,6],
    sides: ["5-6", "1-2", "0-8"]
  }
}

const transparency = 1;
const faceOffsets = [
  [-(faceSize+faceSpacing),-(faceSize+faceSpacing)],
  [-(faceSize+faceSpacing),0],
  [-(faceSize+faceSpacing),+(faceSize+faceSpacing)],
  [0,-(faceSize+faceSpacing)],
  [0,0],
  [0,+(faceSize+faceSpacing)],
  [+(faceSize+faceSpacing),-(faceSize+faceSpacing)],
  [+(faceSize+faceSpacing),0],
  [+(faceSize+faceSpacing),+(faceSize+faceSpacing)]
];
const cubeFaceRotations = [
  [0,0],
  [90,0],
  [180,0],
  [270,0],
  [0,90],
  [0,-90]
];
const blockPositions = [

]

var materials = [];
for (let i=0;i<colors.length;i++) {
  materials[i] = new THREE.MeshBasicMaterial( { color: colors[i] , opacity: transparency, transparent: true, wireframe: false} );
}
materials[7].wireframe = false;
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight ); document.body.appendChild( renderer.domElement );

function cubeFace(facenum) {

  let face = new THREE.Group();;

  var geometry = new THREE.BoxGeometry( 1, 1, 0.1 );


  let tile=[];
  for (let i=0;i<9;i++) {
    debugmat = new THREE.MeshBasicMaterial( { color: debugColors[i] , opacity: transparency, transparent: true, wireframe: true,} );
    if (i==4) {
      tile[i] = new THREE.Mesh( geometry, materials[facenum] );
    } else {
      tile[i] = new THREE.Mesh( geometry, materials[7] );
    }

    tile[i].info = {face: facenum, tilenum:i};
    tile[i].name = facenum + "-" + i;
    tile[i].cursor = 'pointer';
    tile[i].translateX(faceOffsets[i][0]);
    tile[i].translateY(faceOffsets[i][1]);
    tile[i].translateZ(faceSize*1.5+faceSpacing*3);
    face.add( tile[i] );
  }
  return face;
}
function assembleCube() {
    let cube =  new THREE.Group();
    let thisFace = [];
    for (let i=0;i<6;i++) {
      thisFace[i] = cubeFace(i);


      thisFace[i].rotation.y = THREE.Math.degToRad(cubeFaceRotations[i][0]);
      thisFace[i].rotation.x = THREE.Math.degToRad(cubeFaceRotations[i][1]) ;
      cube.add(thisFace[i]);

    }

    return cube;
}

//cube[0].geometry.faces[ 5 ].color.setHex( 0x00ffff );

var cube = assembleCube();



function setPositions(positions) {

  positions = positions.replaceAll(" ","");
  rotpos = (rotpos+1) % 4;
  let corners=[]
  let sides=[]
  for (let i=0;i<8;i++) {
    corners[positions[i]-1] = [];
  }

  for (let i=0;i<8;i++) {
    corners[parseInt(positions[i],16)-1].blockno = i;
    corners[positions[i]-1].rotation = positions[i+8];

  }
  for (let i=16;i<28;i++) {
    sides[i-16] = [];
    sides[i-16].position = parseInt(positions[i],16);
  }
  mapColors({corners: corners, sides: false});
}
function mapColors(input) {
  function colorRotation(inputRot, rotMod) {
    //console.log( inputRot, rotMod);
    if (rotMod == 4) {
      if (inputRot == 0) {
       return 0;
      }
      if (inputRot == 1) {
       return 2;
      }
      if (inputRot == 2) {
       return 1;
      }
    }
    if (inputRot == 0) {
      return 0;
    }
    if (inputRot == 1) {
      return 1;
    }
    if (inputRot == 2) {
      return 2;
    }


  }
  for (let thisCorner = 0;thisCorner <8; thisCorner++) { // cornerblocks

    let thisBlockNo = input.corners[thisCorner].blockno;

    let thisBlockRot = input.corners[thisCorner].rotation;
    let thisBlockMod = input.corners[thisCorner];
    console.log(thisBlockMod);
    let thisBlock = cornerBlocks[input.corners[thisCorner].blockno];

    let targetBlock = cornerBlocks[thisCorner];

    for (let i=0;i<3;i++) { // tiles of corner blocks
      let thisIntFace =  scene.getObjectByName( thisBlock.sides[i]);
      //console.log(thisIntFace.info.face%2);
      thisIntFace.material = materials[targetBlock.colors[colorRotation(i, 1)]];
    }
  }

  return;
}
var rotStrings = [
"12 34 56 78 33 33 33 33 12 34 56 78 9a bc 00 00 41 41 ac f2",
"16 24 57 38 32 23 32 23 12 64 5b 38 9a 7c 26 20 41 21 1f f9",
"17 64 53 28 33 33 33 33 12 b4 57 68 9a 3c 00 00 41 41 aa fe",
"13 74 52 68 32 23 32 23 12 74 53 b8 9a 6c 26 20 41 41 ac e3"
];
// rotStrings = [
// "12 34 56 78 33 33 33 33 12 34 56 78 9a bc 00 00 41 41 ac f2",
// "12 34 56 78 33 33 33 33 12 34 56 78 9a bc 00 00 41 41 ac f2",
// "12 34 56 78 33 33 33 33 12 34 56 78 9a bc 00 00 41 41 ac f2",
// "12 34 56 78 33 33 33 33 12 34 56 78 9a bc 00 00 41 41 ac f2"
// ];

var rotpos = 0;
//window.setInterval(setPositions,1000,rotStrings);
// window.setTimeout(setPositions,1000,rotStrings);
// window.setTimeout(setPositions,2010,rotStrings);
// window.setTimeout(setPositions,3020,rotStrings);
// window.setTimeout(setPositions,4030,rotStrings);

scene.add(cube);
function render() {
    requestAnimationFrame( render );

    //cubes.rotation.x += 0.05;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}

render();
