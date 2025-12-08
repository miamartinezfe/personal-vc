## Punto 1 – Python

Este apartado muestra el procesamiento de una imagen utilizando Python y la librería OpenCV. Hemos explorado diversas técnicas para manipular y analizar visualmente las características de la imagen de un animal en vía de extinción.

El proceso incluyó la carga y visualización de la imagen original, la aplicación de filtros básicos como el suavizado (desenfoque) para reducir el ruido y el realce de bordes para acentuar detalles. Posteriormente, se realizó la separación y visualización de los canales de color Rojo, Verde y Azul, explicando cómo cada canal contribuye a la percepción del color.

Finalmente, se aplicaron operaciones morfológicas como la erosión y la dilatación sobre una versión binarizada de la imagen. Estas operaciones permitieron modificar la forma y el tamaño de los objetos en la imagen, destacando su utilidad en la segmentación y análisis de estructuras. A continuación, se presenta una animación que resume visualmente los resultados de estas transformaciones.

![Animación de Procesamiento de Imagen](examen_final\python\gifs\Animation.gif)

## Punto 2 - Threejs

![Animación de Threejs](examen_final\threejs\gifs\threejs.gif)

## Cómo correr el proyecto
1. Instalar dependencias:
```
npm install
```

2. Ejecutar el servidor:
```
npm run dev
```

3. Abrir en el navegador:
```
http://localhost:5173
```

## Implementación técnica

### Cambio de perspectiva
Se crean dos cámaras y se alterna con la tecla C:
```
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "c") {
    currentCamera = currentCamera === camera1 ? camera2 : camera1;
    controls.object = currentCamera;
  }
});
```

### Animaciones
El render loop actualiza los objetos:
```
function animate() {
  requestAnimationFrame(animate);
  sculpture.rotation.y += 0.002;
  caja.rotation.y += 0.05;
  controls.update();
  renderer.render(scene, currentCamera);
}
```

### Texturas
Cargadas con TextureLoader:
```
const floorTexture = textureLoader.load("textures/floor.jpg");
```

### OrbitControls
```
const controls = new OrbitControls(currentCamera, renderer.domElement);
controls.enableDamping = true;
```

## Iluminación
Incluye:
- AmbientLight
- DirectionalLight
- HemisphereLight