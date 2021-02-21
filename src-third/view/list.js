import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Collapse, Row, Col, Divider, notification, BackTop } from 'antd';
import { GithubOutlined, SmileOutlined, MailOutlined } from '@ant-design/icons'
import { useGetData } from "../store/action/action";
import { useSelector } from "react-redux";
import '../css/list.css'
function BlogList() {
    const { data ,length} = useSelector(state => state.blogList);
    const getdata = useGetData();
    const openNotification = () => {
        notification.open({
            message: '温故而知新',
            placement: 'bottomRight',
            description:
                '逝者如斯夫，不舍昼夜 【论语】',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const { Panel } = Collapse
    useEffect(() => {
        openNotification()
        getdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>
        <Row justify='center'>
            <Col span={23}>
                <div className="header"><Divider><SmileOutlined /> MY BLOG</Divider></div>
                <Collapse>
                    {
                        [...data.keys()].map((item, index) => {
                            return <Panel header={item} key={index}>
                                {
                                    [...data.values()][index].map((item, index) => {
                                        return <div key={index} className="artic_list">
                                            <Row type='flex' justify='center'>
                                                <Col xs={24} sm={24} md={18} lg={18} xl={15}>
                                                    <Link to={"/artic/"+item.ossname+"/"+item.name}>{item.name}</Link>
                                                    {/* <Link href={{ pathname: '/artic', query: { id: item.ossname, title: item.name } }}><a>{item.name}</a></Link> */}
                                                </Col>
                                                <Col xs={0} sm={0} md={5} lg={5} xl={5}>
                                                    <span>{item.mtime}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }

                            </Panel>
                        })
                    }
                </Collapse>
                <div className="footer">
                    <div>本博客现有{data.size}个类别,{length}篇文章,持续更新中...</div>
                    <div><a href="https://github.com/hyodage"><GithubOutlined /></a> hyodage <a href="##"><MailOutlined /></a> lxs2048@sina.com</div>
                </div>
            </Col>
        </Row>
        <BackTop />
    </>
}
export default BlogList;