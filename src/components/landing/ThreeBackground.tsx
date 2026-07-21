'use client';
// Animated 3D "knowledge graph" — glowing nodes connected by edges, wrapped in
// a slowly rotating sphere with a drifting particle dust field. On-theme for a
// RAG platform (documents → embeddings → connections). Pure client-side WebGL;
// renders nothing meaningful on the server (just an empty div).
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PRIMARY = new THREE.Color('#6D5EF9');
const LIGHT = new THREE.Color('#8C82FF');

// Soft round glowing dot texture (avoids square PointsMaterial sprites).
function makeDotTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(190, 214, 255,0.85)');
  g.addColorStop(1.0, 'rgba(109,94,249,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // ── Scene / camera / renderer ────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 62;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const dotTex = makeDotTexture();

    // ── Node positions on a fibonacci sphere ─────────────────────────────────
    const NODE_COUNT = 88;
    const RADIUS = 27;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5)); // golden angle
      nodes.push(
        new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS)
      );
    }

    // Node points
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMat = new THREE.PointsMaterial({
      size: 2.4,
      map: dotTex,
      color: LIGHT,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(nodeGeo, nodeMat);

    // Edges between near nodes
    const edges: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < RADIUS * 0.56) {
          edges.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: PRIMARY,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const graph = new THREE.Group();
    graph.add(points);
    graph.add(lines);
    graph.rotation.z = 0.2;
    scene.add(graph);

    // ── Drifting dust field ──────────────────────────────────────────────────
    const DUST = 460;
    const dustGeo = new THREE.BufferGeometry();
    const dustArr = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      dustArr[i * 3] = (Math.random() - 0.5) * 180;
      dustArr[i * 3 + 1] = (Math.random() - 0.5) * 140;
      dustArr[i * 3 + 2] = (Math.random() - 0.5) * 140;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustArr, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.0,
      map: dotTex,
      color: PRIMARY,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ── Interaction (mouse parallax) ─────────────────────────────────────────
    let tmx = 0, tmy = 0, mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Render loop (single-flight guarded) ──────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      const t = clock.getElapsedTime();
      graph.rotation.y = t * 0.075;
      graph.rotation.x = Math.sin(t * 0.16) * 0.16;
      dust.rotation.y = t * 0.018;
      // gentle "breathing" node glow
      nodeMat.size = 2.4 + Math.sin(t * 1.4) * 0.35;
      mx += (tmx - mx) * 0.045;
      my += (tmy - my) * 0.045;
      camera.position.x = mx * 14;
      camera.position.y = -my * 14;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    renderer.render(scene, camera); // paint one static frame immediately
    start();

    // ── Resize + visibility ──────────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Pause when the tab is hidden …
    let visible = true;   // tab visible
    let onScreen = true;  // hero intersecting the viewport
    const sync = () => (visible && onScreen ? start() : stop());

    const onVis = () => { visible = !document.hidden; sync(); };
    document.addEventListener('visibilitychange', onVis);

    // … and when the hero is scrolled out of view. Without this the WebGL loop
    // keeps rendering 88 nodes + 460 dust sprites at up to 2x DPR for the whole
    // page, competing with scroll for GPU/main-thread time long after the hero
    // is gone. This is the single biggest scroll-time saving on the landing page.
    const io = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; sync(); },
      { rootMargin: '120px' }
    );
    io.observe(mount);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      dotTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="three-bg" aria-hidden="true" />;
}
