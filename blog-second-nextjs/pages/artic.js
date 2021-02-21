import axios from 'axios'
import Head from 'next/head'
import { Card, Row, Col, BackTop, Affix } from 'antd';
import { useRouter } from 'next/router'
import marked from 'marked'
import hljs from "highlight.js";//注意引入的是.js
import 'highlight.js/styles/monokai-sublime.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

function Artic(data) {
    const router = useRouter()
    const { title } = router.query
    const { results } = data
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
    let html = marked(results)
    return (
        <>
            <Head>
                <title>博客首页</title>
                <mata charSet="utf-8"/>
                <meta name="description" content={"详情页 | "+title}/>
            </Head>
            <div className="site-card-border-less-wrapper">
                <Row className='comm-main' type='flex' justify='center'>
                    <Col className='comm-left' xs={23} sm={23} md={18} lg={18} xl={18}>
                        <Card title={title} bordered={false} headStyle={{ textAlign: 'center' }}>
                            <div className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: html }}
                            >
                            </div>
                        </Card>
                    </Col>
                    <Col xs={0} sm={0} md={5} lg={5} xl={5}>
                        <Affix offsetTop={10}>
                            <div className="comm-box">
                                <div className="nav-title">文章目录</div>
                                <MarkNav
                                    className="article-menu"
                                    source={results}
                                    ordered={false}
                                />
                            </div>
                        </Affix>
                    </Col>
                </Row>
            </div>
            <BackTop />
        </>
    )
}
export default Artic
export const getServerSideProps = async (res) => {
    let result = await axios.get('地址' + res.query.id + '.md')
    // 因为这里得到的是一个字符串
    let datas = {}
    if (result) {
        datas = { results: result.data }
    }
    return {
        props: datas
    }
}