// Static full-scene hero. The provided artwork is a complete landscape scene
// (subject + water/ice environment), so it is presented at its original ratio
// as a full-bleed layer. There are no arm/hand cutouts and no blink patches for
// this piece; the scene owns the layer's entrance transform, and this module
// keeps the update(t) / dispose() contract the scene and controller rely on.
export function mountWelcomeCharacter(container, { imageURL, alt = '水光之下的人物' } = {}) {
  if (!container?.ownerDocument) throw new TypeError('A character container is required')
  if (typeof imageURL !== 'string' || !imageURL) throw new TypeError('A character image URL is required')
  const document = container.ownerDocument
  const portrait = document.createElement('div')
  portrait.setAttribute('role', 'img')
  portrait.setAttribute('aria-label', alt)
  portrait.dataset.welcomeCharacter = ''
  portrait.style.cssText = 'position:absolute;inset:0;pointer-events:none;'
  const image = document.createElement('img')
  image.src = imageURL
  image.alt = ''
  image.decoding = 'async'
  image.draggable = false
  // Bias toward the face so narrow (tall) windows keep the subject in frame.
  image.style.cssText = 'display:block;width:100%;height:100%;object-fit:cover;object-position:62% center;'
  portrait.append(image)
  const previousChildren = [...container.childNodes]
  container.replaceChildren(portrait)
  let disposed = false
  // The hero is static; the scene drives this layer's entrance via its CSS.
  function update() {}
  function dispose() {
    if (disposed) return
    disposed = true
    if (portrait.parentNode === container) portrait.replaceWith(...previousChildren)
  }
  update(0)
  return { update, dispose }
}
