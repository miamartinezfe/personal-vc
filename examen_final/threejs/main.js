import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// --- Escena ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f17);

// --- Renderizador ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// =======================================================
// ===================== CÁMARAS =========================
// =======================================================

const aspect = window.innerWidth / window.innerHeight;
const camSize = 10;

// Cámara 1: perspectiva
const camera1 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera1.position.set(6, 4, 8);
camera1.lookAt(0, 1.2, 0);

// Cámara 2: ortográfica
const camera2 = new THREE.OrthographicCamera(
  -camSize * aspect,
  camSize * aspect,
  camSize,
  -camSize,
  0.1,
  200
);
camera2.position.set(0, 20, 0);
camera2.lookAt(0, 1.2, 0);

// Cámara activa
let currentCamera = camera1;

// =======================================================
// ===================== CONTROLS ========================
// =======================================================

const controls = new OrbitControls(currentCamera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1.2, 0);

// Alternar cámaras con tecla C
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "c") {
    currentCamera = currentCamera === camera1 ? camera2 : camera1;
    controls.object = currentCamera;
    currentCamera.lookAt(controls.target);
  }
});

// =======================================================
// ===================== LUCES ===========================
// =======================================================

// Luz ambiental suave
scene.add(new THREE.HemisphereLight(0xbfdde8, 0x202020, 0.35));

// Luz direccional con sombras
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
scene.add(dirLight);

// =======================================================
// ===================== TEXTURAS ========================
// =======================================================

const textureLoader = new THREE.TextureLoader();

// Piso → textura 1
const floorTexture = textureLoader.load("textures/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

// Caja → textura 2
const boxTexture = textureLoader.load("textures/wood.jpg");

// =======================================================
// ===================== ESCULTURA =======================
// =======================================================

const sculpture = new THREE.Group();

// Base
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 0.25, 48),
  new THREE.MeshStandardMaterial({ color: 0xcfc7b1 })
);
base.receiveShadow = true;
base.position.y = 0.125;
sculpture.add(base);

// Columna
const col = new THREE.Mesh(
  new THREE.CylinderGeometry(0.35, 0.45, 2, 36),
  new THREE.MeshStandardMaterial({ color: 0x2b2f36 })
);
col.position.y = 1.2;
col.castShadow = true;
sculpture.add(col);

// Esfera arriba
const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(0.45, 32, 24),
  new THREE.MeshStandardMaterial({
    color: 0x8aa6ff,
    metalness: 0.6,
    roughness: 0.35,
  })
);
esfera.position.y = 2.25;
esfera.castShadow = true;
sculpture.add(esfera);

// Caja lateral (CON TEXTURA)
const caja = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.7, 0.8),
  new THREE.MeshStandardMaterial({ map: boxTexture })
);
caja.position.set(-2, 0.6, -0.6);
caja.rotation.y = -0.3;
caja.castShadow = true;
sculpture.add(caja);

// Cono lateral
const cono = new THREE.Mesh(
  new THREE.ConeGeometry(0.45, 1.2, 32),
  new THREE.MeshStandardMaterial({ color: 0x8aa6ff })
);
cono.position.set(1.9, 0.6, 0.8);
cono.rotation.x = 0.12;
cono.castShadow = true;
sculpture.add(cono);

// Toro
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1.05, 0.12, 16, 80),
  new THREE.MeshStandardMaterial({ color: 0x2b2f36 })
);
torus.rotation.x = Math.PI / 2.2;
torus.position.y = 1.55;
torus.castShadow = true;
sculpture.add(torus);

// Cilindro pequeño
const smallCyl = new THREE.Mesh(
  new THREE.CylinderGeometry(0.12, 0.12, 1.2, 20),
  new THREE.MeshStandardMaterial({ color: 0xcfc7b1 })
);
smallCyl.position.set(0.9, 1.05, -1.1);
smallCyl.rotation.set(0.5, 0.2, 0.3);
smallCyl.castShadow = true;
sculpture.add(smallCyl);

scene.add(sculpture);

// =======================================================
// ===================== SUELO ===========================
// =======================================================

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ map: floorTexture })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// =======================================================
// ===================== ANIMACIÓN =======================
// =======================================================

function animate() {
  requestAnimationFrame(animate);

  // Animación suave
  sculpture.rotation.y += 0.002;
  caja.rotation.y += 0.05;

  controls.update();
  renderer.render(scene, currentCamera);
}
animate();

// =======================================================
// ===================== RESIZE ==========================
// =======================================================

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  const aspect = window.innerWidth / window.innerHeight;

  // Perspective
  camera1.aspect = aspect;
  camera1.updateProjectionMatrix();

  // Orthographic.
  camera2.left = -camSize * aspect;
  camera2.right = camSize * aspect;
  camera2.top = camSize;
  camera2.bottom = -camSize;
  camera2.updateProjectionMatrix();
});
