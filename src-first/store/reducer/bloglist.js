function blogList(blogList = {
    loading: true,
    data: []
}, action) {
    switch (action.type) {
        case "BLOGLIST_LOAD"://当前正在请求数据
            return {
                loading: true,
                data: []
            }
        case "BLOGLIST_GET":
            return {
                loading: false,
                data: action.data
            }
        default:
            return blogList
    }
}
export default blogList;