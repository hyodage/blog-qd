import Head from 'next/head'
import { Collapse, Row, Col, Divider, notification, BackTop } from 'antd';
import { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment';
import { GithubOutlined, SmileOutlined, MailOutlined } from '@ant-design/icons'
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
  return { data: map, num: mds.length };
}
function Home(datas) {
  const { data, num } = sortMds(datas.results)
  const openNotification = () => {
    notification.open({
      message: '温故而知新',
      placement: 'bottomRight',
      description:
        '逝者如斯夫，不舍昼夜 【论语】',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  useEffect(() => {
    openNotification()
  }, [])
  const { Panel } = Collapse
  return (
    <>
      <Head>
          <title>博客首页</title>
          <mata charSet="utf-8"/>
          <meta name="description" content="首页 | 前端博客列表"/>
      </Head>
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
                            <Link  href={{pathname:'/artic',query:{id:item.ossname,title:item.name}}}><a>{item.name}</a></Link>
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
            <div>统计:本博客现有{data.size}个类别,{num}篇文章,持续更新中...</div>
            <div>联系方式: <a href="https://github.com/hyodage"><GithubOutlined /></a> hyodage <a href="##"><MailOutlined /></a> lxs2048@sina.com</div>
          </div>
        </Col>
      </Row>
      <BackTop />
    </>
  )
}
export default Home
export const getServerSideProps = async () => {
  const result = await axios.get('地址')
  let datas = {}
  if (result) {
      datas = { results: result.data }
  }
  return {
      props: datas
  }
}
