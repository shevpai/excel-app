export function parse(text = '') {
  if (text.startsWith('=')) {
    try {
      return eval(text.slice(1))
    } catch (e) {
      return
    }
  }
  return text
}

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

export function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  let hh = date.getHours()
  if (hh < 10) hh = '0' + hh

  let mn = date.getMinutes()
  if (mn < 10) mn = '0' + mn

  return `${dd}.${mm}.${yy}  ${hh}:${mn}`
}


export const clone = obj => JSON.parse(JSON.stringify(obj))


export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
 }
 

export function preventDefault(e) {
  e.preventDefault()
}