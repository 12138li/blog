import getComponentRootDom from "./getComponentRouterDom";
import Icon from "@/components/Icon";
import Styles from "./showMessage.module.less";
/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn 
 * @param {Number} duration 多久消失
 * @param {HTMLElement} container 容器，消息会显示到该容器和正中间
 */
export default function (content, type = "info", duration = 2000, container) {
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, {
        type,
    });
    // console.log(iconDom);
    div.innerHTML = `<span class="${Styles.icon}" >${iconDom.outerHTML}</span><div>${content}</div>`;
    console.log(Styles);
    //添加类名，使用es6的模板字符串,添加背景时因为使用的是css module，所以要转换一下,去Styles对象里的属性
    div.className = `${Styles.message} ${Styles[`message-${type}`]}`;
    if (!container) {
        container = document.body;
    } else {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }
    container.appendChild(div);
    // console.log(div);

    //强行渲染
    div.clientHeight;
    //回归原位
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;
    //等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = 'translate(-50%,-50%) translateY(-15px)'
    // 注册一个transitionend事件，在过渡完后就移除弹窗，只触发一次就行
        div.addEventListener("transitionend", function () {
            div.remove();
        }, {
            once: true
        })
    }, duration);
}