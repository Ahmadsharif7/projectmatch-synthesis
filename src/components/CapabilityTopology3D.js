// Three.js Interactive 3D Capability Topology Component
import * as THREE from 'three';
import { TOPOLOGY_SATELLITE_NODES } from '../data/mockData.js';

export class CapabilityTopology3D {
  constructor(containerElement, onNodeSelect = null) {
    this.container = containerElement;
    this.onNodeSelect = onNodeSelect;
    this.animationId = null;
    this.isDestroyed = false;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.group = null;
    this.centralNode = null;
    this.satellites = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-100, -100);
    this.hoveredNode = null;

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };

    this.init();
  }

  init() {
    if (!this.container) return;

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 5.2;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Group for combined rotation
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // 1. Central Core Node (Maya / Synthesis Core)
    const centralGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const centralMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.6,
      shininess: 100,
      wireframe: false
    });
    this.centralNode = new THREE.Mesh(centralGeo, centralMat);
    this.centralNode.userData = {
      isCentral: true,
      name: 'Maya Chen (Core Profile)',
      info: 'Current Capability Resonance Hub (94.2% Optimal Topology)'
    };
    this.group.add(this.centralNode);

    // Inner wireframe shell on central node
    const wireGeo = new THREE.SphereGeometry(0.62, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd0bcff,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.centralNode.add(wireMesh);

    // 2. Orbital Ring Track
    const ringGeo = new THREE.RingGeometry(2.18, 2.22, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5de6ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    this.group.add(ringMesh);

    // 3. Satellite Capability Nodes
    const satelliteGeo = new THREE.SphereGeometry(0.18, 24, 24);

    TOPOLOGY_SATELLITE_NODES.forEach((nodeData, i) => {
      const satMat = new THREE.MeshPhongMaterial({
        color: nodeData.color,
        emissive: nodeData.color,
        emissiveIntensity: 0.45,
        shininess: 80
      });

      const satellite = new THREE.Mesh(satelliteGeo, satMat);
      satellite.userData = { ...nodeData, index: i };

      const x = Math.cos(nodeData.angle) * nodeData.radius;
      const y = Math.sin(nodeData.angle) * nodeData.radius;
      satellite.position.set(x, y, 0);

      // Pulse halo
      const haloGeo = new THREE.SphereGeometry(0.24, 12, 12);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      satellite.add(halo);

      this.group.add(satellite);

      // Connection Line to Central Node
      const linePoints = [new THREE.Vector3(0, 0, 0), satellite.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: nodeData.color,
        transparent: true,
        opacity: 0.25
      });
      const line = new THREE.Line(lineGeo, lineMat);
      this.group.add(line);

      this.satellites.push({
        mesh: satellite,
        line: line,
        halo: halo,
        angle: nodeData.angle,
        radius: nodeData.radius,
        data: nodeData
      });
    });

    // 4. Subtle background particle cloud
    const particlesCount = 80;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = (Math.random() - 0.5) * 6;
      posArray[i + 2] = (Math.random() - 0.5) * 4;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xd0bcff,
      transparent: true,
      opacity: 0.35
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    this.group.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 2, 12);
    pointLightViolet.position.set(3, 3, 3);
    this.scene.add(pointLightViolet);

    const pointLightCyan = new THREE.PointLight(0x22d3ee, 1.5, 12);
    pointLightCyan.position.set(-3, -2, 2);
    this.scene.add(pointLightCyan);

    // Event Listeners
    this.onResize = this.onResize.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener('resize', this.onResize);
    this.container.addEventListener('mousemove', this.onPointerMove);
    this.container.addEventListener('mousedown', this.onPointerDown);
    window.addEventListener('mouseup', this.onPointerUp);
    this.container.addEventListener('click', this.onClick);

    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 450;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  onPointerMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.isDragging) {
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.group.rotation.y += deltaX * 0.006;
      this.group.rotation.x += deltaY * 0.006;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  }

  onPointerDown(e) {
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  onPointerUp() {
    this.isDragging = false;
  }

  onClick() {
    if (this.hoveredNode && this.onNodeSelect) {
      this.onNodeSelect(this.hoveredNode.userData);
    }
  }

  animate() {
    if (this.isDestroyed || !this.renderer || !this.scene || !this.camera) return;

    this.animationId = requestAnimationFrame(this.animate);
    const time = Date.now() * 0.001;

    // Subtle natural autonomous sway if not dragging
    if (!this.isDragging) {
      this.group.rotation.y += 0.003;
      this.group.rotation.x = Math.sin(time * 0.3) * 0.12;
    }

    // Satellite orbital oscillation & breathing
    this.satellites.forEach((sat, i) => {
      const dynamicOffset = Math.sin(time * 1.2 + sat.angle) * 0.15;
      const curRadius = sat.radius + dynamicOffset;
      const currentAngle = sat.angle + time * 0.1;

      const x = Math.cos(currentAngle) * curRadius;
      const y = Math.sin(currentAngle) * curRadius;
      const z = Math.sin(time * 0.8 + i) * 0.25;

      sat.mesh.position.set(x, y, z);
      sat.halo.rotation.y += 0.02;

      // Update line endpoints
      const positions = sat.line.geometry.attributes.position;
      if (positions) {
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, x, y, z);
        positions.needsUpdate = true;
      }
    });

    // Core pulsing effect
    if (this.centralNode) {
      const pulseScale = 1 + Math.sin(time * 2.2) * 0.04;
      this.centralNode.scale.setScalar(pulseScale);
    }

    // Raycast for hover tooltips / highlights
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const interactables = [this.centralNode, ...this.satellites.map(s => s.mesh)];
    const intersects = this.raycaster.intersectObjects(interactables, false);

    if (intersects.length > 0) {
      const topObj = intersects[0].object;
      if (this.hoveredNode !== topObj) {
        this.hoveredNode = topObj;
        this.container.style.cursor = 'pointer';
        if (topObj.material && topObj.material.emissiveIntensity) {
          topObj.material.emissiveIntensity = 0.9;
        }
        // Update DOM badge
        this.updateTopologyBadge(topObj.userData);
      }
    } else {
      if (this.hoveredNode) {
        if (this.hoveredNode.material && this.hoveredNode.material.emissiveIntensity) {
          this.hoveredNode.material.emissiveIntensity = this.hoveredNode.userData.isCentral ? 0.6 : 0.45;
        }
        this.hoveredNode = null;
        this.container.style.cursor = 'default';
        this.updateTopologyBadge(null);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  updateTopologyBadge(data) {
    const badge = document.getElementById('topology-hover-badge');
    if (!badge) return;

    if (data) {
      badge.innerHTML = `
        <span class="status-dot" style="background: #22D3EE;"></span>
        <span style="color: #FFFFFF; font-weight: 600;">${data.name}</span>
        ${data.score ? `<span style="color: #5DE6FF; margin-left: 6px;">[${data.score}% Resonance]</span>` : ''}
      `;
      badge.style.opacity = '1';
    } else {
      badge.innerHTML = `
        <span class="status-dot"></span>
        <span>TOPOLOGY ACTIVE: 4,092 NODES</span>
      `;
    }
  }

  destroy() {
    this.isDestroyed = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResize);
    if (this.container) {
      this.container.removeEventListener('mousemove', this.onPointerMove);
      this.container.removeEventListener('mousedown', this.onPointerDown);
      this.container.removeEventListener('click', this.onClick);
      if (this.renderer && this.renderer.domElement) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
    window.removeEventListener('mouseup', this.onPointerUp);
  }
}
