class Tab {
  constructor(options) {
    const defaultOptions = {
      element: '',
      tabRole: 'tab',
      panelRole: 'panel',
      hasDelay: false,
      delayTime: 100,
      activeIndex: 0,
      autoplay: true,
      toggleTime: 2000
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

    this.options = Object.assign({}, defaultOptions, options)
    this.tabs = []
    this.panels = []
    this.activeIndex = this.options.activeIndex
    this.timer = null

    if(!this.options.element) {
      throw new Error('element is required.')
    }

    this.init()
  }

  init() {
    this.getDom()
    this.updateDom(this.options.activeIndex)
    this.autoplay()
    this.eventInit()
  }

  getDom() {
    const tabRole = this.options.tabRole
    const panelRole = this.options.panelRole
    this.tabs = document.querySelectorAll(`[data-role="${tabRole}"]`)
    this.panels = document.querySelectorAll(`[data-role="${panelRole}"]`)
  }

  autoplay() {
    const self = this
    if (self.options.autoplay) {
      this.timer = setInterval(() => {
        if (self.activeIndex < this.tabs.length - 1) {
          self.activeIndex++
        } else {
          self.activeIndex = 0
        }
        self.updateDom(self.activeIndex)
      }, self.options.toggleTime)
    }
  }

  updateDom(index) {
    const self =  this
    function changeClassName() {
      self.tabs.forEach(tab => {
        tab.classList.add('tab')
        tab.classList.remove('active')
      })
      self.panels.forEach(panel => {
        panel.classList.add('panel')
        panel.classList.remove('active')
      })
      self.tabs[index].classList.add('active')
      self.panels[index].classList.add('active')
    }
    if (self.options.hasDelay) {
      setTimeout(changeClassName, self.options.delayTime)
    } else {
      changeClassName()
    }
  }

  eventInit() {
    this.tabClickHandle()
    this.mouseEnterHandle()
    this.mouseOutHandle()
  }

  tabClickHandle() {
    this.tabs.forEach(tab => {
      this._on(tab, 'click', () => {
        clearInterval(this.timer)
        const tabIndex = Array.from(this.tabs).indexOf(tab)
        this.activeIndex = tabIndex
        this.updateDom(tabIndex)
        this.autoplay()
      })
    })
  }

  mouseEnterHandle() {
    // TODO:可以使用事件代理，不用遍历挂事件
    this.panels.forEach(panel => {
      this._on(panel, 'mouseenter', () => {
        const tabIndex = Array.from(this.panels).indexOf(panel)
        if (this.activeIndex === tabIndex) {
          clearInterval(this.timer)
        }
      })
    })
  }

  mouseOutHandle() {
    this.panels.forEach(panel => {
      this._on(panel, 'mouseout', () => {
        this.autoplay()
      })
    })
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