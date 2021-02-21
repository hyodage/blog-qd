import React, { useEffect, useState } from "react";
import { Card, Row, Col, BackTop, Affix, Button, Drawer } from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetArtic } from "../store/action/action";
import { TagsOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from "highlight.js";//注意引入的是.js
import 'highlight.js/styles/monokai-sublime.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import '../css/artic.css'
function Artic() {
    const { id, name } = useParams();
    const getArtic = useGetArtic();
    const { loading, data } = useSelector(state => state.artic);
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    let html = marked(data)
    const [visible, setvisible] = useState(false)

    const changeDrawer = () => {
        setvisible(!visible)
    }
    useEffect(() => {
        getArtic(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    return <>
        <div className="site-card-border-less-wrapper">
            <Row className='comm-main' type='flex' justify='center'>
                <Col className='comm-left' xs={23} sm={23} md={18} lg={18} xl={18}>
                    <Card title={name} bordered={false} headStyle={{ textAlign: 'center'}} loading={loading}>
                        <div className="detailed-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        >
                        </div>
                        <Affix offsetBottom={10}>
                            <Row type='flex'>
                                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                                    <Button type="ghost" shape="circle" icon={<TagsOutlined />} onClick={changeDrawer}></Button>
                                </Col>
                            </Row>
                        </Affix>
                    </Card>
                </Col>
                <Col xs={0} sm={0} md={5} lg={5} xl={5}>
                    <Affix offsetTop={10}>
                        <div className="comm-box">
                            <MarkNav
                                className="article-menu"
                                source={data}
                                ordered={true}
                                updateHashAuto={true}
                            />
                        </div>
                    </Affix>
                </Col>
                <BackTop />
            </Row>
            <Drawer
                title="Catalog Page"
                placement='left'
                closable={true}
                onClose={changeDrawer}
                visible={visible}
                key='left'
            >
                <div className="comm-box">
                    <div className="nav-title">文章目录</div>
                    <MarkNav
                        className="article-menu"
                        source={data}
                        ordered={true}
                        updateHashAuto={true}
                    />
                </div>
            </Drawer>
        </div>

    </>
}
export default Artic;