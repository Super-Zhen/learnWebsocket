/*
  这是一些工具类
  为了更改好的进行工作，建议将所有用到的公共工具类放到这儿
 */
// 防抖

export default {
  install(Vue, options) {
    Vue.prototype.util = {
      // 节流
      throttle(fn, delay,param) {
        let sTime = 0,eTime
        let isPause = false
        function result(param) {
          eTime = Date.now()
          if (eTime - sTime < delay && isPause === false) return
          fn(param)
          sTime = eTime
        }
        return result
      },
      debounce(fn,delay){
        let timer = null //借助闭包
        return function(param) {
            clearTimeout(timer)
            timer = setTimeout(()=>fn(param),delay)
        }
      }
    }
  }
}
