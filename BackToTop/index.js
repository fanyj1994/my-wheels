class BackToTop {
  constructor(options) {
    this.defaultOptions = {
      element: null,
      speed: 100,
      showPosition: 500
    }
    this.options = Object.assign({}, this.defaultOptions, options)

    if (!this.options.element) {
      throw new Error('element is required.')
    } else {
      this.element = typeof this.options.element === 'string' 
        ? document.querySelector(this.options.element) 
        : this.options.element
    }

    // Object.assign polyfill
    if (typeof Object.assign != 'function') {
      Object.defineProperty(Object, 'assign', {
        value: function assign(target, varArgs) {
          'use strict';
          if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }
    
          let to = Object(target)
    
          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index]
    
            if (nextSource != null) {
              for (let nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to
        },
        writable: true,
        configurable: true
      })
    }

    this.init()
  }

  init() {
    this.eventsBind()
  }

  eventsBind() {
    this.hideButton()
    this.pageScrollHandler()
    this.clickToTopHandler()
  }

  hideButton() {
    this._setOpacity(this.element, 0)
  }

  pageScrollHandler() {
    const self = this
    this._on(window, 'scroll', function() {
      const currentOpacity = parseInt(self.element.style.opacity) * 100
      if (self._getDistanceToTop() > self.options.showPosition) {
        if (currentOpacity === 0) {
          self._fadeIn()
        }
      } else {
        if (currentOpacity === 100) {
          self._fadeOut()
        }
      }
    })
  }

  clickToTopHandler() {
    const self = this
    self._on(self.element, 'click', self.backToTop.bind(self))
  }

  backToTop() {
    const self = this
    let timer = null
    cancelAnimationFrame(timer)

    function goTop() {
      const currentTop = self._getDistanceToTop()
      document.documentElement.scrollTop = document.body.scrollTop = currentTop - self.options.speed
      if (currentTop > 0) {
        timer = requestAnimationFrame(goTop)
      } else {
        cancelAnimationFrame(timer)
      }
    }
    timer = requestAnimationFrame(goTop)
  }

  _setOpacity(ele, opacity) {
    ele.style.setProperty('opacity', opacity / 100)
    ele.style.setProperty('filter', 'alpha(opacity=' + opacity + ')')
  }

  _fadeIn() {
    let timer = null
    let opacity = 0
    const self = this
    cancelAnimationFrame(timer)
    function changeOpacity() {
      opacity = opacity + 10
      self._setOpacity(self.element, opacity)
      if (opacity < 100) {
        timer = requestAnimationFrame(changeOpacity)
      } else {
        cancelAnimationFrame(timer)
      }
    }
    timer = requestAnimationFrame(changeOpacity)
  }

  _fadeOut() {
    let opacity = 100
    let timer = null
    const self = this
    cancelAnimationFrame(timer)
    function changeOpacity() {
      opacity = opacity - 20
      self._setOpacity(self.element, opacity)
      if (opacity > 0) {
        timer = requestAnimationFrame(changeOpacity)
      } else {
        cancelAnimationFrame(timer)
      }
    }
    timer = requestAnimationFrame(changeOpacity)
  }

  _getDistanceToTop() {
    return window.pageYOffset
      || document.documentElement.offsetTop
      || document.body.offsetTop
      || 0
  }

  _on(ele, type, fn) {
    if (document.addEventListener) {
      ele.addEventListener(type, fn, false)
    } else if (document.attachEvent) {
      ele.attachEvent('on' + type, fn)
    } else {
      ele['on' + type] = fn
    }
  }
}
