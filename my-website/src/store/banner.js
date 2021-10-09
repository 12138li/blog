import getBanners from "@/api/banner";
export default {
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
    },
    mutations: {
        setLoading(state, payload) {
            state.isLoading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async getBanners(ctx) {
            if(ctx.state.data){
                return
            }
            ctx.commit("setLoading", true);
            let resp = await getBanners()
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
            
        }
    }
}