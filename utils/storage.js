;(function() {
  class Storage {
    constructor() {
      if (!window.localStorage) {
        throw new Error('Your browser not support localStorage, please update your browser.')
      }
  
      this.storage = window.localStorage || localStorage
    }

    get = (key) => this.storage.getItem(key)

    set = (key, value) => this.storage.setItem(key, value)

    remove = (...keys) => {
      keys.forEach(key => this.storage.removeItem(key))
    }

    clear = () => this.storage.clear()

    all = () => {
      let allKeys = []
      for (let i in this.storage) {
        if (typeof this.storage[i] === 'string') {
          allKeys.push(i)
        }
      }
      return allKeys
    }

    has = (item) => this.all().indexOf(item) > -1 ? true : false

  }
  
  const storage = new Storage()
  window.storage = storage
})()
