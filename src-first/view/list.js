import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useGetData } from "../store/action/action";
import { useSelector } from "react-redux";
function BlogList() {
    const { data } = useSelector(state => state.blogList);
    const getdata = useGetData();
    useEffect(() => {
        getdata();
    }, [])
    return <section className="container">
        <h1 className="text-center page-title">my blog</h1>
        {
            [...data.keys()].map((item,index)=>{
                return <div className="row" key={index}>
                    <div className="type">{item}</div>
                    {
                        [...data.values()][index].map((item,index)=>{
                            return <div className="title" key={index}>
                            <Link className="title-main" to={"/artic/"+item.ossname+"/"+item.name}>{item.name}</Link>
                            <span className="time">{item.mtime}</span>
                        </div>
                        })
                    }
                </div>
            })
        }
    </section>
}
export default BlogList;