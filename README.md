# Repositorio Personal — Computación Visual (Estructura mínima)

Este README está **ajustado estrictamente** a la estructura mínima indicada en la guía del curso. Usa esta página como índice y guía rápida para agregar y navegar los talleres en tu repositorio personal.

---

## Estructura mínima por cada taller (obligatoria)
Cada taller debe estar en una carpeta con formato:

```
YYYY-MM-DD_nombre_taller/
├── entorno/               # python/, unity/, threejs/, colab/
├── datos/                 # imágenes, audio, modelos, video
├── resultados/            # capturas, métricas, gifs
├── README.md
```

> **Importante:** No omitir ni cambiar esta estructura mínima. El `README.md` dentro de cada carpeta de taller debe contener la documentación específica del taller (objetivo, instrucciones de ejecución, resultados y checklist).

---

## Talleres
A continuación están los enlaces a los talleres. 

- [2025-09-13_taller_0_transformaciones](./talleres/2025-09-13_taller_0_transformaciones/README.md)
- [2025-10-14_taller_1_mundo_3d](./talleres/2025-10-14_taller_1_mundo_3d/README.md)  
- [2025-10-14_taller_2](./talleres/2025-10-14_taller_2/README.md)  

---

## Qué debe contener `README.md` de cada taller (mínimo)
El `README.md` dentro de `YYYY-MM-DD_nombre_taller/` debe incluir al menos:
- **Título del taller** y **Fecha** (YYYY-MM-DD).
- **Objetivo** (breve).
- **Instrucciones para ejecutar** (comandos claros para entorno y ejecución).
- **Descripción de la estructura interna** (qué hay en `entorno/`, `datos/`, `resultados/`).
- **Resultados**: imágenes o GIFs en `resultados/` (si aplica).
- **Checklist local** confirmando los archivos mínimos.

Ejemplo mínimo de `README.md` dentro del taller:

```markdown
# Taller 0 — Transformaciones
Fecha: YYYY-MM-DD

## Objetivo
Breve descripción del objetivo.

## Estructura
- entorno/: requirements.txt o instrucciones de Colab
- datos/: imágenes de ejemplo
- resultados/: capturas / gifs
- README.md: este archivo

## Ejecutar (ejemplo)
1. Crear entorno: `pip install -r entorno/requirements.txt`
2. Ejecutar script: `python src/run.py`

## Resultados
![demo](./resultados/ejemplo.gif)

## Checklist
- [ ] entorno/ con requirements
- [ ] datos/ con muestras
- [ ] resultados/ con imagen/GIF (si aplica)
- [ ] README.md completado
```

---

## Cómo crear una nueva carpeta de taller (rápido)
1. Crear carpeta con formato: `mkdir YYYY-MM-DD_nombre_taller`.
2. Dentro crear subcarpetas: `entorno/`, `datos/`, `resultados/`.
3. Añadir un `README.md` siguiendo el esquema mínimo arriba.
4. Commit y push con mensaje en inglés: `Add workshop YYYY-MM-DD_nombre_taller - initial structure`.

---