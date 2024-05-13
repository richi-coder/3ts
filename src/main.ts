import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

const canvas = document.querySelector('#canvas') as HTMLElement | OffscreenCanvas;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);


export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -5;
camera.position.y = 2;
camera.up.set(0, 1, 0);
camera.lookAt(0, 0, 0);


// WHOLE ASSEMBLY
const HorizontalBracing = new THREE.Object3D();
HorizontalBracing.position.set(0, 0, -16 / 2);
scene.add(HorizontalBracing);


const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(-1, 0);
shape.lineTo(-1, 0.25);
shape.lineTo(-0.25, 0.25);
shape.lineTo(-0.25, 1.75);
shape.lineTo(-1, 1.75);
shape.lineTo(-1, 2);
shape.lineTo(0, 2);
shape.lineTo(1, 2);
shape.lineTo(1, 1.75);
shape.lineTo(0.25, 1.75);
shape.lineTo(0.25, 0.25);
shape.lineTo(1, 0.25);
shape.lineTo(1, 0);
shape.lineTo(0, 0);


const settings = {
  steps: 2,
  depth: 16,
  bevelEnabled: false,
};

const geometry_Beam_1 = new THREE.ExtrudeGeometry(shape, settings);
const material_Beam_1 = new THREE.MeshStandardMaterial({ color: 'yellow' });


const beam_1 = new THREE.Mesh(geometry_Beam_1, material_Beam_1);
beam_1.position.x = 0;

HorizontalBracing.add(beam_1)


const system_Beam_2 = new THREE.Object3D();
system_Beam_2.position.set(0.25
  , 0, 0);
HorizontalBracing.add(system_Beam_2)

const geometry_Beam_2 = new THREE.ExtrudeGeometry(shape, settings);
const material_Beam_2 = new THREE.MeshPhongMaterial({ color: 'blue' });
const beam_2 = new THREE.Mesh(geometry_Beam_2, material_Beam_2);
beam_2.position.z = 16 / 2;
beam_2.rotation.y = Math.PI / 3;

system_Beam_2.add(beam_2);

const plateDetph = 5;
const plateSettings = {
  steps: 2,
  depth: plateDetph,
  bevelEnabled: false,
};
const plateShape = new THREE.Shape();
plateShape.moveTo(0, 0);
plateShape.lineTo(2, 0);
plateShape.lineTo(2, 0.25);
plateShape.lineTo(-1, 0.25);
plateShape.lineTo(-1, 0);
plateShape.lineTo(0, 0);

const plateGeometry = new THREE.ExtrudeGeometry(plateShape, plateSettings)
const plateMaterial = new THREE.MeshStandardMaterial({ color: 'gray' });


const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
plateMesh.position.set(-3, plateDetph / 2, 16 / 2);;
plateMesh.rotation.x = Math.PI / 2;

HorizontalBracing.add(plateMesh)






// AXES
const axesHelper = new THREE.AxesHelper(50);
axesHelper.setColors('red', 'green', 'blue')
scene.add(axesHelper);





// CONTROLS & LIGHTS

const controls = new OrbitControls(camera, renderer.domElement);
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
directionalLight.position.set(0, 5, 0)
scene.add(directionalLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

function loop() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
loop()

