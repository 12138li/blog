var routerTitle = "",
    webTitle = "";

function setTitle() {
    // if (!routerTitle && !webTitle) {
    //     document.title = "loading..."
    // } else if (routerTitle && !webTitle) {
    //     document.title = routerTitle
    // } else if (!routerTitle && webTitle) {
    //     document.title = webTitle
    // } else {
        document.title = `${routerTitle}-${webTitle}`;
    // }
}
export default {
    // 设置路由标题
    setRouterTitle(title) {
        routerTitle = title;
        setTitle();
    },
    // 设置网站标题
    setWebTitle(title) {
        webTitle = title;
        setTitle();
    },
}