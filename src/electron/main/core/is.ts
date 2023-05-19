import process from 'process'

export function isWin() {
  return process.platform === 'win32'
}

export function isMacOS() {
  return process.platform === 'darwin'
}

export function isLinux() {
  return process.platform === 'linux'
}
