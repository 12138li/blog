import request from "./request"

export async function getBlogType() {
    return await request.get("/api/blogtype");
}

export async function getBlogList(page = 1, limit = 10, typeId = -1) {
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            typeId,
        }
    })
}
// 参数直接写在url里面
export async function getBlogDetail(id) {
    return await request.get(`/api/blog/detail/${id}`);
}

export async function submitComment(commentInfo){
    return await request.post("/api/comment",commentInfo)
}

export async function getComment(page=1,limit=10,typeId=-1){
    return await request.get("/api/comment",{
        params:{
            page,
            limit,
            typeId,
        }
    })
}
