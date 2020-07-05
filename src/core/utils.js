export function capitalizeFirst(string) {
  if (typeof string !== 'string') {
    return ''
  } 
  return string.charAt(0).toUpperCase() + string.slice(1)
}

 export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(preVal, currentVal) {
  if (typeof preVal === 'object' && typeof currentVal === 'object') {
    // not working for Date, Set, Map
    return JSON.stringify(preVal) === JSON.stringify(currentVal) 
  }
  return preVal === currentVal
}

export function camelCaseToDash(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
      .join(';')
}