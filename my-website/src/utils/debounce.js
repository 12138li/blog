export default function (fn, duration, immediate) {
    let timer = null;
    return ()=>{
        let args = arguments;
        clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer=setTimeout(()=>{
                timer=null;
            },duration)
            if (callNow) fn(args);
        } else {
            timer = setTimeout(() => {
                fn(args);
              }, duration);
        }
    }

}

// export default function(fn, duration = 100) {
//     let timer = null;
//     return (...args) => {
//     //   console.log(arguments,123)
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         fn(...args);
//       }, duration);
//     };
//   }
  