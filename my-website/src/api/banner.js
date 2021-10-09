import request from "./request";

export default async function getBanners() {
  
    return  await request.get("/api/banner");
}
// //r是request.js文件返回的数据 return resp.data.data;
// getBanners().then(r=>{
//     console.log(r);
// });