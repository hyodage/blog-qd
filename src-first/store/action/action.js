import Axios from "axios";
import marked from "marked"
import moment from 'moment';
import { useDispatch } from "react-redux";
const Http = Axios.create({
    baseURL: '地址'
});
function useGetData() {
    let dispatch = useDispatch();
    return () => {
        Http.get('地址').then((res) => {
            let response = sortMds(res.data);
            dispatch({
                type: "BLOGLIST_GET",
                data: response
            });
        })
    }
}
function useGetArtic() {
    const dispatch = useDispatch();
    return (id) => {
        dispatch({
            type: "ARTIC_LOAD"
        });
        Http.get(`/${id}.md`)
            .then((res) => {
                let html = marked(res.data);
                dispatch({
                    type: "ARTIC_GET",
                    data: html
                });
            })
    }
}
function sortMds(mds) {
    const map = new Map();
    mds.forEach((element) => {
        let arr = element.folder.split("/");
        let oss = element.ossName.split(".");
        let mtime = moment(element.mtime).format("YYYY/MM/DD hh:mm:ss");
        let classify = arr[2];
        const file = {
            mtime,
            classify,
            name: arr[3],
            ossname: oss[0]
        }
        if (map.has(classify)) {
            map.get(classify).push(file);
        } else {
            map.set(classify, [file])
        }
    })
    return map;
}
export { useGetData, useGetArtic }