window.__ModuleLoader__.load({
  id: "dsh-entrance-heavenstep",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/client/index.mjs
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);

// lib/src/routes.mjs
var ASSETS_PATH = "/dsh-entrance-heavenstep/assets";

// lib/client/welcome-character.mjs
function mountWelcomeCharacter(container, { imageURL, alt = "\u6C34\u5149\u4E4B\u4E0B\u7684\u4EBA\u7269" } = {}) {
  if (!container?.ownerDocument) throw new TypeError("A character container is required");
  if (typeof imageURL !== "string" || !imageURL) throw new TypeError("A character image URL is required");
  const document2 = container.ownerDocument;
  const portrait = document2.createElement("div");
  portrait.setAttribute("role", "img");
  portrait.setAttribute("aria-label", alt);
  portrait.dataset.welcomeCharacter = "";
  portrait.style.cssText = "position:absolute;inset:0;pointer-events:none;";
  const image = document2.createElement("img");
  image.src = imageURL;
  image.alt = "";
  image.decoding = "async";
  image.draggable = false;
  image.style.cssText = "display:block;width:100%;height:100%;object-fit:cover;object-position:62% center;";
  portrait.append(image);
  const previousChildren = [...container.childNodes];
  container.replaceChildren(portrait);
  let disposed = false;
  function update() {
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    if (portrait.parentNode === container) portrait.replaceWith(...previousChildren);
  }
  update(0);
  return { update, dispose };
}

// lib/client/welcome-water.mjs
function welcomeWaterWaves(progress, width, height, origin) {
  const clamp3 = (n) => Math.max(0, Math.min(1, n));
  const smooth2 = (n) => {
    n = clamp3(n);
    return n * n * (3 - 2 * n);
  };
  const x = origin.x * width, y = origin.y * height;
  const shortest = Math.min(width, height);
  const reach = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
  return [0, 1, 2].map((wave) => {
    const start = 0.1 + wave * 0.13;
    const amount = clamp3((progress - start) / (1 - start));
    return {
      wave,
      amount,
      radius: (1 - Math.pow(1 - amount, 1.25)) * (reach + shortest * 0.075),
      thickness: (shortest * 0.027 + 7) * (1 - amount * 0.32),
      energy: smooth2(amount / 0.09) * (1 - smooth2((amount - 0.7) / 0.3)) * (1 - wave * 0.2)
    };
  });
}
function createWelcomeWater(container) {
  if (!container?.ownerDocument || typeof container.appendChild !== "function") {
    throw new TypeError("createWelcomeWater requires a positioned DOM container");
  }
  const document2 = container.ownerDocument;
  const view = document2.defaultView;
  const canvas = document2.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.heavenstepWater = "";
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:40;";
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  const reducedMotion = view?.matchMedia?.("(prefers-reduced-motion: reduce)");
  const clamp3 = (n, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, n));
  const smooth2 = (n) => {
    n = clamp3(n);
    return n * n * (3 - 2 * n);
  };
  const phase = (n, a, b) => clamp3((n - a) / (b - a));
  const finite2 = (n, fallback) => typeof n === "number" && Number.isFinite(n) ? n : fallback;
  const tau = Math.PI * 2;
  const samples = 96;
  let width = 1;
  let height = 1;
  let pixelRatio = 1;
  let measured = false;
  let backingReady = false;
  let backingDirty = true;
  let prepared = false;
  let disposed = false;
  let lastProgress = 0;
  let lastOrigin = { x: 0.5, y: 0.5 };
  function setSize(nextWidth, nextHeight) {
    if (disposed || !ctx) return;
    nextWidth = Math.max(1, finite2(nextWidth, 1));
    nextHeight = Math.max(1, finite2(nextHeight, 1));
    measured = true;
    const nextRatio = Math.min(1, view?.devicePixelRatio || 1, Math.sqrt(12e5 / (nextWidth * nextHeight)));
    if (nextWidth === width && nextHeight === height && nextRatio === pixelRatio) return;
    width = nextWidth;
    height = nextHeight;
    pixelRatio = nextRatio;
    backingDirty = true;
  }
  function measure() {
    setSize(container.clientWidth, container.clientHeight);
  }
  function ensureBacking() {
    if (!measured) measure();
    if (backingReady && !backingDirty) return;
    canvas.width = Math.max(1, Math.floor(width * pixelRatio));
    canvas.height = Math.max(1, Math.floor(height * pixelRatio));
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    backingReady = true;
    backingDirty = false;
  }
  function rememberOrigin(origin) {
    if (!origin) return;
    if (!origin.normalized && !measured) measure();
    lastOrigin = {
      x: clamp3(finite2(origin.x, origin.normalized ? 0.5 : width / 2) / (origin.normalized ? 1 : width)),
      y: clamp3(finite2(origin.y, origin.normalized ? 0.5 : height / 2) / (origin.normalized ? 1 : height))
    };
  }
  function clear() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
  function radialShape(angle, radius, thickness, offset, wave, amount) {
    const variation = Math.sin(angle * 3 + wave * 1.31 + amount * 0.65) * 0.5 + Math.sin(angle * 5 - wave * 0.72 - amount * 0.4) * 0.3 + Math.cos(angle * 8 + wave * 1.2) * 0.2;
    const swell = (3 + radius * 0.013) * variation;
    const breadth = thickness * (1 + Math.sin(angle * 2 + wave) * 0.16 + Math.cos(angle * 5 - wave) * 0.08);
    return Math.max(0, radius + swell + offset * breadth);
  }
  function ribbon(x, y, radius, thickness, inner, outer, wave, amount, color, alpha, start = 0, end = tau) {
    if (alpha <= 1e-3 || radius <= 0) return;
    const count = Math.max(16, Math.ceil(samples * (end - start) / tau));
    ctx.beginPath();
    for (let i = 0; i <= count; i += 1) {
      const a = start + (end - start) * i / count;
      const edge = start === 0 && end === tau ? 1 : Math.pow(Math.sin(Math.PI * i / count), 0.6);
      const r = radialShape(a, radius, thickness, outer * edge, wave, amount);
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = count; i >= 0; i -= 1) {
      const a = start + (end - start) * i / count;
      const edge = start === 0 && end === tau ? 1 : Math.pow(Math.sin(Math.PI * i / count), 0.6);
      const r = radialShape(a, radius, thickness, inner * edge, wave, amount);
      ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
  }
  function drawDrop(progress, x, y, scale) {
    const fall = phase(progress, 0, 0.16);
    if (progress > 0 && progress < 0.16) {
      const fallY = y - (1 - fall * fall) * 34 * scale;
      const opacity = Math.sin(Math.PI * fall) * 0.7;
      const glow = ctx.createRadialGradient(x, fallY, 0, x, fallY, 10 * scale);
      glow.addColorStop(0, "rgba(232,224,195,.42)");
      glow.addColorStop(0.38, "rgba(169,198,192,.18)");
      glow.addColorStop(1, "rgba(156,187,190,0)");
      ctx.globalAlpha = opacity;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.ellipse(x, fallY, 8 * scale, 11 * scale, -0.08, 0, tau);
      ctx.fill();
      ctx.fillStyle = "rgba(226,229,207,.58)";
      ctx.beginPath();
      ctx.ellipse(x, fallY, 2 * scale, (4.4 - fall * 1.4) * scale, -0.08, 0, tau);
      ctx.fill();
    }
    const hit = phase(progress, 0.13, 0.29);
    if (progress >= 0.13 && progress < 0.29) {
      const radius = (7 + hit * 18) * scale;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, "rgba(204,215,195,.12)");
      glow.addColorStop(0.42, "rgba(216,205,174,.16)");
      glow.addColorStop(1, "rgba(122,160,165,0)");
      ctx.globalAlpha = Math.sin(hit * Math.PI);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, tau);
      ctx.fill();
    }
  }
  function draw(progress, origin) {
    clear();
    if (progress <= 0 || progress >= 1 || reducedMotion?.matches) return;
    const x = origin.x * width;
    const y = origin.y * height;
    const shortest = Math.min(width, height);
    const scale = clamp3(shortest / 720, 0.7, 1.5);
    drawDrop(progress, x, y, scale);
    for (const { wave, amount, radius, thickness, energy } of welcomeWaterWaves(progress, width, height, origin)) {
      if (energy < 1e-3) continue;
      const reflection = ctx.createLinearGradient(x - radius, y + radius * 0.4, x + radius, y - radius * 0.7);
      reflection.addColorStop(0, "#d3b58c");
      reflection.addColorStop(0.29, "#a4b6a8");
      reflection.addColorStop(0.57, "#87b5bd");
      reflection.addColorStop(0.79, "#ded0b1");
      reflection.addColorStop(1, "#bea59c");
      ctx.globalCompositeOperation = "source-over";
      ribbon(x, y, radius, thickness, -0.4, 1.15, wave, amount, "#182d36", energy * 0.065);
      ribbon(x, y, radius, thickness, -0.95, -0.05, wave, amount, "#203b40", energy * 0.052);
      ctx.globalCompositeOperation = "screen";
      ribbon(x, y, radius, thickness, -1.8, 1.65, wave, amount, reflection, energy * 0.018);
      ribbon(x, y, radius, thickness, -1.3, 1.12, wave, amount, reflection, energy * 0.028);
      ribbon(x, y, radius, thickness, -0.83, 0.7, wave, amount, reflection, energy * 0.043);
      ribbon(x, y, radius, thickness, -0.4, 0.36, wave, amount, reflection, energy * 0.064);
      const turn = wave * 0.62 + amount * 0.1;
      ribbon(x, y, radius, thickness, -0.15, 0.3, wave, amount, "#e1c49b", energy * 0.16, 0.24 + turn, 1.75 + turn);
      ribbon(x, y, radius, thickness, -0.22, 0.25, wave, amount, "#b6d0c8", energy * 0.12, 3.35 + turn, 4.92 + turn);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
  function update(progress, origin) {
    if (disposed || !ctx) return;
    lastProgress = clamp3(finite2(progress, 0));
    rememberOrigin(origin);
    if (lastProgress <= 0 || lastProgress >= 1 || reducedMotion?.matches) {
      if (backingReady) clear();
      return;
    }
    ensureBacking();
    draw(lastProgress, lastOrigin);
  }
  function prepare(origin) {
    if (disposed || !ctx || reducedMotion?.matches) return false;
    if (prepared) return true;
    measure();
    rememberOrigin(origin);
    ensureBacking();
    draw(0.48, lastOrigin);
    draw(lastProgress, lastOrigin);
    prepared = true;
    return true;
  }
  function redrawAfterResize(nextWidth, nextHeight) {
    setSize(nextWidth, nextHeight);
    if (disposed || !ctx || !backingReady || !backingDirty) return;
    ensureBacking();
    draw(lastProgress, lastOrigin);
  }
  const onResize = () => redrawAfterResize(container.clientWidth, container.clientHeight);
  const observer = typeof view?.ResizeObserver === "function" ? new view.ResizeObserver((entries) => {
    const rect = entries.find((entry) => entry.target === container)?.contentRect;
    if (rect) redrawAfterResize(rect.width, rect.height);
  }) : null;
  observer?.observe(container);
  if (!observer) view?.addEventListener?.("resize", onResize);
  function dispose() {
    if (disposed) return;
    disposed = true;
    observer?.disconnect();
    if (!observer) view?.removeEventListener?.("resize", onResize);
    canvas.remove();
    canvas.width = 1;
    canvas.height = 1;
  }
  return { update, prepare, dispose };
}

// lib/client/welcome-fireworks.mjs
var END = 2.4;
var TAU = Math.PI * 2;
var PALETTE = ["#cdeef2", "#8fd0d8", "#f2d99a"];
var SAMPLES = 72;
var clamp = (value, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, value));
var smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
var finite = (value, fallback) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
function makeFirework(start, rise, life, x, y, radius, colors, seed, kind) {
  let state = seed;
  const random = () => {
    state = Math.imul(state, 1664525) + 1013904223 >>> 0;
    return state / 4294967296;
  };
  const particles = [];
  const count = kind === "peony" ? 68 : kind === "palm" ? 24 : kind === "willow" ? 34 : kind === "brocade" ? 46 : 42;
  for (let i = 0; i < count; i += 1) {
    const inner = kind === "peony" && i >= 43;
    const ringIndex = inner ? i - 43 : i;
    const ringCount = kind === "peony" ? inner ? 25 : 43 : count;
    let angle = (ringIndex + random() * 0.56) / ringCount * TAU;
    let speed = radius * (0.71 + random() * 0.31);
    let gravity = radius * (0.63 + random() * 0.21);
    let vertical = 0.9, tail = 0.24 + random() * 0.12, segments = 6, width = 0.98 + random() * 0.5;
    let bead = 0.8 + random() * 0.48, drag = 2.35, fadeStart = 0.61;
    if (kind === "willow") {
      speed = radius * (0.57 + random() * 0.42);
      gravity = radius * (1.25 + random() * 0.4);
      vertical = 0.86;
      tail = 0.49 + random() * 0.19;
      segments = 10;
      width = 0.78 + random() * 0.46;
      drag = 2.9;
    } else if (kind === "peony") {
      speed = radius * (inner ? 0.39 + random() * 0.16 : 0.82 + random() * 0.2);
      gravity = radius * (0.24 + random() * 0.11);
      vertical = 0.94;
      tail = 0.035 + random() * 0.038;
      segments = 2;
      width = 0.84;
      bead = 1.5 + random() * 0.72;
      fadeStart = 0.49;
    } else if (kind === "palm") {
      angle = -2.95 + Math.floor(i / 3) / 7 * 2.76 + (i % 3 - 1) * 0.032;
      speed = radius * (0.72 + random() * 0.28);
      gravity = radius * (1.3 + random() * 0.27);
      vertical = 1.12;
      tail = 0.49 + random() * 0.13;
      segments = 8;
      width = 1.34 + random() * 0.4;
      bead = 0.95;
      drag = 2.7;
    } else if (kind === "brocade") {
      speed = radius * (0.58 + random() * 0.43);
      gravity = radius * (0.78 + random() * 0.36);
      vertical = 0.72;
      tail = 0.4 + random() * 0.19;
      segments = 9;
      width = 0.96 + random() * 0.5;
      drag = 2.8;
    }
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed * vertical;
    const bend = (random() - 0.5) * radius * (kind === "palm" ? 0.26 : 0.17);
    const flutter = radius * (6e-3 + random() * 0.01);
    const phase = random() * TAU;
    const trajectory = new Float32Array((SAMPLES + 1) * 2);
    for (let j = 0; j <= SAMPLES; j += 1) {
      const p = j / SAMPLES;
      const travel = 1 - Math.pow(1 - p, drag);
      trajectory[j * 2] = vx * travel + bend * p * p + flutter * Math.sin(p * 7 + phase) * p * p;
      trajectory[j * 2 + 1] = vy * travel + gravity * Math.pow(p, 1.8);
    }
    const gaps = new Float32Array(segments);
    for (let j = 0; j < segments; j += 1) gaps[j] = 0.62 + random() * 0.23;
    const colorIndex = kind === "peony" ? inner ? 0 : i % 5 ? 2 : 1 : colors[(i + Math.floor(random() * colors.length)) % colors.length];
    particles.push({
      trajectory,
      gaps,
      segments,
      tail,
      width,
      bead,
      fadeStart,
      delay: random() * 0.026,
      life: life * (0.86 + random() * 0.14),
      alpha: 0.79 + random() * 0.2,
      shimmer: random() * TAU,
      color: PALETTE[colorIndex],
      hot: colorIndex === 2 ? "#f2d99a" : "#eaf7f9",
      specks: kind !== "peony" && i % 3 !== 1
    });
  }
  const launchX = clamp(x + (random() - 0.5) * 0.17, 0.04, 0.96);
  return {
    start,
    rise,
    life,
    x,
    y,
    particles,
    kind,
    color: PALETTE[colors[0]],
    launchX,
    controlX: launchX + (x - launchX) * 0.25 + (random() - 0.5) * 0.035,
    tail: 0.052 + random() * 0.02
  };
}
var FIREWORKS = [
  makeFirework(0.06, 0.5, 1.05, 0.18, 0.56, 0.13, [0], 31, "chrysanthemum"),
  makeFirework(0.21, 0.58, 1.05, 0.9, 0.2, 0.23, [0, 1], 47, "willow"),
  makeFirework(0.66, 0.54, 1.05, 0.44, 0.53, 0.493, [2, 0, 1], 68, "peony"),
  makeFirework(0.94, 0.53, 0.84, 0.92, 0.43, 0.15, [2], 89, "palm"),
  makeFirework(1.07, 0.52, 0.78, 0.53, 0.3, 0.41, [2, 1, 0], 103, "brocade")
];
function trajectoryAt(particle, t, axis) {
  const at = clamp(t) * SAMPLES;
  const index = Math.min(SAMPLES - 1, Math.floor(at));
  const start = particle.trajectory[index * 2 + axis];
  return start + (particle.trajectory[(index + 1) * 2 + axis] - start) * (at - index);
}
function createWelcomeFireworks(container, { intensity = 50 } = {}) {
  if (!container?.ownerDocument || typeof container.appendChild !== "function") {
    throw new TypeError("createWelcomeFireworks requires a positioned DOM container");
  }
  const document2 = container.ownerDocument;
  const view = document2.defaultView;
  const canvas = document2.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  canvas.dataset.welcomeFireworks = "";
  const gain = clamp(finite(intensity, 50) / 50, 0, 2);
  const light = (value) => Math.min(1, value * Math.max(1, gain));
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:8;";
  canvas.style.opacity = String(Math.min(1, gain));
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 1, height = 1, ratio = 1, allocated = false, disposed = false;
  function resize(nextWidth, nextHeight) {
    nextWidth = Math.max(1, finite(nextWidth, null) ?? (allocated ? width : container.clientWidth));
    nextHeight = Math.max(1, finite(nextHeight, null) ?? (allocated ? height : container.clientHeight));
    const nextRatio = Math.min(1, view?.devicePixelRatio || 1, Math.sqrt(6e5 / (nextWidth * nextHeight)));
    if (allocated && nextWidth === width && nextHeight === height && nextRatio === ratio) return;
    width = nextWidth;
    height = nextHeight;
    ratio = nextRatio;
    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    allocated = true;
  }
  function clear() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalAlpha = 1;
  }
  function launchX(firework, p) {
    const inverse = 1 - p;
    return (inverse * inverse * firework.launchX + 2 * inverse * p * firework.controlX + p * p * firework.x) * width;
  }
  function launchY(firework, p) {
    const inverse = 1 - p;
    return (inverse * inverse * 1.025 + 2 * inverse * p * (firework.y + 0.31) + p * p * firework.y) * height;
  }
  function drawLaunch(firework, age, scale) {
    const q = clamp(age / firework.rise);
    const head = 1 - Math.pow(1 - q, 1.45);
    const tail = 1 - Math.pow(1 - clamp((age - firework.tail) / firework.rise), 1.45);
    const alpha = smooth(q / 0.09) * (0.79 + Math.sin(q * Math.PI) * 0.17);
    ctx.strokeStyle = firework.color;
    for (let i = 0; i < 6; i += 1) {
      const a = tail + (head - tail) * i / 6;
      const b = tail + (head - tail) * (i + 0.81) / 6;
      const m = (a + b) / 2;
      const x = launchX(firework, a), y = launchY(firework, a);
      const endX = launchX(firework, b), endY = launchY(firework, b);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(2 * launchX(firework, m) - (x + endX) / 2, 2 * launchY(firework, m) - (y + endY) / 2, endX, endY);
      ctx.lineWidth = 3.4 * scale;
      ctx.globalAlpha = light(alpha * (i + 1) / 6 * 0.2);
      ctx.stroke();
      ctx.lineWidth = 1.15 * scale;
      ctx.globalAlpha = light(alpha * (i + 1) / 6);
      ctx.stroke();
    }
    ctx.globalAlpha = light(alpha);
    ctx.fillStyle = "#eafcff";
    ctx.beginPath();
    ctx.arc(launchX(firework, head), launchY(firework, head), 1.65 * scale, 0, TAU);
    ctx.fill();
    for (let i = 0; i < 4; i += 1) {
      const emberAge = age - 0.027 * (i + 1);
      if (emberAge <= 0) continue;
      const p = 1 - Math.pow(1 - clamp(emberAge / firework.rise), 1.45);
      const drift = (i % 2 ? -1 : 1) * (i + 1) * 0.85 * scale;
      ctx.globalAlpha = light(alpha * (0.28 - i * 0.045));
      ctx.fillStyle = firework.color;
      ctx.beginPath();
      ctx.arc(launchX(firework, p) + drift, launchY(firework, p) + i * i * 1.1 * scale, (0.85 - i * 0.11) * scale, 0, TAU);
      ctx.fill();
    }
  }
  function drawBurst(firework, age, shortest, scale) {
    const cx = firework.x * width, cy = firework.y * height;
    if (age < 0.065) {
      ctx.globalAlpha = light((1 - age / 0.065) * 0.8);
      ctx.fillStyle = "#eafcff";
      ctx.beginPath();
      ctx.arc(cx, cy, (1.8 + age * 25) * scale, 0, TAU);
      ctx.fill();
    }
    for (const particle of firework.particles) {
      const u = (age - particle.delay) / particle.life;
      if (u <= 0 || u >= 1) continue;
      const alpha = smooth(u / 0.028) * (1 - smooth((u - particle.fadeStart) / (1 - particle.fadeStart))) * particle.alpha;
      if (alpha < 4e-3) continue;
      const from = Math.max(0, u - particle.tail * (0.72 + u * 0.28));
      const span = (u - from) / particle.segments;
      const shimmer = 0.84 + 0.16 * Math.sin(u * 23 + particle.shimmer);
      ctx.strokeStyle = particle.color;
      ctx.fillStyle = particle.color;
      for (let i = 0; i < particle.segments; i += 1) {
        const a = from + span * i;
        const b = a + span * particle.gaps[i];
        const m = (a + b) / 2;
        const x = cx + trajectoryAt(particle, a, 0) * shortest;
        const y = cy + trajectoryAt(particle, a, 1) * shortest;
        const endX = cx + trajectoryAt(particle, b, 0) * shortest;
        const endY = cy + trajectoryAt(particle, b, 1) * shortest;
        const controlX = 2 * (cx + trajectoryAt(particle, m, 0) * shortest) - (x + endX) / 2;
        const controlY = 2 * (cy + trajectoryAt(particle, m, 1) * shortest) - (y + endY) / 2;
        const strength = Math.pow((i + 1) / particle.segments, 1.35);
        const segmentAlpha = Math.min(1, alpha * shimmer * (0.1 + strength * 0.87) * 1.1);
        const lineWidth = particle.width * 1.12 * scale * (0.48 + strength * 0.56) * (1 - u * 0.26);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.lineWidth = lineWidth * 3.6;
        ctx.globalAlpha = light(segmentAlpha * 0.15);
        ctx.stroke();
        ctx.lineWidth = lineWidth;
        ctx.globalAlpha = light(segmentAlpha);
        ctx.stroke();
        if (particle.specks && i % 2 === 0) {
          const drift = (1 - strength) * u * shortest * 9e-3;
          ctx.globalAlpha = light(segmentAlpha * 0.85);
          ctx.beginPath();
          ctx.arc(endX + Math.sin(particle.shimmer + i) * drift * 0.3, endY + drift, (0.48 + strength * 0.4) * scale, 0, TAU);
          ctx.fill();
        }
      }
      const headX = cx + trajectoryAt(particle, u, 0) * shortest;
      const headY = cy + trajectoryAt(particle, u, 1) * shortest;
      const headSize = particle.bead * scale * (1 - u * 0.24);
      ctx.globalAlpha = light(alpha * 0.19);
      ctx.beginPath();
      ctx.arc(headX, headY, headSize * 2.4, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = light(alpha * shimmer);
      ctx.beginPath();
      ctx.arc(headX, headY, headSize, 0, TAU);
      ctx.fill();
      if (firework.kind === "peony" || firework.kind === "brocade") {
        ctx.fillStyle = particle.hot;
        ctx.globalAlpha = light(alpha * 0.83);
        ctx.beginPath();
        ctx.arc(headX, headY, headSize * 0.36, 0, TAU);
        ctx.fill();
      }
    }
  }
  function update(t, nextWidth, nextHeight) {
    if (disposed || !ctx || gain === 0) return;
    t = finite(t, 0);
    if (t <= 0 || t >= END || t < FIREWORKS[0].start) {
      if (allocated) clear();
      return;
    }
    resize(nextWidth, nextHeight);
    clear();
    const shortest = Math.min(width, height);
    const scale = clamp(shortest / 800, 0.72, 1.2);
    for (const firework of FIREWORKS) {
      const age = t - firework.start;
      if (age < 0 || age >= firework.rise + firework.life) continue;
      if (age < firework.rise) drawLaunch(firework, age, scale);
      else drawBurst(firework, age - firework.rise, shortest, scale);
    }
    ctx.globalAlpha = 1;
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    canvas.remove();
    canvas.width = 1;
    canvas.height = 1;
  }
  return { update, dispose };
}

// lib/client/welcome-ornaments.mjs
function waveRings(x, y, radius, rings, spacing, depth, fill, opacity) {
  const arcs = Array.from({ length: rings }, (_, index) => {
    const r = radius - index * spacing;
    return `M${-r} 0A${r} ${r} 0 0 1 ${r} 0`;
  }).join("");
  return `<g class="wave-ring-group" transform="translate(${x} ${y}) scale(1 ${depth})"><path d="M${-radius} 0A${radius} ${radius} 0 0 1 ${radius} 0Z" fill="${fill}" stroke="none"/><path d="${arcs}" stroke-opacity="${opacity}"/></g>`;
}
var welcomeWaveMarkup = `<svg class="svg-all" viewBox="0 0 1600 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="welcomeWaveBack" x1="0" y1="30" x2="0" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#123040"/><stop offset="1" stop-color="#0c222e"/></linearGradient>
    <linearGradient id="welcomeWaveMiddle" x1="800" y1="80" x2="800" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#0f2a3a"/><stop offset="1" stop-color="#0b212c"/></linearGradient>
    <linearGradient id="welcomeWaveFront" x1="800" y1="160" x2="800" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#0e2733"/><stop offset="1" stop-color="#0a1f29"/></linearGradient>
    <linearGradient id="welcomeWaveGold" x1="0" y1="0" x2="1600" y2="200" gradientUnits="userSpaceOnUse"><stop stop-color="#7fb0bd"/><stop offset=".2" stop-color="#d6eef0"/><stop offset=".45" stop-color="#8fbcc4"/><stop offset=".72" stop-color="#c4e2e6"/><stop offset="1" stop-color="#7fb0bd"/></linearGradient>
    <clipPath id="welcomeWaveBackClip"><path d="M0 40C137 60 199 207 367 183C530 160 512 100 685 145C826 182 921 216 1084 156C1276 85 1423 84 1600 133V300H0Z"/></clipPath>
    <clipPath id="welcomeWaveMiddleClip"><path d="M0 144C154 43 246 231 439 216C650 199 743 135 923 111C1131 81 1290 204 1461 171C1520 161 1564 139 1600 140V300H0Z"/></clipPath>
    <clipPath id="welcomeWaveFrontClip"><path d="M0 242C168 203 207 283 385 244C528 213 612 167 758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258V300H0Z"/></clipPath>
  </defs>
  <path d="M0 40C137 60 199 207 367 183C530 160 512 100 685 145C826 182 921 216 1084 156C1276 85 1423 84 1600 133V300H0Z" fill="url(#welcomeWaveBack)"/>
  <g clip-path="url(#welcomeWaveBackClip)" stroke="#9fd0da" stroke-width="1.2">
    ${waveRings(40, 187, 117, 9, 12, 0.92, "#0f2c3a", 0.42)}
    ${waveRings(431, 245, 96, 8, 11, 1.05, "#0e2b38", 0.36)}
    ${waveRings(597, 221, 108, 9, 12, 0.87, "#102d3b", 0.46)}
    ${waveRings(1414, 219, 124, 10, 12, 0.92, "#0e2b38", 0.43)}
  </g>
  <path d="M0 39C137 60 199 207 367 183C530 160 512 100 685 145C826 182 921 216 1084 156C1276 85 1423 84 1600 133" stroke="url(#welcomeWaveGold)" stroke-width="2"/>
  <path d="M0 144C154 43 246 231 439 216C650 199 743 135 923 111C1131 81 1290 204 1461 171C1520 161 1564 139 1600 140V300H0Z" fill="url(#welcomeWaveMiddle)"/>
  <g clip-path="url(#welcomeWaveMiddleClip)" stroke="#bfe2ea" stroke-width="1.3">
    ${waveRings(47, 249, 123, 10, 12, 0.95, "#0d2936", 0.6)}
    ${waveRings(251, 295, 133, 10, 13, 0.97, "#0d2834", 0.5)}
    ${waveRings(811, 250, 123, 10, 12, 0.96, "#0d2936", 0.54)}
    ${waveRings(1097, 282, 127, 10, 12, 0.94, "#0d2834", 0.48)}
    ${waveRings(1474, 271, 137, 11, 12, 0.96, "#0d2936", 0.6)}
  </g>
  <path d="M0 144C154 43 246 231 439 216C650 199 743 135 923 111C1131 81 1290 204 1461 171C1520 161 1564 139 1600 140" stroke="url(#welcomeWaveGold)" stroke-width="2.2"/>
  <path d="M0 242C168 203 207 283 385 244C528 213 612 167 758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258V300H0Z" fill="url(#welcomeWaveFront)"/>
  <g clip-path="url(#welcomeWaveFrontClip)" stroke="#bfe2ea" stroke-width="1.45">
    ${waveRings(64, 330, 109, 9, 12, 0.97, "#0c2631", 0.7)}
    ${waveRings(252, 342, 134, 11, 12, 0.95, "#0b242e", 0.6)}
    ${waveRings(453, 324, 98, 8, 12, 1.02, "#0c2631", 0.66)}
    ${waveRings(651, 332, 141, 11, 13, 0.98, "#0b242e", 0.62)}
    ${waveRings(927, 345, 114, 9, 12, 0.96, "#0c2631", 0.55)}
    ${waveRings(1202, 342, 126, 10, 12, 0.98, "#0b242e", 0.64)}
    ${waveRings(1480, 327, 111, 9, 12, 1.02, "#0c2631", 0.7)}
  </g>
  <path d="M0 242C168 203 207 283 385 244C528 213 612 167 758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258" stroke="url(#welcomeWaveGold)" stroke-width="1.8"/>
  <path d="M758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258C1405 213 1331 246 1183 278C1012 317 949 220 758 189Z" fill="url(#welcomeWaveGold)" opacity=".5"/>
</svg>`;

// lib/client/welcome-river.mjs
var nextRiverId = 0;
function mountWelcomeRiver(container, { motion = true, amplitude = 50, speed = 50, fishCount = 3 } = {}) {
  if (!container?.ownerDocument || typeof container.appendChild !== "function") {
    throw new TypeError("A positioned river container is required");
  }
  const document2 = container.ownerDocument;
  const view = document2.defaultView;
  const namespace = "http://www.w3.org/2000/svg";
  const id = `welcome-river-${++nextRiverId}`;
  const strength = (value) => (Number.isFinite(Number(value)) ? Math.max(0, Math.min(100, Number(value))) : 50) / 50;
  const amplitudeScale = strength(amplitude), speedScale = strength(speed);
  const layer = document2.createElement("div");
  layer.dataset.welcomeRiver = "";
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden;contain:layout paint;";
  const specs = [
    { x: 0.205, y: 0.64, compactX: 0.28, compactY: 0.86, direction: 1, size: 1, start: 0, duration: 2.7, leap: 0.22, travel: 0.051, pigment: "#8fc4d2", light: "#eaf7f9", dark: "#6f9fae", line: "#5b8493" },
    { x: 0.795, y: 0.62, compactX: 0.8, compactY: 0.42, direction: -1, size: 0.82, start: 1.1, duration: 2.5, leap: 0.18, travel: 0.046, pigment: "#cfe9ee", light: "#f2d99a", dark: "#8fb6c0", line: "#6d97a3" },
    { x: 0.475, y: 0.83, compactX: 0.52, compactY: 0.64, direction: 1, size: 0.71, start: 2.2, duration: 2.8, leap: 0.16, travel: 0.045, pigment: "#a9d8e0", light: "#dff3f6", dark: "#5f93a1", line: "#4a7683" }
  ].slice(0, Number(fishCount) === 2 ? 2 : 3);
  const fish = specs.map((spec, index) => {
    const node = document2.createElement("div");
    node.dataset.riverFish = ["silver-koi", "ice-fantail", "jade-minnow"][index];
    node.style.cssText = "position:absolute;left:0;top:0;pointer-events:none;transform-origin:center;";
    const svg = document2.createElementNS(namespace, "svg");
    svg.setAttribute("viewBox", "0 0 124 70");
    svg.style.cssText = `display:block;width:100%;height:100%;overflow:visible;transform:scaleX(${spec.direction});`;
    const body = [
      "M31 36C44 20 65 13 86 17C101 19 113 28 116 34C110 44 97 50 81 52C61 54 43 46 31 36Z",
      "M34 36C40 17 59 8 81 12C101 15 113 26 116 34C114 47 100 58 80 59C59 60 41 50 34 36Z",
      "M29 36C47 25 68 21 88 25C103 27 113 31 119 35C108 42 91 45 77 45C57 45 41 41 29 36Z"
    ][index];
    const tail = [
      "M37 33C26 30 17 20 6 16C7 27 11 33 20 36C12 40 8 47 6 58C20 51 29 43 38 42Z",
      "M39 31C29 23 22 9 7 6C10 23 13 29 22 35C10 40 5 51 4 65C23 58 29 48 40 42Z",
      "M35 33L7 22L16 36L7 51L36 40Z"
    ][index];
    const fins = [
      "M49 21Q52 8 67 8L73 22M50 46Q45 59 60 60L69 47",
      "M50 19Q53 2 69 4L82 16M53 51Q49 68 70 65L83 54",
      "M55 27L66 14L77 24M56 43L70 55L80 44"
    ][index];
    svg.innerHTML = `<defs><linearGradient id="${id}-${index}" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="${spec.light}"/><stop offset="1" stop-color="${spec.dark}"/></linearGradient></defs>
      <g fill="${spec.pigment}" stroke="#cfe9ee" stroke-width="1.4" stroke-linejoin="round">
        <g data-tail><path d="${tail}"/><path d="M9 21Q22 32 33 36M10 53Q23 40 33 37" fill="none" stroke-width=".9"/></g>
        <path d="${fins}"/>
        <path d="${body}" fill="url(#${id}-${index})"/>
        <g ${index === 2 ? 'transform="translate(0 12) scale(1 .66)"' : ""}>
        <path d="M45 27Q57 20 70 21Q72 31 66 36Q55 42 42 38Q46 34 45 27Z" stroke="none"/>
        <path d="M80 18Q95 18 106 27Q97 24 93 32Q82 36 76 27Z" stroke="none"/>
        <path d="M75 41Q88 37 98 43Q86 52 74 50Z" stroke="none" opacity=".85"/>
        <path d="M75 33Q65 34 58 46Q70 45 81 37Z" fill="#dff3f6"/>
        <path d="M43 34Q48 39 53 33M54 28Q59 33 64 27M53 40Q58 45 63 39M67 25Q72 30 77 24M66 44Q71 49 76 43M79 37Q84 42 89 36" fill="none" stroke="${spec.line}" stroke-width=".75" opacity=".56"/>
        <path d="M98 27Q93 34 97 41" fill="none" stroke="${spec.line}" stroke-width="1"/>
        <circle cx="105" cy="30" r="2.5" fill="#22303a" stroke="#eaf7f9" stroke-width="1"/>
        <path d="M112 35Q119 33 120 29" fill="none" stroke-width=".9"/>
        </g>
      </g>`;
    node.appendChild(svg);
    const ripple = document2.createElementNS(namespace, "svg");
    ripple.setAttribute("viewBox", "0 0 100 24");
    ripple.style.cssText = "position:absolute;left:0;top:0;overflow:visible;pointer-events:none;opacity:0;";
    ripple.innerHTML = '<g fill="none" stroke="#bfe2ea" stroke-width="1" stroke-linecap="round"><path d="M12 12Q32 3 50 6M61 6Q79 7 88 12M22 16Q51 22 77 15" opacity=".65"/><path d="M35 10Q48 6 63 10" opacity=".9"/></g>';
    layer.append(ripple, node);
    return { ...spec, wideX: spec.x, wideY: spec.y, node, svg, tail: svg.querySelector("[data-tail]"), ripple, width: 0, height: 0 };
  });
  container.appendChild(layer);
  const reducedMotion = view?.matchMedia?.("(prefers-reduced-motion: reduce)");
  let disposed = false, frozen = false, paused = false, motionEnabled = Boolean(motion);
  let width = 0, height = 0, elapsed = 0, previousTime = null, lastPaint = null, frame = null;
  const animated = () => motionEnabled && amplitudeScale > 0 && speedScale > 0 && !reducedMotion?.matches;
  const canRun = () => !disposed && !frozen && !paused && animated() && !document2.hidden && width > 0 && height > 0 && typeof view?.requestAnimationFrame === "function";
  function stop() {
    if (frame !== null) view?.cancelAnimationFrame?.(frame);
    frame = previousTime = lastPaint = null;
  }
  function pose(item, x, y, angle, opacity, tailAngle = 0) {
    item.node.style.transform = `translate3d(${x - item.width / 2}px,${y - item.height / 2}px,0) rotate(${angle}deg)`;
    item.node.style.opacity = String(opacity);
    item.tail.setAttribute("transform", `rotate(${tailAngle} 34 36)`);
  }
  function drawStatic() {
    for (const item of fish) {
      item.svg.style.transform = `scaleX(${item.direction})`;
      pose(item, item.x * width, item.y * height, -13 * item.direction, 0.78);
      item.ripple.style.opacity = ".23";
      item.ripple.style.transform = `translate3d(${item.x * width - item.width * 0.55}px,${item.y * height + item.height * 0.26}px,0)`;
    }
  }
  function draw() {
    const time = elapsed / 1e3 * speedScale;
    const cycle = 3.3;
    const seconds = time % cycle;
    for (const item of fish) {
      const local = (seconds - item.start + cycle) % cycle;
      const progress = local / item.duration;
      const leaping = progress >= 0 && progress <= 1;
      const distance = width * item.travel * amplitudeScale;
      const rise = Math.min(height * item.leap, item.width * 0.85) * amplitudeScale;
      if (leaping) {
        const x = item.x * width + item.direction * distance * (progress - 0.5);
        const y = item.y * height - 4 * rise * progress * (1 - progress);
        const angle = Math.atan2(-4 * rise * (1 - 2 * progress), distance) * 180 / Math.PI * item.direction;
        const fade = Math.max(0, Math.min(1, progress / 0.06, (1 - progress) / 0.1));
        item.svg.style.transform = `scaleX(${item.direction})`;
        pose(item, x, y, angle, fade * 0.9, Math.sin(progress * Math.PI * 7) * 5 * amplitudeScale);
      } else item.node.style.opacity = "0";
      const landing = local - item.duration;
      const rippleAge = local >= 0 && local < 0.75 ? local : landing >= 0 && landing < 1.15 ? landing : -1;
      if (rippleAge >= 0) {
        const atLanding = local >= item.duration;
        const edgeX = item.x * width + item.direction * distance * (atLanding ? 0.5 : -0.5);
        item.ripple.style.transform = `translate3d(${edgeX - item.width * 0.55}px,${item.y * height + item.height * 0.12}px,0) scale(${0.72 + rippleAge * 0.44})`;
        item.ripple.style.opacity = String(Math.max(0, Math.min(0.65, 0.46 * amplitudeScale) * (1 - rippleAge / (atLanding ? 1.15 : 0.75))));
      } else item.ripple.style.opacity = "0";
    }
  }
  function tick(timestamp) {
    frame = null;
    if (!canRun()) return;
    if (previousTime !== null) elapsed += Math.max(0, Math.min(100, timestamp - previousTime));
    previousTime = timestamp;
    if (lastPaint === null || timestamp - lastPaint >= 1e3 / 24) {
      draw();
      lastPaint = lastPaint === null ? timestamp : timestamp - (timestamp - lastPaint) % (1e3 / 24);
    }
    if (canRun()) frame = view.requestAnimationFrame(tick);
  }
  function reconcile() {
    if (disposed || frozen) return;
    if (animated()) draw();
    else drawStatic();
    if (!canRun()) stop();
    else if (frame === null) frame = view.requestAnimationFrame(tick);
  }
  function resize() {
    if (disposed || frozen) return;
    width = Math.max(0, container.clientWidth || 0);
    height = Math.max(0, container.clientHeight || 0);
    const compact = width < 600;
    for (const item of fish) {
      item.x = compact ? item.compactX : item.wideX;
      item.y = compact ? item.compactY : item.wideY;
      item.width = Math.min(62 * item.size, Math.max(compact ? 22 : 0, width * 0.034 * item.size), height * 0.36);
      item.height = item.width * 70 / 124;
      item.node.style.width = `${item.width}px`;
      item.node.style.height = `${item.height}px`;
      item.ripple.style.width = `${item.width * 1.1}px`;
      item.ripple.style.height = `${item.width * 0.264}px`;
      item.ripple.style.transformOrigin = "center";
    }
    reconcile();
  }
  const observer = typeof view?.ResizeObserver === "function" ? new view.ResizeObserver(resize) : null;
  observer?.observe(container);
  if (!observer) view?.addEventListener?.("resize", resize);
  const onVisibility = () => {
    if (document2.hidden) stop();
    else reconcile();
  };
  document2.addEventListener("visibilitychange", onVisibility);
  reducedMotion?.addEventListener?.("change", reconcile);
  resize();
  function setPaused(value) {
    if (disposed || frozen) return;
    paused = Boolean(value);
    if (paused) stop();
    else reconcile();
  }
  function setMotion(value) {
    if (disposed || frozen) return;
    motionEnabled = Boolean(value);
    reconcile();
  }
  function freeze() {
    if (disposed || frozen) return;
    frozen = true;
    stop();
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    observer?.disconnect();
    if (!observer) view?.removeEventListener?.("resize", resize);
    document2.removeEventListener("visibilitychange", onVisibility);
    reducedMotion?.removeEventListener?.("change", reconcile);
    layer.remove();
  }
  return { setPaused, setMotion, freeze, dispose };
}

// lib/client/welcome-scene.mjs
var ASSET_BASE = `${ASSETS_PATH}/entrance/20261010`;
var HERO_URL = `${ASSET_BASE}/hero.jpg`;
var WATER_MS = 2200;
var assetLoads = /* @__PURE__ */ new Map();
function decodeAsset(url) {
  if (!assetLoads.has(url)) {
    const image = new Image();
    image.decoding = "async";
    const loaded = new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    }).then(async () => {
      if (image.decode) await image.decode();
      return image;
    });
    assetLoads.set(url, loaded);
    loaded.catch(() => {
      if (assetLoads.get(url) === loaded) assetLoads.delete(url);
    });
  }
  return assetLoads.get(url);
}
function prepareWelcomeAssets() {
  return Promise.all([decodeAsset(HERO_URL)]);
}
var clamp2 = (v) => Math.max(0, Math.min(1, v));
var out = (v) => 1 - Math.pow(1 - clamp2(v), 3);
var range = (t, a, b) => clamp2((t - a) / (b - a));
var lerp = (a, b, t) => a + (b - a) * t;
var css = `
 :host{all:initial;position:fixed;inset:0;z-index:2147483500;isolation:isolate;pointer-events:auto;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;color:#e8f1f2;container-type:inline-size;}
 *{box-sizing:border-box}.entry,.layer{position:absolute;inset:0}.entry{overflow:hidden;background:#0c1b24;contain:paint}
 .a-horizon{background:radial-gradient(ellipse at 62% 42%,#25414d 0,transparent 56%),linear-gradient(150deg,#132836,#0c1b24)}
 .hero{position:absolute;inset:0;z-index:4;transform-origin:62% 45%;will-change:transform,opacity}
 .hero img{display:block;width:100%;height:100%;object-fit:cover;object-position:62% center}
 .hero-veil{position:absolute;inset:0;z-index:6;pointer-events:none;background:linear-gradient(95deg,#0a1720f2 0,#0a1720a8 32%,#0a172024 58%,transparent 74%),linear-gradient(180deg,#0a1720b3 0,transparent 20%),linear-gradient(0deg,#0a1720cc 0,transparent 30%)}
 .wave-front{position:absolute;inset:auto 0 0;height:16%;z-index:9;opacity:.55}.svg-all{width:100%;height:100%;display:block}
 .river-life{position:absolute;inset:auto 0 0;height:16%;z-index:10;pointer-events:none;overflow:hidden}
 .a-title{position:absolute;z-index:12;left:13%;top:24%;transform-origin:0 50%}
 .a-title .kanji{font-family:"Songti SC","STSong",serif;font-size:min(9.2cqw,15vh);line-height:1.14;letter-spacing:-.04em;font-weight:700;color:#f4fafb;text-shadow:0 2px 10px #04101acc,0 4px 34px #04101ad9,0 0 2px #06141c}
 .a-title .latin{font-family:Georgia,serif;margin-top:1em;font-size:min(1.3cqw,2.1vh);letter-spacing:.28em;color:#dceff2;text-shadow:0 1px 6px #04101ae6,0 2px 16px #04101acc}
 .deepseek{position:absolute;left:13%;bottom:13%;z-index:12;color:#e0f0f3;font-size:min(2cqw,2.9vh);letter-spacing:-.03em;font-weight:500;text-shadow:0 2px 10px #04101ae6,0 3px 22px #04101acc}
 .deepseek small{display:block;font-size:min(.85cqw,1.25vh);font-weight:400;letter-spacing:.3em;margin-top:8px;color:#bfdde2;text-shadow:0 1px 6px #04101ad9}
 .enter{position:absolute;right:4.5%;bottom:5.5%;z-index:40;border:0;outline:none;padding:10px;background:none;color:#d7ecf0;font:400 11px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;letter-spacing:.08em;cursor:pointer;opacity:.8;text-shadow:0 1px 6px #04101ae6}.enter:hover{opacity:1}.enter:focus-visible{outline:1px solid #d7ecf0;outline-offset:4px;opacity:1}
 .masthead{position:absolute;right:4.5%;top:4%;z-index:20;font-size:10px;letter-spacing:.22em;color:#d7ecf0;opacity:.92;text-shadow:0 1px 6px #04101ae6,0 2px 14px #04101acc}
 .a-title,.deepseek,.wave-front,.river-life{will-change:transform,opacity}
 @media(max-aspect-ratio:4/5){.a-title{left:8%;top:12%}.a-title .kanji{font-size:min(11.6cqw,12vh)}.a-title .latin{font-size:min(2.9cqw,3.4vh);letter-spacing:.2em}.deepseek{left:8%;bottom:9%;font-size:min(7.6cqw,7vh);z-index:30}.enter{right:6%;bottom:5%}.masthead{right:6%;font-size:9px}}
 `;
var markup = `<div class="entry">
    <div class="layer a-horizon"></div>
    <div class="hero" id="aHero"></div>
    <div class="hero-veil" id="aVeil"></div>
    <div class="wave-front" id="aWave">${welcomeWaveMarkup}</div>
    <div class="river-life" id="aRiver"></div>
    <div class="a-title" id="aTitle"><div class="kanji">\u6C34\u5149\u4E4B\u4E0B<br>\u4ECD\u5728\u7B49\u4F60</div><div class="latin">\u6C89\u5165\u6D9F\u6F2A\uFF0C\u518D\u88AB\u6D6E\u8D77\u3002</div></div>
    <div class="deepseek" id="aDeepseek">DeepSeek<small>DEEPSEEK HARNESS</small></div>
  </div>`;
function mountWelcomeScene(root, {
  duration = 3.2,
  motion = true,
  fireworksEnabled = true,
  fireworkIntensity = 50,
  riverMotion = true,
  riverAmplitude = 50,
  riverSpeed = 50,
  fishCount = 3,
  onFailure = () => {
  }
} = {}) {
  root.innerHTML = `<style>${css}</style>${markup}`;
  const entry = root.querySelector(".entry");
  entry.insertAdjacentHTML("beforeend", '<div class="masthead">DEEPSEEK HARNESS</div><button class="enter" type="button" aria-label="\u8FDB\u5165\u5DE5\u4F5C\u53F0\uFF0C\u70B9\u51FB\u6216\u6309\u4EFB\u610F\u952E">\u70B9\u51FB\u6216\u6309\u952E\u8FDB\u5165</button>');
  const $ = (id) => root.getElementById(id);
  const character = mountWelcomeCharacter($("aHero"), { imageURL: HERO_URL, alt: "\u6C34\u5149\u4E4B\u4E0B\u7684\u4EBA\u7269" });
  const heroImg = $("aHero").querySelector("img");
  heroImg.addEventListener("error", () => {
    heroImg.hidden = true;
  }, { once: true });
  const fireworks = createWelcomeFireworks(entry, { intensity: fireworksEnabled ? fireworkIntensity : 0 });
  const river = mountWelcomeRiver($("aRiver"), { motion: motion && riverMotion, amplitude: riverAmplitude, speed: riverSpeed, fishCount });
  river.setPaused(true);
  const waterLayer = document.createElement("div");
  waterLayer.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:40";
  root.append(waterLayer);
  const water = createWelcomeWater(waterLayer);
  let disposed = false, frame = null, last = null, elapsed = 0, paused = false, ready = false, exiting = false, exitElapsed = 0, finish = null;
  let origin = null, workspaceAnimation = null, loadTimeout = null, warming = 0;
  let bounds = root.host.getBoundingClientRect();
  const resizeObserver = new ResizeObserver(() => {
    bounds = root.host.getBoundingClientRect();
  });
  resizeObserver.observe(root.host);
  root.host.dataset.welcomePhase = "loading";
  const transform = (id, v) => $(id).style.transform = v;
  const opacity = (id, v) => $(id).style.opacity = v;
  function render(t) {
    character.update(t);
    fireworks.update(motion ? t : 2.4, bounds.width, bounds.height);
    const scene = out(range(t, 0, 0.7)), person = out(range(t, 0.48, 1.38)), title = out(range(t, 1.05, 1.65));
    transform("aHero", `scale(${lerp(1.05, 1, person)})`);
    opacity("aHero", person);
    opacity("aVeil", lerp(1, 0.82, person));
    transform("aTitle", `translateY(${lerp(14, 0, title)}%) scale(${lerp(0.98, 1, title)})`);
    opacity("aTitle", title);
    opacity("aDeepseek", title);
    transform("aWave", `translateY(${lerp(90, 0, scene)}%)`);
    opacity("aWave", scene * 0.55);
    transform("aRiver", `translateY(${lerp(90, 0, scene)}%)`);
    opacity("aRiver", scene);
  }
  function renderExit(milliseconds) {
    const p = clamp2(milliseconds / WATER_MS);
    const { width: w, height: h } = bounds;
    const x = origin.x * w, y = origin.y * h;
    const waves = welcomeWaterWaves(p, w, h, origin).filter((wave) => wave.amount > 0);
    if (waves.length) {
      const remaining = [0.56, 0.2, 0];
      const color = (alpha) => `rgba(0,0,0,${alpha})`;
      const stops = [`${color(remaining[waves.length - 1])} 0px`];
      for (let i = waves.length - 1; i >= 0; i--) {
        const { radius, thickness } = waves[i];
        const gap = Math.min(i > 0 ? waves[i - 1].radius - radius : Infinity, i < waves.length - 1 ? radius - waves[i + 1].radius : Infinity);
        const feather = Math.min(thickness * 1.7, radius * 0.75, gap * 0.4);
        stops.push(`${color(remaining[i])} ${Math.max(0, radius - feather)}px`, `${color(i ? remaining[i - 1] : 1)} ${radius + feather}px`);
      }
      const mask = `radial-gradient(circle at ${x}px ${y}px, ${stops.join(",")})`;
      entry.style.maskImage = mask;
      entry.style.webkitMaskImage = mask;
    }
    water.update(p, { ...origin, normalized: true });
    if (p >= 1) {
      entry.style.display = "none";
      workspaceAnimation?.cancel();
      workspaceAnimation = null;
    }
  }
  function tick(now) {
    frame = null;
    if (disposed || paused || !ready) return;
    if (warming && !exiting) {
      if (--warming) {
        frame = requestAnimationFrame(tick);
        return;
      }
      render(motion ? 0 : 2.4);
      entry.style.opacity = "1";
      root.host.style.background = "";
      root.host.dataset.welcomePhase = "entering";
      river.setPaused(paused);
      last = null;
    }
    const dt = last === null ? 0 : Math.max(0, now - last);
    last = now;
    if (exiting) {
      exitElapsed += dt;
      renderExit(exitElapsed);
      if (disposed) return;
      if (exitElapsed >= WATER_MS) {
        const done = finish;
        finish = null;
        done?.();
        return;
      }
    } else {
      elapsed += dt;
      render(motion ? Math.min(2.4, elapsed / 1e3 * 2.4 / duration) : 2.4);
      if (!motion || elapsed >= duration * 1e3) {
        root.host.dataset.welcomePhase = "settled";
        return;
      }
    }
    frame = requestAnimationFrame(tick);
  }
  const schedule = () => {
    if (!disposed && !paused && ready && frame === null) {
      last = null;
      frame = requestAnimationFrame(tick);
    }
  };
  render(motion ? 0 : 2.4);
  loadTimeout = setTimeout(() => {
    if (!disposed && !ready) onFailure();
  }, 8e3);
  prepareWelcomeAssets().then(() => {
    clearTimeout(loadTimeout);
    if (disposed || exiting) return;
    ready = true;
    if (motion) {
      root.host.style.background = "#0c1b24";
      entry.style.opacity = ".01";
      render(2.4);
      character.update(1.5);
      fireworks.update(1.3, bounds.width, bounds.height);
      warming = 3;
      root.host.dataset.welcomePhase = "preparing";
    } else render(2.4);
    schedule();
  }).catch(() => {
    clearTimeout(loadTimeout);
    if (!disposed && !exiting) onFailure();
  });
  return {
    setPaused(value) {
      paused = value;
      river.setPaused(value || !ready || Boolean(warming));
      if (paused) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        last = null;
        workspaceAnimation?.pause();
      } else {
        workspaceAnimation?.play();
        if (exiting || elapsed < duration * 1e3 && motion) schedule();
      }
    },
    setMotion(value) {
      motion = value;
      river.setMotion(value && riverMotion);
      river.setPaused(paused || !ready || Boolean(warming));
      if (!motion && !exiting) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        warming = 0;
        entry.style.opacity = "1";
        root.host.style.background = "";
        elapsed = duration * 1e3;
        render(2.4);
        root.host.dataset.welcomePhase = "settled";
      }
    },
    dismiss(point, onComplete) {
      if (disposed || exiting) return;
      exiting = true;
      river.freeze();
      finish = onComplete;
      ready = true;
      warming = 0;
      clearTimeout(loadTimeout);
      root.host.style.background = "";
      entry.style.opacity = "1";
      root.host.dataset.welcomePhase = "revealing";
      const r = root.host.getBoundingClientRect();
      bounds = r;
      origin = { x: clamp2(point ? (point.x - r.left) / r.width : 0.5), y: clamp2(point ? (point.y - r.top) / r.height : 0.5) };
      root.host.dataset.waterOrigin = `${origin.x.toFixed(4)},${origin.y.toFixed(4)}`;
      const workspace = document.getElementById("root");
      if (workspace && !workspace.contains(root.host)) workspaceAnimation = workspace.animate([{ translate: "0 22px" }, { translate: "0 0" }], { duration: WATER_MS, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" });
      renderExit(0);
      schedule();
    },
    dispose() {
      disposed = true;
      clearTimeout(loadTimeout);
      resizeObserver.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      workspaceAnimation?.cancel();
      character.dispose();
      fireworks.dispose();
      river.dispose();
      water.dispose();
      finish = null;
    }
  };
}

// lib/client/wallpaper-preferences.mjs
var MOTION_DEFAULTS = Object.freeze({
  motion: true,
  entrance: true,
  intensity: 70,
  speed: 45,
  duration: 3.2,
  sunset: 35,
  welcomeMotion: true,
  fireworks: true,
  ribbonMotion: true,
  riverMotion: true,
  welcomeScaleVersion: 2,
  fireworkIntensity: 50,
  handAmplitude: 50,
  handSpeed: 50,
  ribbonAmplitude: 50,
  ribbonSpeed: 50,
  riverAmplitude: 50,
  riverSpeed: 50,
  fishCount: 3
});
function normalizeMotion(value = {}) {
  if (!value || typeof value !== "object") value = {};
  const boolean = (key) => typeof value[key] === "boolean" ? value[key] : MOTION_DEFAULTS[key];
  const number = (key, min, max) => typeof value[key] === "number" && Number.isFinite(value[key]) ? Math.min(max, Math.max(min, value[key])) : MOTION_DEFAULTS[key];
  const legacyFireworks = value.welcomeScaleVersion !== 2 && typeof value.fireworkIntensity === "number" && Number.isFinite(value.fireworkIntensity);
  return {
    motion: boolean("motion"),
    entrance: boolean("entrance"),
    intensity: number("intensity", 0, 100),
    speed: number("speed", 10, 100),
    duration: number("duration", 1.5, 5),
    sunset: number("sunset", 0, 100),
    welcomeMotion: typeof value.welcomeMotion === "boolean" ? value.welcomeMotion : value.motion !== false,
    fireworks: boolean("fireworks"),
    ribbonMotion: boolean("ribbonMotion"),
    riverMotion: boolean("riverMotion"),
    welcomeScaleVersion: 2,
    fireworkIntensity: legacyFireworks ? number("fireworkIntensity", 0, 100) / 2 : number("fireworkIntensity", 0, 100),
    handAmplitude: number("handAmplitude", 0, 100),
    handSpeed: number("handSpeed", 0, 100),
    ribbonAmplitude: number("ribbonAmplitude", 0, 100),
    ribbonSpeed: number("ribbonSpeed", 0, 100),
    riverAmplitude: number("riverAmplitude", 0, 100),
    riverSpeed: number("riverSpeed", 0, 100),
    fishCount: Math.round(number("fishCount", 2, 3))
  };
}
var WELCOME_PRESETS = Object.freeze([
  Object.freeze({ id: "quiet", label: "\u9759\u8C27", description: "\u7559\u4E00\u7F15\u5FAE\u98CE", values: Object.freeze({
    welcomeScaleVersion: 2,
    welcomeMotion: true,
    fireworks: false,
    ribbonMotion: true,
    riverMotion: false,
    fireworkIntensity: 17.5,
    handAmplitude: 25,
    handSpeed: 30,
    ribbonAmplitude: 25,
    ribbonSpeed: 30,
    riverAmplitude: 25,
    riverSpeed: 30,
    fishCount: 2,
    duration: 2.4
  }) }),
  Object.freeze({ id: "soft", label: "\u8F7B\u76C8", description: "\u67D4\u5149\u4E0E\u6C34\u610F", values: Object.freeze({
    welcomeScaleVersion: 2,
    welcomeMotion: true,
    fireworks: true,
    ribbonMotion: true,
    riverMotion: true,
    fireworkIntensity: 30,
    handAmplitude: 35,
    handSpeed: 40,
    ribbonAmplitude: 35,
    ribbonSpeed: 40,
    riverAmplitude: 35,
    riverSpeed: 40,
    fishCount: 3,
    duration: 2.8
  }) }),
  Object.freeze({ id: "festival", label: "\u796D\u5178", description: "\u70DF\u82B1\u6B63\u76DB\u65F6", values: Object.freeze({
    welcomeScaleVersion: 2,
    welcomeMotion: true,
    fireworks: true,
    ribbonMotion: true,
    riverMotion: true,
    fireworkIntensity: 50,
    handAmplitude: 50,
    handSpeed: 50,
    ribbonAmplitude: 50,
    ribbonSpeed: 50,
    riverAmplitude: 50,
    riverSpeed: 50,
    fishCount: 3,
    duration: 3.2
  }) })
]);

// lib/client/wallpaper-settings-view.mjs
var MOTION_SETTINGS_CSS = `
[data-motion-settings]{--yms-ink:#f4e7cf;--yms-muted:#b5bec0;--yms-gold:#edcc8e;--yms-line:#a78b5f40;--yms-bg:#142730;--yms-surface:#192e36;width:100%;max-width:760px;min-width:0;box-sizing:border-box;padding:24px;color:var(--yms-ink);background:var(--yms-bg);border:1px solid var(--yms-line);border-radius:18px;font:14px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;color-scheme:dark}
[data-motion-settings] *,[data-motion-settings] *:before,[data-motion-settings] *:after{box-sizing:border-box}
[data-motion-settings] [hidden]{display:none!important}
[data-motion-settings] h2,[data-motion-settings] h3,[data-motion-settings] p{margin:0}
[data-motion-settings] button,[data-motion-settings] input{font:inherit;color:inherit;min-width:0}
[data-motion-settings] button{appearance:none;min-height:44px;border:1px solid var(--yms-line);border-radius:10px;padding:10px 14px;background:var(--yms-surface);cursor:pointer;line-height:1.4}
[data-motion-settings] button:hover:not(:disabled){background:#243b42;border-color:#edcc8e85}
[data-motion-settings] button:focus-visible,[data-motion-settings] input:focus-visible,[data-motion-settings] [role=tabpanel]:focus-visible{outline:2px solid var(--yms-gold);outline-offset:3px}
[data-motion-settings] button:disabled,[data-motion-settings] input:disabled{cursor:not-allowed;opacity:.48}
[data-motion-settings] .yms-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:20px}
[data-motion-settings] h2{font:600 24px/1.3 "Songti SC","STSong",serif;letter-spacing:.6px;color:var(--yms-gold)}
[data-motion-settings] .yms-description{color:var(--yms-muted);font-size:12px;margin-top:7px;max-width:42em}
[data-motion-settings] .yms-close{display:grid;place-items:center;flex:none;width:44px;height:44px;min-height:44px;font-size:25px;line-height:1;padding:0;border-color:transparent;background:transparent;margin:-8px -8px 0 0;color:var(--yms-muted)}
[data-motion-settings] .yms-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:4px;background:#0e1f28;border-radius:12px;margin-bottom:20px}
[data-motion-settings] .yms-tab{border-color:transparent;background:transparent;color:var(--yms-muted);font-weight:550}
[data-motion-settings] .yms-tab[aria-selected=true]{background:#2a3b3c;border-color:#dfbc7855;color:var(--yms-gold);box-shadow:inset 0 -2px #d8b776}
[data-motion-settings] .yms-panel{min-width:0}
[data-motion-settings] .yms-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:10px}
[data-motion-settings] h3{font-size:13px;font-weight:600}
[data-motion-settings] .yms-preset-state{color:var(--yms-muted);font-size:11px}
[data-motion-settings] .yms-presets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:18px}
[data-motion-settings] .yms-preset{position:relative;text-align:left;min-height:72px;padding:10px 12px;background:transparent;display:flex;flex-direction:column;justify-content:center;gap:3px}
[data-motion-settings] .yms-preset strong{font-size:14px;font-weight:550}
[data-motion-settings] .yms-preset span{font-size:11px;color:var(--yms-muted);white-space:nowrap}
[data-motion-settings] .yms-preset[aria-pressed=true]{background:#3b3d315c;border-color:#dfbc7899;box-shadow:inset 0 0 0 1px #dfbc7838}
[data-motion-settings] .yms-preset[aria-pressed=true] strong{color:var(--yms-gold)}
[data-motion-settings] .yms-fields{border-top:1px solid var(--yms-line)}
[data-motion-settings] .yms-toggle{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:60px;margin:0;padding:9px 0;cursor:pointer}
[data-motion-settings] .yms-toggle+.yms-toggle{border-top:1px solid #ffffff09}
[data-motion-settings] .yms-label{display:block;font-size:13px;font-weight:500}
[data-motion-settings] .yms-hint{display:block;font-size:11px;font-weight:400;color:var(--yms-muted);margin-top:3px;line-height:1.6}
[data-motion-settings] .yms-toggle[data-disabled=true],[data-motion-settings] .yms-range[data-disabled=true]{color:#8b9599}
[data-motion-settings] .yms-toggle[data-disabled=true]{cursor:default}
[data-motion-settings] .yms-toggle[data-disabled=true] .yms-hint,[data-motion-settings] .yms-range[data-disabled=true] .yms-scale{color:#8b9599}
[data-motion-settings] .yms-switch{appearance:none;display:block;position:relative;width:44px;height:44px;min-width:44px;min-height:44px;flex:none;padding:0;margin:0;background:transparent;border:0;border-radius:7px;cursor:pointer}
[data-motion-settings] .yms-switch:before{content:"";position:absolute;left:2px;top:10px;width:40px;height:24px;border-radius:14px;background:#45555a;border:1px solid #89999e7a}
[data-motion-settings] .yms-switch:after{content:"";position:absolute;left:6px;top:14px;width:16px;height:16px;border-radius:50%;background:#d9dfdb;transition:transform .15s ease}
[data-motion-settings] .yms-switch:checked:before{background:var(--yms-gold);border-color:var(--yms-gold)}
[data-motion-settings] .yms-switch:checked:after{background:#243337;transform:translateX(16px)}
[data-motion-settings] .yms-subfields{margin-top:4px;padding:0 14px;background:#0e202852;border:1px solid #ffffff0b;border-radius:12px}
[data-motion-settings] .yms-range{padding:15px 0 4px}
[data-motion-settings] .yms-range+.yms-range{margin-top:6px}
[data-motion-settings] .yms-range-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}
[data-motion-settings] .yms-range-heading label{display:block;margin:0;font-size:13px;font-weight:500;color:inherit}
[data-motion-settings] output{font-size:12px;font-variant-numeric:tabular-nums;color:var(--yms-gold);white-space:nowrap}
[data-motion-settings] input[type=range]{display:block;width:100%;height:44px;min-height:44px;margin:0;padding:0;accent-color:var(--yms-gold);cursor:pointer;background:transparent}
[data-motion-settings] input[type=range]:disabled{cursor:not-allowed}
[data-motion-settings] .yms-scale{display:flex;justify-content:space-between;gap:10px;color:var(--yms-muted);font-size:11px;margin-top:-7px}
[data-motion-settings] .yms-duration-note{margin:11px 0 2px;font-size:11px;line-height:1.6;color:var(--yms-muted)}
[data-motion-settings] .yms-work-note{color:var(--yms-muted);font-size:12px;margin-bottom:15px}
[data-motion-settings] .yms-actions{display:flex;gap:9px;flex-wrap:wrap;padding-top:20px;margin-top:18px;border-top:1px solid var(--yms-line)}
[data-motion-settings] .yms-primary{background:var(--yms-gold);color:#1d3036;border-color:var(--yms-gold);font-weight:600}
[data-motion-settings] .yms-primary:hover:not(:disabled){background:#f7ddb0;border-color:#f7ddb0}
[data-motion-settings] .yms-reset{background:transparent;color:var(--yms-muted)}
[data-motion-settings] .yms-status{margin-top:12px;min-height:18px;color:var(--yms-muted);font-size:11px;line-height:1.6;overflow-wrap:anywhere}
[data-motion-settings] .yms-error{margin-top:8px;color:#ffd4bb;font-size:12px;border-left:2px solid #da9b74;padding-left:9px}
[data-motion-settings] .yms-note{margin-top:8px;color:var(--yms-muted);font-size:11px;line-height:1.7}
[data-motion-settings] .yms-reduced{margin-top:10px;padding:8px 10px;border-radius:8px;background:#d6b57512;color:#deca9f;font-size:11px}
[data-motion-settings] .yms-sr{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
[data-motion-settings].yms-compact{max-width:none;height:100%;display:flex;flex-direction:column;overflow:hidden;padding:20px;border:0;border-radius:0;background:transparent}
[data-motion-settings].yms-compact>*{flex-shrink:0}
[data-motion-settings].yms-compact .yms-panel{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;padding-right:6px}
[data-motion-settings].yms-compact .yms-actions{padding-top:12px;margin-top:12px}
[data-motion-settings].yms-compact .yms-tabs{margin-bottom:14px}
[data-motion-settings].yms-compact .yms-head{margin-bottom:16px}
[data-motion-settings].yms-compact h2{font-size:23px}
@media(max-width:480px){[data-motion-settings]{padding:18px 16px}[data-motion-settings].yms-compact{padding:18px 16px}[data-motion-settings] .yms-presets{gap:6px}[data-motion-settings] .yms-preset{padding:9px 8px}[data-motion-settings] .yms-subfields{padding:0 11px}[data-motion-settings] .yms-actions{gap:8px}[data-motion-settings] .yms-actions button{flex:1}}
@media(prefers-reduced-motion:reduce){[data-motion-settings] *:before,[data-motion-settings] *:after{transition:none!important}}
`;
var sequence = 0;
function mountMotionSettings(container, controller, { compact = false, welcomeOnly = false, onClose, supported } = {}) {
  if (!container?.ownerDocument) throw new TypeError("A motion settings container is required");
  const document2 = container.ownerDocument;
  const id = `heavenstep-motion-${++sequence}`;
  const show = (key) => !supported || supported.includes(key);
  const element = (tag, className, text) => {
    const node = document2.createElement(tag);
    if (className) node.className = className;
    if (text !== void 0) node.textContent = text;
    return node;
  };
  const section = element("section", compact ? "yms-compact" : "");
  section.dataset.motionSettings = "";
  section.setAttribute("aria-label", welcomeOnly ? "\u52A8\u753B\u8BBE\u7F6E" : "\u573A\u666F\u52A8\u6548\u8BBE\u7F6E");
  const style = element("style", "", MOTION_SETTINGS_CSS);
  const head = element("div", "yms-head");
  const title = element("div");
  title.append(element("h2", "", welcomeOnly ? "\u52A8\u753B\u8BBE\u7F6E" : "\u573A\u666F\u52A8\u6548"), element("p", "yms-description", welcomeOnly ? "\u6B22\u8FCE\u65F6\u7684\u5149\u4E0E\u98CE\uFF0C\u7531\u4F60\u8C03\u6574\u3002" : "\u6B22\u8FCE\u65F6\u7684\u5149\u4E0E\u98CE\uFF0C\u5DE5\u4F5C\u65F6\u7684\u5B89\u9759\u966A\u4F34\u3002"));
  head.append(title);
  const close = compact && typeof onClose === "function" ? element("button", "yms-close close", "\xD7") : null;
  if (close) {
    close.type = "button";
    close.dataset.close = "";
    close.setAttribute("aria-label", welcomeOnly ? "\u5173\u95ED\u52A8\u753B\u8BBE\u7F6E" : "\u5173\u95ED\u573A\u666F\u52A8\u6548\u8BBE\u7F6E");
    close.addEventListener("click", onClose);
    head.append(close);
  }
  const tabs = element("div", "yms-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "\u52A8\u6548\u573A\u666F");
  tabs.hidden = welcomeOnly;
  const panels = /* @__PURE__ */ new Map(), tabButtons = /* @__PURE__ */ new Map();
  for (const [key, label] of welcomeOnly ? [["welcome", "\u6B22\u8FCE\u573A\u666F"]] : [["welcome", "\u6B22\u8FCE\u573A\u666F"], ["wallpaper", "\u5DE5\u4F5C\u58C1\u7EB8"]]) {
    const button = element("button", "yms-tab", label);
    button.type = "button";
    button.id = `${id}-tab-${key}`;
    button.dataset.tab = key;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", `${id}-panel-${key}`);
    const panel = element("div", "yms-panel");
    panel.id = `${id}-panel-${key}`;
    panel.setAttribute("role", welcomeOnly ? "region" : "tabpanel");
    panel.setAttribute(welcomeOnly ? "aria-label" : "aria-labelledby", welcomeOnly ? label : button.id);
    panel.tabIndex = 0;
    panels.set(key, panel);
    tabButtons.set(key, button);
    tabs.append(button);
  }
  section.append(style, head, tabs, ...panels.values());
  const welcome = panels.get("welcome"), wallpaper = panels.get("wallpaper");
  const presetHeading = element("div", "yms-heading");
  const presetState = element("span", "yms-preset-state");
  presetHeading.append(element("h3", "", "\u6B22\u8FCE\u6C1B\u56F4"), presetState);
  const presetRow = element("div", "yms-presets");
  presetRow.setAttribute("role", "group");
  presetRow.setAttribute("aria-label", "\u6B22\u8FCE\u573A\u666F\u9884\u8BBE");
  const presetButtons = /* @__PURE__ */ new Map();
  for (const preset of WELCOME_PRESETS) {
    const button = element("button", "yms-preset");
    button.type = "button";
    button.dataset.preset = preset.id;
    button.append(element("strong", "", preset.label), element("span", "", preset.description));
    presetRow.append(button);
    presetButtons.set(preset.id, button);
  }
  welcome.append(presetHeading, presetRow);
  const fields = /* @__PURE__ */ new Map();
  function toggle(parent, key, label, hint, disabledWhen = () => false) {
    const row = element("label", "yms-toggle");
    const copy = element("span");
    copy.append(element("span", "yms-label", label));
    if (hint) copy.append(element("span", "yms-hint", hint));
    const input = element("input", "yms-switch");
    input.type = "checkbox";
    input.dataset.field = key;
    input.setAttribute("role", "switch");
    input.setAttribute("aria-label", label);
    const output = element("output", "yms-sr");
    output.dataset.value = key;
    row.append(copy, input, output);
    parent.append(row);
    fields.set(key, { input, output, row, disabledWhen });
  }
  function slider(parent, key, label, min, max, step, left, right, suffix, disabledWhen = () => false) {
    const row = element("div", "yms-range");
    const heading = element("div", "yms-range-heading");
    const input = element("input");
    input.type = "range";
    input.id = `${id}-${key}`;
    input.dataset.field = key;
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    const text = element("label", "", label);
    text.htmlFor = input.id;
    const output = element("output");
    output.htmlFor = input.id;
    output.dataset.value = key;
    heading.append(text, output);
    const scale = element("div", "yms-scale");
    scale.setAttribute("aria-hidden", "true");
    scale.append(element("span", "", left), element("span", "", right));
    row.append(heading, input, scale);
    parent.append(row);
    fields.set(key, { input, output, row, disabledWhen, suffix });
  }
  const welcomeMain = element("div", "yms-fields");
  toggle(welcomeMain, "welcomeMotion", "\u6B22\u8FCE\u52A8\u753B", "\u63A7\u5236\u573A\u666F\u5C55\u5F00\u3001\u70DF\u82B1\u3001\u98D8\u5E26\u4E0E\u6E38\u9C7C\u3002");
  toggle(welcomeMain, "entrance", "\u81EA\u52A8\u6B22\u8FCE", "\u6253\u5F00\u5E94\u7528\u65F6\u663E\u793A\u6B22\u8FCE\u573A\u666F\u3002");
  const welcomeDetails = element("div", "yms-subfields");
  toggle(welcomeDetails, "fireworks", "\u70DF\u82B1\u7EFD\u653E", "", (p) => !p.welcomeMotion);
  if (show("ribbonMotion")) toggle(welcomeDetails, "ribbonMotion", "\u98D8\u5E26\u968F\u98CE", "", (p) => !p.welcomeMotion);
  toggle(welcomeDetails, "riverMotion", "\u6E38\u9C7C\u8DC3\u6C34", "", (p) => !p.welcomeMotion);
  const welcomeRanges = element("div");
  welcomeRanges.append(element("p", "yms-duration-note", "\u4EAE\u5EA6\u3001\u5E45\u5EA6\u4E0E\u901F\u5EA6\u7684 50% \u4E3A\u539F\u7248\u6548\u679C\uFF0C100% \u4E3A\u53CC\u500D\uFF1B0% \u4FDD\u6301\u9759\u6B62\u6216\u7184\u706D\u3002"));
  slider(welcomeRanges, "fireworkIntensity", "\u70DF\u82B1\u4EAE\u5EA6", 0, 100, 0.5, "\u7184\u706D", "\u589E\u5F3A", "%", (p) => !p.welcomeMotion || !p.fireworks);
  if (show("handAmplitude")) slider(welcomeRanges, "handAmplitude", "\u6325\u624B\u5E45\u5EA6", 0, 100, 1, "\u9759\u6B62", "\u660E\u663E", "%", (p) => !p.welcomeMotion);
  if (show("handSpeed")) slider(welcomeRanges, "handSpeed", "\u6325\u624B\u901F\u5EA6", 0, 100, 1, "\u9759\u6B62", "\u8F7B\u5FEB", "%", (p) => !p.welcomeMotion || p.handAmplitude === 0);
  if (show("ribbonAmplitude")) slider(welcomeRanges, "ribbonAmplitude", "\u5DE6\u4FA7\u98D8\u5E26\u6446\u5E45", 0, 100, 1, "\u9759\u6B62", "\u660E\u663E", "%", (p) => !p.welcomeMotion || !p.ribbonMotion);
  if (show("ribbonSpeed")) slider(welcomeRanges, "ribbonSpeed", "\u5DE6\u4FA7\u98D8\u5E26\u901F\u5EA6", 0, 100, 1, "\u9759\u6B62", "\u8F7B\u5FEB", "%", (p) => !p.welcomeMotion || !p.ribbonMotion || p.ribbonAmplitude === 0);
  slider(welcomeRanges, "fishCount", "\u6E38\u9C7C\u6570\u91CF", 2, 3, 1, "\u4E24\u6761", "\u4E09\u6761", " \u6761");
  slider(welcomeRanges, "riverAmplitude", "\u6E38\u9C7C\u8DC3\u8D77\u5E45\u5EA6", 0, 100, 1, "\u9759\u6B62", "\u660E\u663E", "%", (p) => !p.welcomeMotion || !p.riverMotion);
  slider(welcomeRanges, "riverSpeed", "\u6E38\u9C7C\u901F\u5EA6", 0, 100, 1, "\u9759\u6B62", "\u8F7B\u5FEB", "%", (p) => !p.welcomeMotion || !p.riverMotion || p.riverAmplitude === 0);
  slider(welcomeRanges, "duration", "\u5C55\u5F00\u65F6\u957F", 1.5, 5, 0.1, "\u5229\u843D", "\u4ECE\u5BB9", " \u79D2", (p) => !p.welcomeMotion);
  welcome.append(
    welcomeMain,
    welcomeDetails,
    welcomeRanges,
    element("p", "yms-duration-note", "\u5C55\u5F00\u65F6\u957F\u4E0D\u5305\u542B\u505C\u7559\u4E0E 2.2 \u79D2\u6C34\u6CE2\u9000\u573A\u3002")
  );
  if (!welcomeOnly) {
    wallpaper.append(element("p", "yms-work-note", "\u8FDB\u5165\u5DE5\u4F5C\u53F0\u540E\u7684\u73AF\u5883\u5149\u5F71\uFF0C\u8C03\u6574\u5373\u65F6\u751F\u6548\u3002"));
    const workFields = element("div", "yms-fields");
    toggle(workFields, "motion", "\u73AF\u5883\u52A8\u6001", "\u5173\u95ED\u540E\u4FDD\u6301\u9759\u6B62\uFF0C\u4ECD\u53EF\u8C03\u6574\u4EAE\u5EA6\u4E0E\u6696\u8272\u5915\u7167\u3002");
    slider(workFields, "intensity", "\u73AF\u5883\u5149\u4EAE\u5EA6", 0, 100, 1, "\u67D4\u548C", "\u660E\u4EAE", "%");
    slider(workFields, "speed", "\u8FD0\u52A8\u901F\u5EA6", 10, 100, 1, "\u8212\u7F13", "\u6D3B\u8DC3", "%", (p) => !p.motion);
    slider(workFields, "sunset", "\u6696\u8272\u5915\u7167", 0, 100, 1, "\u5173\u95ED", "\u6E29\u6696", "%");
    wallpaper.append(workFields);
  }
  const actions = element("div", "yms-actions");
  const replay = element("button", "yms-primary", welcomeOnly ? "\u91CD\u64AD\u52A8\u753B" : "\u9884\u89C8\u6B22\u8FCE\u573A\u666F");
  replay.type = "button";
  replay.dataset.replay = "";
  const reset = element("button", "yms-reset", "\u6062\u590D\u9ED8\u8BA4");
  reset.type = "button";
  reset.dataset.reset = "";
  actions.append(replay, reset);
  const status = element("p", "yms-status");
  status.setAttribute("role", "status");
  const error = element("p", "yms-error");
  error.setAttribute("role", "alert");
  error.hidden = true;
  const reduced = element("p", "yms-reduced", "\u7CFB\u7EDF\u5DF2\u5F00\u542F\u201C\u51CF\u5C11\u52A8\u6001\u6548\u679C\u201D\uFF0C\u5F53\u524D\u4FDD\u7559\u9759\u6001\u753B\u9762\u3002");
  reduced.hidden = true;
  section.append(
    actions,
    status,
    error,
    reduced,
    element("p", "yms-note", welcomeOnly ? "\u8BBE\u7F6E\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u4E8E\u4E0B\u6B21\u9884\u89C8\u751F\u6548\u3002" : "\u8BBE\u7F6E\u4FDD\u5B58\u5728\u672C\u673A\u3002\u6B22\u8FCE\u573A\u666F\u7684\u8C03\u6574\u4E8E\u4E0B\u6B21\u9884\u89C8\u751F\u6548\uFF1B\u5DE5\u4F5C\u58C1\u7EB8\u5373\u65F6\u751F\u6548\u3002")
  );
  container.append(section);
  let disposed = false, activeTab = "welcome", saveSequence = 0;
  let off = null;
  function showError(message = "") {
    if (disposed) return;
    error.textContent = message;
    error.hidden = !message;
  }
  function read() {
    try {
      const rawStatus = controller.getStatus();
      const state = rawStatus && typeof rawStatus === "object" ? rawStatus : { message: String(rawStatus || "") };
      return { preferences: normalizeMotion(controller.getPreferences()), state, canReplay: controller.canReplay() === true };
    } catch {
      return { preferences: MOTION_DEFAULTS, state: { message: "\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u573A\u666F\u72B6\u6001\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002", active: false }, canReplay: false };
    }
  }
  function refresh() {
    if (disposed) return;
    const { preferences, state, canReplay } = read();
    const inactive = state.active === false;
    for (const [key, field] of fields) {
      const value = preferences[key];
      field.input.disabled = inactive || field.disabledWhen(preferences);
      field.row.dataset.disabled = String(field.input.disabled);
      if (field.input.type === "checkbox") {
        field.input.checked = value;
        field.input.setAttribute("aria-checked", String(value));
        field.output.textContent = value ? "\u5DF2\u5F00\u542F" : "\u5DF2\u5173\u95ED";
      } else {
        field.input.value = String(value);
        const formatted = `${key === "duration" ? value.toFixed(1) : value}${field.suffix}`;
        field.output.textContent = formatted;
        field.input.setAttribute("aria-valuetext", formatted);
      }
    }
    const selected = WELCOME_PRESETS.find((preset) => Object.entries(preset.values).every(([key, value]) => preferences[key] === value));
    presetState.textContent = selected ? `\u5DF2\u9009 \xB7 ${selected.label}` : "\u81EA\u5B9A\u4E49";
    for (const [key, button] of presetButtons) {
      button.disabled = inactive;
      button.setAttribute("aria-pressed", String(selected?.id === key));
    }
    replay.disabled = !canReplay;
    reset.disabled = inactive;
    status.textContent = String(state.message || "");
    reduced.hidden = !state.reducedMotion;
  }
  function save(patch) {
    if (disposed) return;
    const thisSave = ++saveSequence;
    showError();
    try {
      const result = controller.save(patch);
      refresh();
      if (result && typeof result.then === "function") Promise.resolve(result).then(() => {
        if (!disposed && thisSave === saveSequence) refresh();
      }, () => {
        if (!disposed && thisSave === saveSequence) {
          showError("\u8BBE\u7F6E\u672A\u80FD\u4FDD\u5B58\uFF0C\u8BF7\u91CD\u8BD5\u3002");
          refresh();
        }
      });
    } catch {
      showError("\u8BBE\u7F6E\u672A\u80FD\u4FDD\u5B58\uFF0C\u8BF7\u91CD\u8BD5\u3002");
      refresh();
    }
  }
  function selectTab(key, focus = false) {
    activeTab = key;
    for (const [name2, button] of tabButtons) {
      const selected = name2 === key;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      panels.get(name2).hidden = !selected;
    }
    if (focus) tabButtons.get(key)?.focus();
  }
  function onTabKey(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "welcome" : event.key === "End" ? "wallpaper" : activeTab === "welcome" ? "wallpaper" : "welcome";
    selectTab(next, true);
  }
  tabs.addEventListener("keydown", onTabKey);
  for (const [key, button] of tabButtons) button.addEventListener("click", () => selectTab(key));
  for (const [key, field] of fields) field.input.addEventListener("input", () => {
    if (!field.input.disabled) save({ [key]: field.input.type === "checkbox" ? field.input.checked : Number(field.input.value) });
  });
  for (const preset of WELCOME_PRESETS) presetButtons.get(preset.id).addEventListener("click", () => save({ ...preset.values }));
  reset.addEventListener("click", () => save(normalizeMotion(controller.defaultPreferences ?? MOTION_DEFAULTS)));
  replay.addEventListener("click", () => {
    showError();
    const failed = () => {
      showError("\u6682\u65F6\u65E0\u6CD5\u9884\u89C8\u6B22\u8FCE\u573A\u666F\uFF0C\u8BF7\u67E5\u770B\u5F53\u524D\u72B6\u6001\u540E\u91CD\u8BD5\u3002");
      refresh();
    };
    try {
      const result = controller.replay();
      if (result && typeof result.then === "function") Promise.resolve(result).then((value) => {
        if (value === false) failed();
        else refresh();
      }, failed);
      else if (result === false) failed();
      else refresh();
    } catch {
      failed();
    }
  });
  selectTab("welcome");
  refresh();
  try {
    off = controller.subscribe(refresh);
  } catch {
    showError("\u72B6\u6001\u66F4\u65B0\u6682\u65F6\u4E0D\u53EF\u7528\uFF0C\u53EF\u5173\u95ED\u540E\u91CD\u65B0\u6253\u5F00\u8BBE\u7F6E\u3002");
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    if (typeof off === "function") off();
    section.remove();
  }
  return { refresh, dispose };
}

// lib/client/controller.mjs
var STORAGE_KEY = "dsh.entrance-heavenstep.preferences.v2";
function focusedElement() {
  let element = document.activeElement;
  while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement;
  return element;
}
function mountEntrance({ autoStart = true } = {}) {
  if (document.querySelector("[data-dsh-entrance-heavenstep-controller],[data-dsh-entrance-controller]")) return null;
  const anchor = document.createElement("div");
  anchor.dataset.dshEntranceHeavenstepController = "";
  const root = anchor.attachShadow({ mode: "open" });
  root.innerHTML = `<style>
  :host{all:initial;color-scheme:dark;font:14px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif}
  .tools{position:fixed;right:18px;top:80px;z-index:2147483400}
  .settings-trigger{display:flex;align-items:center;gap:8px;min-height:44px;padding:10px 16px;border:1px solid var(--dsw-alias-border-l2,#ffffff12);border-radius:999px;background:var(--dsw-alias-bg-layer-2,#25262a);color:var(--dsw-alias-label-secondary,#c3c6ce);font:500 13px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;cursor:pointer;white-space:nowrap;transition:background-color .15s ease,border-color .15s ease}
  .settings-trigger svg{width:17px;height:17px;flex:none;color:var(--dsw-alias-label-tertiary,#aab0bf)}
  .settings-trigger:hover,.settings-trigger[aria-expanded=true]{background:var(--dsw-alias-bg-layer-3,#303238);border-color:var(--dsw-alias-border-l3,#ffffff24)}
  .settings-trigger:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary,#aab0bf);outline-offset:3px}
  .panel{position:fixed;right:18px;top:136px;width:410px;max-width:calc(100vw - 24px);height:min(800px,calc(100dvh - 152px));overflow:hidden;border:1px solid #a88b5d;border-radius:18px;background:#102731;box-shadow:0 20px 70px #0008;z-index:2147483401}
  [hidden]{display:none!important}
  @media(max-width:540px),(max-height:650px){.tools{top:64px;right:12px}.panel{top:120px;right:12px;height:calc(100dvh - 132px)}}
  @media(prefers-reduced-motion:reduce){.settings-trigger{transition:none}}
  </style><div class="tools"><button class="settings-trigger" type="button" data-open aria-expanded="false" aria-controls="dsh-entrance-heavenstep-settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 6h7m4 0h5M4 12h2m4 0h10M4 18h10m4 0h2M11 3v6M6 9v6M14 15v6"/></svg><span>\u52A8\u753B\u8BBE\u7F6E</span></button></div><section id="dsh-entrance-heavenstep-settings" class="panel" role="region" aria-label="\u52A8\u753B\u8BBE\u7F6E" hidden></section>`;
  document.body.append(anchor);
  const panel = root.querySelector(".panel");
  const settingsButton = root.querySelector("[data-open]");
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = /* @__PURE__ */ new Set(), pointers = /* @__PURE__ */ new Set(), keys = /* @__PURE__ */ new Set();
  let preferences = { ...MOTION_DEFAULTS }, storageError = false;
  try {
    preferences = normalizeMotion(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
  } catch {
    storageError = true;
  }
  let intro = null, scene = null, restoreFocus = null, panelFocus = null, disposed = false, exitReady = false, releaseTimer = null, startupTimer = null;
  let startupCancelled = false, startupResolved = false;
  const emit = () => listeners.forEach((listener) => listener());
  function stop() {
    const focus = intro && (document.activeElement === intro || document.activeElement === document.body) ? restoreFocus : null;
    scene?.dispose();
    scene = null;
    intro?.remove();
    intro = null;
    restoreFocus = null;
    exitReady = false;
    pointers.clear();
    clearTimeout(releaseTimer);
    releaseTimer = null;
    if (focus?.isConnected) focus.focus({ preventScroll: true });
    emit();
  }
  function closeSettings({ returnFocus = true } = {}) {
    if (panel.hidden) return;
    panel.hidden = true;
    settingsButton.setAttribute("aria-expanded", "false");
    if (returnFocus && panelFocus?.isConnected) panelFocus.focus({ preventScroll: true });
    panelFocus = null;
  }
  function replay() {
    startupCancelled = true;
    if (disposed || document.hidden) return false;
    if (document.querySelector("[data-yoimiya-entrance],[data-dsh-entrance]")) return false;
    const fromSettings = !panel.hidden;
    stop();
    closeSettings({ returnFocus: false });
    restoreFocus = fromSettings ? settingsButton : focusedElement();
    intro = document.createElement("div");
    intro.dataset.dshEntranceHeavenstep = "";
    intro.tabIndex = -1;
    intro.setAttribute("role", "dialog");
    intro.setAttribute("aria-modal", "true");
    intro.setAttribute("aria-label", "\u6B22\u8FCE\u573A\u666F\uFF0C\u70B9\u51FB\u6216\u6309\u4EFB\u610F\u952E\u8FDB\u5165\u5DE5\u4F5C\u53F0");
    document.body.append(intro);
    scene = mountWelcomeScene(intro.attachShadow({ mode: "open" }), {
      ...preferences,
      motion: preferences.welcomeMotion && !media.matches,
      fireworksEnabled: preferences.fireworks,
      onFailure: () => {
        stop();
        emit();
      }
    });
    intro.focus({ preventScroll: true });
    emit();
    return true;
  }
  function dismiss(point) {
    if (!intro || intro.hasAttribute("data-exiting")) return;
    intro.dataset.exiting = "";
    if (media.matches || !preferences.welcomeMotion) {
      intro.style.opacity = "0";
      exitReady = true;
      if (!pointers.size) releaseTimer = setTimeout(stop, 0);
      return;
    }
    scene.dismiss(point, () => {
      exitReady = true;
      if (!pointers.size) stop();
    });
  }
  function openSettings() {
    startupCancelled = true;
    stop();
    if (panel.hidden) panelFocus = focusedElement();
    panel.hidden = false;
    settingsButton.setAttribute("aria-expanded", "true");
    root.querySelector("[data-close]")?.focus({ preventScroll: true });
  }
  function save(patch) {
    preferences = normalizeMotion({ ...preferences, ...patch });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      storageError = false;
    } catch {
      storageError = true;
    }
    stop();
    emit();
  }
  const onKey = (event) => {
    startupCancelled = true;
    if (intro || keys.has(event.code || event.key)) {
      keys.add(event.code || event.key);
      dismiss();
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (event.altKey && event.shiftKey && event.code === "KeyW") {
      event.preventDefault();
      event.stopImmediatePropagation();
      panel.hidden ? openSettings() : closeSettings();
    }
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeSettings();
    }
  };
  const onKeyUp = (event) => {
    const consumed = keys.delete(event.code || event.key);
    if (intro || consumed) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const onDown = (event) => {
    startupCancelled = true;
    if (intro) {
      pointers.add(event.pointerId);
      dismiss({ x: event.clientX, y: event.clientY });
      event.preventDefault();
      event.stopImmediatePropagation();
    } else if (!panel.hidden && !event.composedPath().includes(anchor)) closeSettings();
  };
  const onUp = (event) => {
    const consumed = pointers.delete(event.pointerId);
    if (!intro && !consumed) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (exitReady && !pointers.size) releaseTimer = setTimeout(stop, 0);
  };
  const onClick = (event) => {
    if (intro) {
      dismiss(event.detail ? { x: event.clientX, y: event.clientY } : void 0);
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const onWheel = (event) => {
    startupCancelled = true;
    if (intro) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const interrupted = () => {
    keys.clear();
    pointers.clear();
    if (intro?.hasAttribute("data-exiting")) stop();
  };
  const onVisibility = () => {
    if (document.hidden) interrupted();
    scene?.setPaused(document.hidden);
    emit();
    if (!document.hidden) tryStartup();
  };
  const onMotion = () => {
    if (intro?.hasAttribute("data-exiting")) stop();
    else scene?.setMotion(preferences.welcomeMotion && !media.matches);
    emit();
  };
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      try {
        preferences = normalizeMotion(JSON.parse(event.newValue || "{}"));
        stop();
        emit();
      } catch {
      }
    }
  };
  const events = [["keydown", onKey], ["keyup", onKeyUp], ["pointerdown", onDown], ["pointerup", onUp], ["pointercancel", onUp], ["click", onClick], ["wheel", onWheel]];
  events.forEach(([type, handler]) => document.addEventListener(type, handler, { capture: true, passive: false }));
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("blur", interrupted);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onMotion);
  settingsButton.addEventListener("click", () => panel.hidden ? openSettings() : closeSettings());
  document.addEventListener("dsh-entrance-heavenstep:replay", replay);
  document.addEventListener("dsh-entrance-heavenstep:settings", openSettings);
  const controller = {
    defaultPreferences: MOTION_DEFAULTS,
    getPreferences: () => preferences,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    save,
    replay,
    canReplay: () => !disposed && !document.hidden && !document.querySelector("[data-yoimiya-entrance],[data-dsh-entrance]"),
    getStatus: () => ({ active: !disposed, sceneActive: Boolean(intro), message: storageError ? "\u672C\u673A\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u8BBE\u7F6E\u4EC5\u5728\u672C\u6B21\u4F1A\u8BDD\u751F\u6548\u3002" : media.matches ? "\u7CFB\u7EDF\u51CF\u5C11\u52A8\u6001\u5DF2\u5F00\u542F\uFF1B\u5F53\u524D\u4FDD\u7559\u9759\u6001\u753B\u9762\u3002" : "50% \u5BF9\u5E94\u539F\u6709\u6548\u679C\uFF0C\u8BBE\u7F6E\u5728\u4E0B\u6B21\u91CD\u64AD\u65F6\u751F\u6548\u3002" }),
    dispose() {
      if (disposed) return;
      disposed = true;
      clearTimeout(startupTimer);
      stop();
      view.dispose();
      anchor.remove();
      listeners.clear();
      keys.clear();
      events.forEach(([type, handler]) => document.removeEventListener(type, handler, true));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", interrupted);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("dsh-entrance-heavenstep:replay", replay);
      document.removeEventListener("dsh-entrance-heavenstep:settings", openSettings);
      media.removeEventListener("change", onMotion);
    }
  };
  const view = mountMotionSettings(panel, controller, {
    compact: true,
    welcomeOnly: true,
    onClose: closeSettings,
    // This piece is a static full-scene hero: no waving hand and no ribbon.
    supported: ["welcomeMotion", "entrance", "fireworks", "riverMotion", "fireworkIntensity", "fishCount", "riverAmplitude", "riverSpeed", "duration"]
  });
  function tryStartup() {
    if (!autoStart || disposed || startupCancelled || startupResolved || document.hidden) return;
    startupResolved = true;
    if (!preferences.entrance || document.querySelector('[data-yoimiya-controller],[data-dsh-entrance-controller],[role="dialog"],dialog[open]')) return;
    replay();
  }
  prepareWelcomeAssets().then(() => {
    startupTimer = setTimeout(tryStartup, 0);
  }).catch(() => {
  });
  return controller;
}

// lib/client/index.mjs
var name = "dsh-entrance-heavenstep";
var inject = ["slots"];
function apply(ctx) {
  const controller = mountEntrance();
  if (!controller) return () => {
  };
  let off;
  function Settings() {
    const ref = import_react.default.useRef(null);
    import_react.default.useEffect(() => {
      const view = mountMotionSettings(ref.current, controller, { welcomeOnly: true, supported: ["welcomeMotion", "entrance", "fireworks", "riverMotion", "fireworkIntensity", "fishCount", "riverAmplitude", "riverSpeed", "duration"] });
      return () => view.dispose();
    }, []);
    return import_react.default.createElement("div", { ref });
  }
  try {
    const slots = ctx.slots;
    if (slots?.inject && slots?.register) off = slots.inject("settings.section", () => slots.register({ name: "settings.section", id: "dsh-entrance-heavenstep", label: () => "\u5165\u573A\u52A8\u753B", order: 125 }, Settings));
  } catch (error) {
    console.warn("[dsh-entrance-heavenstep] Settings slot unavailable; use the floating button", error);
  }
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (typeof off === "function") off();
    controller.dispose();
  };
  if (typeof ctx.effect === "function") ctx.effect(() => dispose, "dsh-entrance-heavenstep.client");
  return dispose;
}

    return module.exports;
  }
});
