// empty function

export function noob () {}

// abstract method & constructor

export function abstractMethod () {
  throw new Error('Abstract method')
}

export function AbstractConstructor () {
  throw new Error("Can't instantiate abstract classes")
}

// utilities
function extend (o, p) {
  for (let prop in p) o[prop] = p[prop]
  return o
}

function defineSubClass (superclass,
                         constructor,
                         methods,
                         statics) {
  constructor.prototype = Object.create(superclass.prototype)
  constructor.prototype.constructor = constructor
  if (methods) extend(constructor.prototype, methods)
  if (statics) extend(constructor, statics)
  return constructor
}

Function.prototype.extend = function (constructor, methods, statics) {
  return defineSubClass(this, constructor, methods, statics)
}

/*
 * desc 函数节流
 * param fn 函数
 * param wait 延迟执行毫秒数
 * param type 1 表时间戳版，2 表定时器版
 */

export function throttle (fn, wait, type) {
  let lastTime = 0,
      t = null
  return function () {
    if (type === 1) {
      let now = Date.now()
      if (now - lastTime > wait) {
        fn.apply(this, arguments)
        lastTime = now
      } 
    } else if (type === 2) {
      if (t) return
      t = setTimeout(() => {
        fn.apply(this, arguments)
        t = null
      }, wait)
    }
  }
}

/**
 * desc 函数防抖
 * param fn 函数
 * param wait 延迟执行毫秒数
 * param immediate true 表立即执行，false 表非立即执行
 */

export function debounce (fn, wait, immediate) {
  let t = null
  return function () {
    if (t) clearTimeout(t)
    if (immediate) {
      if (!t) {
        fn.apply(this, arguments)
      }
      t = setTimeout(() => t = null, wait)
    } else {
      t = setTimeout(() => {
        fn.apply(this, arguments)
        t = null
      }, wait)
    }
  }
}

export const {addEvent, removeEvent} = (function () {
  if (window.addEventListener) {
    return {
      addEvent: function (el, type, fn) {
        el.addEventListener(type, fn, false)
      },
      removeEvent: function (el, type, fn) {
        el.removeEventListener(type, fn, false)
      }
    }
  } else if (document.attachEvent) {
    return {
      addEvent: function (el, type, fn) {
        el.attachEvent('on' + type, fn)
      },
      removeEvent: function (el, type, fn) {
        el.detachEvent('on' + type, fn)
      }
    }
  } else {
    return {
      addEvent: function (el, type, fn) {
        el['on'+type] = fn
      },
      removeEvent: function (el, type, fn) {
        el['on'+type] = null
      }
    }
  }
})()

export function convertFileName(fileName) {
  // return fileName.replace(/\s\(\)\.(png|tsx)/, '')
  return fileName.replace(/(\s\(.*\))?\.(png|tsx)/, '')
}

export function toType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
// module.exports = {
//   convertFileName
// }