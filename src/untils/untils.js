// 函数防抖的实现
 export function debounce(fn, wait) {
    var timer = null;
  
    return function() {
      var context = this,
        args = arguments;
  
      // 如果此时存在定时器的话，则取消之前的定时器重新记时
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
  
      // 设置定时器，使事件间隔指定事件后执行
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }
  
  // 函数节流的实现;
  export function throttle(fn, delay) {
    var preTime = Date.now();
  
    return function() {
      var context = this,
        args = arguments,
        nowTime = Date.now();
  
      // 如果两次时间间隔超过了指定时间，则执行函数。
      if (nowTime - preTime >= delay) {
        preTime = Date.now();
        return fn.apply(context, args);
      }
    };
  }

  export function padLeftZero(str) {
        return ("00" + str).substr(str.length);
      }
      
      // 时间格式化
      export function formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
      
        let o = {
          "M+": date.getMonth() + 1,
          "d+": date.getDate(),
          "h+": date.getHours(),
          "m+": date.getMinutes(),
          "s+": date.getSeconds()
        };
      
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
          }
        }
      
        return fmt;
      }