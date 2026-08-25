// Ambient WebGL Background Atmospheric Shader Component

export class ShaderBackground {
  constructor(canvasId = 'shader-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.gl = null;
    this.prog = null;
    this.animationFrameId = null;
    this.uTime = null;
    this.uRes = null;
    this.uMouse = null;
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.isDestroyed = false;

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    this.syncSize = this.syncSize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.render = this.render.bind(this);

    this.syncSize();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.syncSize);
      this.resizeObserver.observe(this.canvas);
    }
    window.addEventListener('resize', this.syncSize);
    window.addEventListener('mousemove', this.onMouseMove);

    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!this.gl) {
      console.warn('WebGL not supported for background shader');
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Deep void foundation
        vec3 color = vec3(0.02, 0.025, 0.04);
        
        // Smooth atmospheric pulse speed
        float t = u_time * 0.15;
        
        // Electric Violet pulse (Primary)
        vec2 p1 = vec2(0.5 + 0.3 * cos(t), 0.5 + 0.2 * sin(t * 0.8));
        float d1 = length(uv - p1);
        color += vec3(0.54, 0.36, 0.96) * exp(-d1 * 3.8) * 0.13;
        
        // Cyan pulse (Secondary)
        vec2 p2 = vec2(0.3 + 0.2 * sin(t * 1.2), 0.7 + 0.1 * cos(t * 0.7));
        float d2 = length(uv - p2);
        color += vec3(0.13, 0.83, 0.93) * exp(-d2 * 4.6) * 0.09;
        
        // Magenta pulse (Tertiary)
        vec2 p3 = vec2(0.8 + 0.1 * cos(t * 0.9), 0.3 + 0.2 * sin(t * 1.1));
        float d3 = length(uv - p3);
        color += vec3(0.85, 0.27, 0.94) * exp(-d3 * 5.5) * 0.07;

        // Subtle interactive mouse glow
        vec2 mPos = u_mouse / max(u_resolution.x, u_resolution.y);
        vec2 currentPos = (gl_FragCoord.xy) / max(u_resolution.x, u_resolution.y);
        float mDist = length(currentPos - mPos);
        color += vec3(0.54, 0.36, 0.96) * exp(-mDist * 12.0) * 0.06;

        // Fine technical grid
        vec2 grid = fract(uv * 42.0);
        float line = smoothstep(0.0, 0.035, grid.x) * smoothstep(1.0, 0.965, grid.x) *
                     smoothstep(0.0, 0.035, grid.y) * smoothstep(1.0, 0.965, grid.y);
        color += (1.0 - line) * 0.015 * smoothstep(1.0, 0.0, length(uv - 0.5) * 1.4);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type, src) => {
      const s = this.gl.createShader(type);
      this.gl.shaderSource(s, src);
      this.gl.compileShader(s);
      if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', this.gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vert = compileShader(this.gl.VERTEX_SHADER, vsSource);
    const frag = compileShader(this.gl.FRAGMENT_SHADER, fsSource);

    this.prog = this.gl.createProgram();
    this.gl.attachShader(this.prog, vert);
    this.gl.attachShader(this.prog, frag);
    this.gl.linkProgram(this.prog);
    this.gl.useProgram(this.prog);

    const buf = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      this.gl.STATIC_DRAW
    );

    const pos = this.gl.getAttribLocation(this.prog, 'a_position');
    this.gl.enableVertexAttribArray(pos);
    this.gl.vertexAttribPointer(pos, 2, this.gl.FLOAT, false, 0, 0);

    this.uTime = this.gl.getUniformLocation(this.prog, 'u_time');
    this.uRes = this.gl.getUniformLocation(this.prog, 'u_resolution');
    this.uMouse = this.gl.getUniformLocation(this.prog, 'u_mouse');

    this.render(0);
  }

  syncSize() {
    if (!this.canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  onMouseMove(e) {
    if (!this.canvas) return;
    this.mouse.x = e.clientX;
    this.mouse.y = this.canvas.height - e.clientY;
  }

  render(time) {
    if (this.isDestroyed || !this.gl || !this.prog) return;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    if (this.uTime) this.gl.uniform1f(this.uTime, time * 0.001);
    if (this.uRes) this.gl.uniform2f(this.uRes, this.canvas.width, this.canvas.height);
    if (this.uMouse) this.gl.uniform2f(this.uMouse, this.mouse.x, this.mouse.y);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationFrameId = requestAnimationFrame(this.render);
  }

  destroy() {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.syncSize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
