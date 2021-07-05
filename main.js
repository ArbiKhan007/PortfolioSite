import "./style.css";

//
import * as t from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//
const scene = new t.Scene();
const camera = new t.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Renderer
const renderer = new t.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//Torus
const geometry = new t.TorusGeometry(10, 3, 16, 100);
const material = new t.MeshStandardMaterial({ color: 0x4b0082 });
const torus = new t.Mesh(geometry, material);
torus.position.set(0, 0, 0);

//
const light = new t.AmbientLight(0xffffff);
const lightPoint = new t.PointLight(0xffffff);
lightPoint.position.set(5, 5, 5);

//
//const lightHelper = new t.PointLightHelper(lightPoint);
//const gridHelper = new t.GridHelper(200, 50);

//Camera
camera.position.set(0, 0, 0);

//const controls = new OrbitControls(camera, renderer.domElement);

function rotateCube(t) {
  t.rotation.x += 0.01;
  t.rotation.y += 0.01;
}

function addStars() {
  const geometry = new t.SphereGeometry(0.25, 24, 24);
  const material = new t.MeshStandardMaterial({ color: 0xffd700 });
  const star = new t.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => t.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);

//cloud background
const cloudTexture = new t.TextureLoader().load("black.jpg");
scene.background = cloudTexture;

//me
const meTexture = new t.TextureLoader().load("arbi.jpeg");

const me = new t.Mesh(
  new t.BoxGeometry(5, 5, 5),
  new t.MeshBasicMaterial({ map: meTexture })
);

me.position.z = -5;
me.position.x = 2;

//jupiter
const jupiterTexture = new t.TextureLoader().load("jupiter.jpeg");

const jupiter = new t.Mesh(
  new t.SphereGeometry(3, 32, 32),
  new t.MeshStandardMaterial({ map: jupiterTexture, normalMap: jupiterTexture })
);

jupiter.position.z = 30;
jupiter.position.setX(-10);

//
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Main Animate Function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  rotateCube(torus);
  //   controls.update();

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  jupiter.rotation.x += 0.005;
}
animate();

//
scene.add(torus, light, lightPoint, me, jupiter);
