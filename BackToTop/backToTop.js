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
      if (self._getDistanceToTop() > self.options.showPosition) {
        self._setOpacity(self.element, 100)
      } else {
        self._setOpacity(self.element, 0)
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
    ele.style.setProperty('opacity', opacity)
    ele.style.setProperty('filter', 'alpha(opacity=' + opacity + ')')
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
