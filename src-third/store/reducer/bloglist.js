function blogList(blogList = {
    loading: true,
    data: [],
    length:0
}, action) {
    switch (action.type) {
        case "BLOGLIST_LOAD"://当前正在请求数据
            return {
                loading: true,
                data: [],
                length:0
            }
        case "BLOGLIST_GET":
            return {
                loading: false,
                data: action.data,
                length:action.length
            }
        default:
            return blogList
    }
}
export default blogList;