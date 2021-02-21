import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetArtic } from "../store/action/action";
import { Card } from 'antd';
function Artic() {
    let { id,name } = useParams();
    const getArtic = useGetArtic();
    const { loading, data } = useSelector(state => state.artic);
    useEffect(() => {
        getArtic(id);
    }, [id]);
    return <div className="contain_artic">
        <Card loading={loading} title={name}>
            <div dangerouslySetInnerHTML={{
                __html: data
            }} className="markdown-body"></div>
        </Card>
    </div>
}
export default Artic;