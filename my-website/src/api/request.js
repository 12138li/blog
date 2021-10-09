import axios from "axios";
import showMessage from "@/utils/showMessage";

//创建一个axios实例
const ins = axios.create();
ins.interceptors.response.use(function (resp) {
    // console.log("拦截器");
    if(resp.data.code!=0){
        showMessage(resp.data.message,"error",2000);
        return null;
    }
    //此时返回的是响应体
    // return resp;
    //此时返回的是响应体的data
    // return resp.data;
    // 此时返回的是响应体的data的data,也就是我们需要的数据
    // console.log(resp);
    return resp.data.data;
});

export default ins;