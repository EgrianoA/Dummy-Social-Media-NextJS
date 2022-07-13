import { useState, useEffect } from 'react';
import { Row, Col, Spin, Modal } from 'antd';
import axios from 'axios';
import TimelineCard from '../components/timeline-card';
import PostDetail from '../components/post-detail'
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [page, setPage] = useState(0)
  const [dataLength, setDataLength] = useState(5)
  const [content, setContent] = useState([])
  const [showPostDetail, setShowPostDetail] = useState(false)
  const [postDetail, setPostDetail] = useState()
  const [hasMore, setHasMore] = useState(true)

  const pageSize = 5
  useEffect(() => {
    getTimeline()
  });

  const getTimeline = () => {
    console.log(process.env.API_HEADER)
    let config = {
      method: 'get',
      url: process.env.API_URL + `post?page=${page}&limit=${pageSize}`,
      headers: { 'app-id': process.env.API_HEADER }
    }
    axios(config).then((res) => {
      if (res.status === 200) {
        setContent(res.data.data)
      } else {
        console.log(res.data)
      }
    }).catch(err => {
      console.log(err)
    });
  }

  const nextPage = () => {
    let newPage = page + 1
    let config = {
      method: 'get',
      url: process.env.API_URL + `post?page=${newPage}&limit=${pageSize}`,
      headers: { 'app-id': process.env.API_HEADER }
    }
    axios(config).then((res) => {
      if (res.status === 200) {
        setContent(content.concat(res.data.data))
        setPage(newPage)
        setDataLength(dataLength + 5)
        if (dataLength + 5 >= res.data.total) {
          setHasMore(false)
        }
      } else {
        console.log(res.data)
      }
    }).catch(err => {
      console.log(err)
    });
  }

  const openModal = (content) => {
    setShowPostDetail(!showPostDetail)
    setPostDetail(null)
    const getPostDetailConfig = {
      method: 'get',
      url: process.env.API_URL + `post/${content}`,
      headers: { 'app-id': process.env.API_HEADER }
    }
    const getPostCommentConfig = {
      method: 'get',
      url: process.env.API_URL + `post/${content}/comment`,
      headers: { 'app-id': process.env.API_HEADER }
    }
    axios.all([
      axios(getPostDetailConfig),
      axios(getPostCommentConfig)
    ]).then(axios.spread((res1, res2) => {
      if (res1.status === 200 && res2.status === 200) {
        console.log(res1.data)
        console.log(res2.data)
        setPostDetail({
          postDetail: res1.data,
          comments: res2.data
        })
      }
    })).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Row>
        {/*Put navbar component here*/}
      </Row>
      <Row className='main-page' type='flex'>
        {showPostDetail && (
          <Modal
            footer={null}
            visible={showPostDetail}
            onCancel={() => setShowPostDetail(false)}
            className='modal-style'
          >
            <Row type="flex" justify="space-around" align="middle" style={{ marginTop: '10vh' }}>
              <Col>
                <PostDetail postDetail={postDetail} />
              </Col>
            </Row>
          </Modal>
        )}
        <Col className='timeline' style={showPostDetail ? { filter: 'blur(4px)' } : {}}>
          <Row className='timeline-body'>
            <InfiniteScroll
              dataLength={dataLength}
              next={nextPage}
              hasMore={hasMore}
              loader={<center><Spin /></center>}>
              {content && content.length > 0 && (
                content.map(content => {
                  return <div onClick={(() => openModal(content.id))} key={content.id}><TimelineCard content={content.id}/></div>
                })
              )}
            </InfiniteScroll>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home
