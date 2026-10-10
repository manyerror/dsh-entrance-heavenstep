// Cool-toned bottom wave band. It sits under the hero scene and shares the
// scene's entrance clock; the palette is re-tinted to the water/ice theme and
// carries a thin gold accent to echo the artwork's streaks.
function waveRings(x, y, radius, rings, spacing, depth, fill, opacity) {
  const arcs = Array.from({ length: rings }, (_, index) => {
    const r = radius - index * spacing
    return `M${-r} 0A${r} ${r} 0 0 1 ${r} 0`
  }).join('')
  return `<g class="wave-ring-group" transform="translate(${x} ${y}) scale(1 ${depth})"><path d="M${-radius} 0A${radius} ${radius} 0 0 1 ${radius} 0Z" fill="${fill}" stroke="none"/><path d="${arcs}" stroke-opacity="${opacity}"/></g>`
}

export const welcomeWaveMarkup = `<svg class="svg-all" viewBox="0 0 1600 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
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
    ${waveRings(40, 187, 117, 9, 12, .92, '#0f2c3a', .42)}
    ${waveRings(431, 245, 96, 8, 11, 1.05, '#0e2b38', .36)}
    ${waveRings(597, 221, 108, 9, 12, .87, '#102d3b', .46)}
    ${waveRings(1414, 219, 124, 10, 12, .92, '#0e2b38', .43)}
  </g>
  <path d="M0 39C137 60 199 207 367 183C530 160 512 100 685 145C826 182 921 216 1084 156C1276 85 1423 84 1600 133" stroke="url(#welcomeWaveGold)" stroke-width="2"/>
  <path d="M0 144C154 43 246 231 439 216C650 199 743 135 923 111C1131 81 1290 204 1461 171C1520 161 1564 139 1600 140V300H0Z" fill="url(#welcomeWaveMiddle)"/>
  <g clip-path="url(#welcomeWaveMiddleClip)" stroke="#bfe2ea" stroke-width="1.3">
    ${waveRings(47, 249, 123, 10, 12, .95, '#0d2936', .6)}
    ${waveRings(251, 295, 133, 10, 13, .97, '#0d2834', .5)}
    ${waveRings(811, 250, 123, 10, 12, .96, '#0d2936', .54)}
    ${waveRings(1097, 282, 127, 10, 12, .94, '#0d2834', .48)}
    ${waveRings(1474, 271, 137, 11, 12, .96, '#0d2936', .6)}
  </g>
  <path d="M0 144C154 43 246 231 439 216C650 199 743 135 923 111C1131 81 1290 204 1461 171C1520 161 1564 139 1600 140" stroke="url(#welcomeWaveGold)" stroke-width="2.2"/>
  <path d="M0 242C168 203 207 283 385 244C528 213 612 167 758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258V300H0Z" fill="url(#welcomeWaveFront)"/>
  <g clip-path="url(#welcomeWaveFrontClip)" stroke="#bfe2ea" stroke-width="1.45">
    ${waveRings(64, 330, 109, 9, 12, .97, '#0c2631', .7)}
    ${waveRings(252, 342, 134, 11, 12, .95, '#0b242e', .6)}
    ${waveRings(453, 324, 98, 8, 12, 1.02, '#0c2631', .66)}
    ${waveRings(651, 332, 141, 11, 13, .98, '#0b242e', .62)}
    ${waveRings(927, 345, 114, 9, 12, .96, '#0c2631', .55)}
    ${waveRings(1202, 342, 126, 10, 12, .98, '#0b242e', .64)}
    ${waveRings(1480, 327, 111, 9, 12, 1.02, '#0c2631', .7)}
  </g>
  <path d="M0 242C168 203 207 283 385 244C528 213 612 167 758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258" stroke="url(#welcomeWaveGold)" stroke-width="1.8"/>
  <path d="M758 189C951 218 1008 307 1182 267C1332 232 1400 219 1600 258C1405 213 1331 246 1183 278C1012 317 949 220 758 189Z" fill="url(#welcomeWaveGold)" opacity=".5"/>
</svg>`
