;(function() {
  // 注册辅助函数
  const helpers = {
    getDistanceToTop: function() {}
  }

  function BackToTop(ele, options) {
    this.element = typeof ele === 'string' ? document.querySelector(ele) : ele
    this.options = Object.assign({}, this.constructor.defaultOptions, options)
    this.init()
  }

  BackToTop.defaultOptions = {
    speed: '300',
    showPosition: 300
  }

  const self = BackToTop.prototype

  self.init = function() {
    this.showElement()
    this.eventHandler()
  }

  self.showElement = function() {

  }

  self.eventHandler = function() {

  }
}())