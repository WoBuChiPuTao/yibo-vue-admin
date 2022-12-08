export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('类名不能包含空格')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

export function addClass(el: Element, cls: string) {
  if (!el) return
  let currentClass = el.className
  const classes = (cls || '').split(' ')
  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i]
    if (!clsName) continue
    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      currentClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = currentClass
  }
}

export function removeClass(el: Element, cls: string) {
  if (!el) return
  let currentClass = el.className
  const classes = (cls || '').split(' ')
  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i]
    if (!clsName) continue
    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      currentClass = currentClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = currentClass
  }
}
