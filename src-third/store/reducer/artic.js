function artic(artic = { 
    loading:true,
    data:""
}, action) {
    switch (action.type) {
        case "ARTIC_LOAD"://当前正在请求数据
            return {
                loading:true,
                data:""
            }
        case "ARTIC_GET":
            return {
                loading:false,
                data:action.data
            }
        default:
            return artic
    }
}
export default artic;