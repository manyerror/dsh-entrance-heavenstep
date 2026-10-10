import { ASSETS_PATH } from '../src/routes.mjs'
import { mountWelcomeCharacter } from './welcome-character.mjs'
import { createWelcomeWater, welcomeWaterWaves } from './welcome-water.mjs'
import { createWelcomeFireworks } from './welcome-fireworks.mjs'
import { welcomeWaveMarkup } from './welcome-ornaments.mjs'
import { mountWelcomeRiver } from './welcome-river.mjs'

const ASSET_BASE = `${ASSETS_PATH}/entrance/20261010`
const HERO_URL = `${ASSET_BASE}/hero.jpg`
const WATER_MS = 2200
const assetLoads = new Map()
function decodeAsset(url) {
  if (!assetLoads.has(url)) {
    const image = new Image()
    image.decoding = 'async'
    const loaded = new Promise((resolve, reject) => {
      image.onload = resolve; image.onerror = reject; image.src = url
    }).then(async () => { if (image.decode) await image.decode(); return image })
    assetLoads.set(url, loaded)
    loaded.catch(() => { if (assetLoads.get(url) === loaded) assetLoads.delete(url) })
  }
  return assetLoads.get(url)
}
// Start while the host wallpaper is loading; retain the decoded image for replay.
export function prepareWelcomeAssets() {
  return Promise.all([decodeAsset(HERO_URL)])
}
const clamp = v => Math.max(0, Math.min(1, v))
const smooth = v => { const t = clamp(v); return t * t * (3 - 2 * t) }
const out = v => 1 - Math.pow(1 - clamp(v), 3)
const range = (t, a, b) => clamp((t - a) / (b - a))
const lerp = (a, b, t) => a + (b - a) * t
const css = `
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
 `
 const markup = `<div class="entry">
    <div class="layer a-horizon"></div>
    <div class="hero" id="aHero"></div>
    <div class="hero-veil" id="aVeil"></div>
    <div class="wave-front" id="aWave">${welcomeWaveMarkup}</div>
    <div class="river-life" id="aRiver"></div>
    <div class="a-title" id="aTitle"><div class="kanji">水光之下<br>仍在等你</div><div class="latin">沉入涟漪，再被浮起。</div></div>
    <div class="deepseek" id="aDeepseek">DeepSeek<small>DEEPSEEK HARNESS</small></div>
  </div>`

// The scene owns its clock, asset loads and temporary workspace animations.
// The outer controller owns modal input and focus restoration.
export function mountWelcomeScene(root, {
  duration = 3.2, motion = true, fireworksEnabled = true, fireworkIntensity = 50,
  riverMotion = true, riverAmplitude = 50, riverSpeed = 50, fishCount = 3,
  onFailure = () => {},
} = {}) {
  root.innerHTML = `<style>${css}</style>${markup}`
  const entry = root.querySelector('.entry')
  entry.insertAdjacentHTML('beforeend','<div class="masthead">DEEPSEEK HARNESS</div><button class="enter" type="button" aria-label="进入工作台，点击或按任意键">点击或按键进入</button>')
  const $ = id => root.getElementById(id)
  const character = mountWelcomeCharacter($('aHero'), { imageURL: HERO_URL, alt: '水光之下的人物' })
  const heroImg = $('aHero').querySelector('img')
  heroImg.addEventListener('error', () => { heroImg.hidden = true }, { once: true })
  const fireworks = createWelcomeFireworks(entry, { intensity: fireworksEnabled ? fireworkIntensity : 0 })
  const river = mountWelcomeRiver($('aRiver'), { motion: motion && riverMotion, amplitude: riverAmplitude, speed: riverSpeed, fishCount })
  river.setPaused(true)
  const waterLayer = document.createElement('div')
  waterLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:40'
  root.append(waterLayer)
  const water = createWelcomeWater(waterLayer)
  let disposed = false, frame = null, last = null, elapsed = 0, paused = false, ready = false, exiting = false, exitElapsed = 0, finish = null
  let origin = null, workspaceAnimation = null, loadTimeout = null, warming = 0
  let bounds = root.host.getBoundingClientRect()
  const resizeObserver = new ResizeObserver(() => { bounds = root.host.getBoundingClientRect() })
  resizeObserver.observe(root.host)
  root.host.dataset.welcomePhase = 'loading'
  const transform = (id,v) => $(id).style.transform = v
  const opacity = (id,v) => $(id).style.opacity = v
  function render(t) {
    character.update(t)
    fireworks.update(motion?t:2.4,bounds.width,bounds.height)
    const scene=out(range(t,0,.7)),person=out(range(t,.48,1.38)),title=out(range(t,1.05,1.65))
    transform('aHero',`scale(${lerp(1.05,1,person)})`);opacity('aHero',person)
    opacity('aVeil',lerp(1,.82,person))
    transform('aTitle',`translateY(${lerp(14,0,title)}%) scale(${lerp(.98,1,title)})`);opacity('aTitle',title)
    opacity('aDeepseek',title)
    transform('aWave',`translateY(${lerp(90,0,scene)}%)`);opacity('aWave',scene*.55)
    transform('aRiver',`translateY(${lerp(90,0,scene)}%)`);opacity('aRiver',scene)
  }
  function renderExit(milliseconds) {
    const p=clamp(milliseconds/WATER_MS)
    const {width:w,height:h}=bounds
    const x=origin.x*w,y=origin.y*h
    const waves=welcomeWaterWaves(p,w,h,origin).filter(wave=>wave.amount>0)
    if (waves.length) {
      // Each passing crest removes another portion of the actual welcome art.
      // The same wave geometry drives the water, so no separate scene fade runs.
      const remaining=[.56,.20,0]
      const color=alpha=>`rgba(0,0,0,${alpha})`
      const stops=[`${color(remaining[waves.length-1])} 0px`]
      for(let i=waves.length-1;i>=0;i--){
        const {radius,thickness}=waves[i]
        const gap=Math.min(i>0?waves[i-1].radius-radius:Infinity,i<waves.length-1?radius-waves[i+1].radius:Infinity)
        const feather=Math.min(thickness*1.7, radius*.75, gap*.4)
        stops.push(`${color(remaining[i])} ${Math.max(0,radius-feather)}px`,`${color(i?remaining[i-1]:1)} ${radius+feather}px`)
      }
      const mask=`radial-gradient(circle at ${x}px ${y}px, ${stops.join(',')})`
      entry.style.maskImage=mask;entry.style.webkitMaskImage=mask
    }
    water.update(p,{...origin,normalized:true})
    if(p>=1){entry.style.display='none';workspaceAnimation?.cancel();workspaceAnimation=null}
  }
  function tick(now) {
    frame=null
    if(disposed||paused||!ready)return
    if (warming && !exiting) {
      // Nonzero opacity paints the actual masked layers before their clocks run.
      if (--warming) { frame=requestAnimationFrame(tick);return }
      render(motion?0:2.4);entry.style.opacity='1';root.host.style.background=''
      root.host.dataset.welcomePhase='entering';river.setPaused(paused);last=null
    }
    const dt=last===null?0:Math.max(0,now-last);last=now
    if(exiting){
      exitElapsed+=dt;renderExit(exitElapsed)
      if(disposed)return
      if(exitElapsed>=WATER_MS){const done=finish;finish=null;done?.();return}
    }else{
      elapsed+=dt;render(motion?Math.min(2.4,elapsed/1000*2.4/duration):2.4)
      if(!motion||elapsed>=duration*1000){root.host.dataset.welcomePhase='settled';return}
    }
    frame=requestAnimationFrame(tick)
  }
  const schedule=()=>{if(!disposed&&!paused&&ready&&frame===null){last=null;frame=requestAnimationFrame(tick)}}
  render(motion?0:2.4)
  // Base hero failure releases the modal.
  loadTimeout = setTimeout(() => { if(!disposed&&!ready)onFailure() }, 8000)
  prepareWelcomeAssets().then(()=>{
    clearTimeout(loadTimeout);if(disposed||exiting)return
    ready=true
    if(motion){
      root.host.style.background='#0c1b24';entry.style.opacity='.01'
      render(2.4);character.update(1.5);fireworks.update(1.3,bounds.width,bounds.height);warming=3;root.host.dataset.welcomePhase='preparing'
    }else render(2.4)
    schedule()
  }).catch(()=>{clearTimeout(loadTimeout);if(!disposed&&!exiting)onFailure()})
  return {
    setPaused(value){paused=value;river.setPaused(value||!ready||Boolean(warming));if(paused){if(frame!==null)cancelAnimationFrame(frame);frame=null;last=null;workspaceAnimation?.pause()}else{workspaceAnimation?.play();if(exiting||elapsed<duration*1000&&motion)schedule()}},
    setMotion(value){motion=value;river.setMotion(value&&riverMotion);river.setPaused(paused||!ready||Boolean(warming));if(!motion&&!exiting){if(frame!==null)cancelAnimationFrame(frame);frame=null;warming=0;entry.style.opacity='1';root.host.style.background='';elapsed=duration*1000;render(2.4);root.host.dataset.welcomePhase='settled'}},
    dismiss(point,onComplete){
      if(disposed||exiting)return
      exiting=true;river.freeze();finish=onComplete;ready=true;warming=0
      clearTimeout(loadTimeout);root.host.style.background='';entry.style.opacity='1'
      root.host.dataset.welcomePhase='revealing'
      const r=root.host.getBoundingClientRect()
      bounds=r
      origin={x:clamp(point?(point.x-r.left)/r.width:.5),y:clamp(point?(point.y-r.top)/r.height:.5)}
      root.host.dataset.waterOrigin=`${origin.x.toFixed(4)},${origin.y.toFixed(4)}`
      const workspace=document.getElementById('root')
      if(workspace&&!workspace.contains(root.host))workspaceAnimation=workspace.animate([{translate:'0 22px'},{translate:'0 0'}],{duration:WATER_MS,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'})
      renderExit(0);schedule()
    },
    dispose(){disposed=true;clearTimeout(loadTimeout);resizeObserver.disconnect();if(frame!==null)cancelAnimationFrame(frame);workspaceAnimation?.cancel();character.dispose();fireworks.dispose();river.dispose();water.dispose();finish=null},
  }
}
