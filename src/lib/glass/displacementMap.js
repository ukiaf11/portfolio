// displacementMap.js — builds a refraction map for a rounded rectangle.
// R = x offset, G = y offset, 128 = no offset. Used by <feDisplacementMap>.
// Memoised per size so 3 identical chips share one data URL.

const cache = new Map();
const N = 128;          // samples across the bezel
const IOR = 1.5;        // glass index of refraction

// Convex "squircle" bezel (Apple-like): flat top, curve only near the rim.
const surface = (t) => Math.pow(1 - Math.pow(1 - t, 4), 0.25);

// 1-D lookup: horizontal ray shift vs. distance-from-edge (0 = rim, 1 = bezel end)
function bezelProfile(bezelPx, thicknessPx) {
  const eta = 1 / IOR;
  const out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const h = 1e-4;
    const slope = (surface(Math.min(1, t + h)) - surface(t)) / h; // dy/dt
    // outward surface normal (nx, ny) with the viewer at -y
    const len = Math.hypot(slope, 1);
    const nx = -slope / len, ny = -1 / len;
    // refract incident ray I = (0, 1) (GLSL refract)
    const cosi = ny;                       // dot(N, I)
    const k = 1 - eta * eta * (1 - cosi * cosi);
    if (k < 0) { out[i] = 0; continue; }   // total internal reflection
    const s = eta * cosi + Math.sqrt(k);
    const rx = -s * nx, ry = eta - s * ny;
    const remaining = surface(t) * bezelPx + thicknessPx;
    out[i] = ry > 1e-3 ? (rx * remaining) / ry : 0;
  }
  return out;
}

/**
 * @returns {{ href: string, w: number, h: number, scale: number }}
 */
export function getDisplacementMap(w, h, radius, bezel, thickness = 12) {
  w = Math.max(1, Math.round(w));
  h = Math.max(1, Math.round(h));
  const r = Math.min(radius, w / 2, h / 2);
  const b = Math.max(1, Math.min(bezel, Math.min(w, h) / 2));
  const key = `${w}x${h}r${r}b${b}t${thickness}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const lut = bezelProfile(b, thickness);
  let max = 0;
  for (let i = 0; i < N; i++) max = Math.max(max, Math.abs(lut[i]));
  max = max || 1;

  const data = new Uint8ClampedArray(w * h * 4);
  const hx = w / 2 - r, hy = h / 2 - r;          // inner rect half-size
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const px = x + 0.5 - w / 2, py = y + 0.5 - h / 2;
      const qx = Math.abs(px) - hx, qy = Math.abs(py) - hy;
      // signed distance to rounded-rect edge (negative inside)
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      const sdf = Math.min(Math.max(qx, qy), 0) + Math.hypot(ox, oy) - r;
      const d = -sdf;                                   // px inside the edge
      let vx = 0, vy = 0;
      if (d > 0 && d < b) {
        // outward normal of the rounded rect
        let nx, ny;
        if (qx > 0 && qy > 0) { const l = Math.hypot(qx, qy) || 1; nx = qx / l; ny = qy / l; }
        else if (qx > qy) { nx = 1; ny = 0; } else { nx = 0; ny = 1; }
        nx *= Math.sign(px) || 1; ny *= Math.sign(py) || 1;
        const mag = lut[Math.min(N - 1, Math.floor((d / b) * N))] / max; // 0..1
        // sample INWARD (convex lens): offset = -normal * mag
        vx = -nx * mag; vy = -ny * mag;
      }
      data[i]     = 128 + Math.round(vx * 127);
      data[i + 1] = 128 + Math.round(vy * 127);
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').putImageData(new ImageData(data, w, h), 0, 0);
  // feDisplacementMap offset = scale * (C - 0.5)  ->  +-scale/2, so scale = 2 * max
  const result = { href: canvas.toDataURL('image/png'), w, h, scale: 2 * max };
  if (cache.size > 24) cache.delete(cache.keys().next().value); // tiny LRU
  cache.set(key, result);
  return result;
}
