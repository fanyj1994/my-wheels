# ES6 造轮子

## 组件

- [x] 返回顶部
  
  配置项：

  ``` js
  const options = {
    speed: 100, // 滚动速度
    showPosition: 500 // 图标显示时距离顶部位置
  }
  ```

- [x] Tab
  
  配置项：

  ``` js
  const options = {
    element: '',
    hasDelay: false, // 是否延迟
    delayTime: 100, // 延迟时间
    activeIndex: 0, // 首次激活选项卡
    autoplay: true, // 是否自动切换
    toggleTime: 2000 // 自动切换时间
  }
  ```

## 工具包装

- [x] localStorage 封装
  
  API：
  1. `storage.get(key)`
  2. `storage.set(key, value)`
  3. `storage.remove(key1, key2)`
  4. `storage.clear()`
  5. `storage.has(key)`
  6. `storage.all()`
