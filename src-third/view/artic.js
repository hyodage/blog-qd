import React, { useEffect, useState } from "react";
import { Card, Row, Col, BackTop, Affix, Button, Drawer } from 'antd';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetArtic } from "../store/action/action";
import { TagsOutlined } from '@ant-design/icons'
import '../css/artic.css'
import '../css/nav.css'
import { markNav } from '../utils/markNav'
function Artic() {
    const { id, name } = useParams();
    const getArtic = useGetArtic();
    const [visible, setvisible] = useState(false)
    const { loading, data } = useSelector(state => state.artic);
    const { mytree, html } = markNav(data)
    const changeDrawer = () => {
        setvisible(!visible)
    }
    const getmenu = (node) => {
        return <ul className="nav-list">
            {
                node.map((item, index) => {
                    return <li key={index}>
                        <a href={'#header-' + item.index}>{item.title}</a>
                        {item.children.length > 0 ? getmenu(item.children) : null}
                    </li>
                })
            }
        </ul>
    }
    const scrollHandler = ()=> {
        const idPrefix = 'header-'
        const distance = 20
        let list = []
        for (var i = 0; i < this.mkTitlesLen; i++) {
          let dom = document.getElementById(`${idPrefix}${i}`)
          let domTitle = document.querySelector(`a[href="#header-${i}"]`)
          list.push({
            y: dom.getBoundingClientRect().top + 10, // 利用dom.getBoundingClientRect().top可以拿到元素相对于显示器的动态y轴坐标
            index: i,
            domTitle
          })
        }
      
        let readingVO = list.filter(item => item.y > distance).sort((a, b) => {
          return a.y - b.y
        })[0] // 对所有的y值为正标的题，按y值升序排序。第一个标题就是当前处于阅读中的段落的标题。也即要高亮的标题
      }
    useEffect(() => {
        getArtic(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return <>
        <div className="site-card-border-less-wrapper">
            <Row className='comm-main' type='flex' justify='center'>
                <Col className='comm-left' xs={23} sm={23} md={18} lg={18} xl={18}>
                    <Card title={name} bordered={false} headStyle={{ textAlign: 'center' }} loading={loading}>
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
                            <div className="nav-title">文章目录</div>
                            {
                                getmenu(mytree)
                            }
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
                    {
                        getmenu(mytree)
                    }
                </div>
            </Drawer>
        </div>

    </>
}
export default Artic;