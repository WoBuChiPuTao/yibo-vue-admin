const html = document.documentElement

export function getCssVar(name: string) {
  return getComputedStyle(html).getPropertyValue(name)?.trim()
}

export function setCssVar(name: string, value: string, priority?: string) {
  html.style.setProperty(name, value, priority)
}
