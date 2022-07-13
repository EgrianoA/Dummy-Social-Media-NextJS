import { Row, Col, Spin } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';


const timelineCard = props => {
    const [content, setContent] = useState()
    const [imgLoaded, setImgLoaded] = useState()
    useEffect(() => {
        getContentDetail();
    }, []);
    const getContentDetail = () => {
        let config = {
            method: 'get',
            url: process.env.API_URL + `post/${props.content}`,
            headers: { 'app-id': process.env.API_HEADER }
        }
        axios(config).then((res) => {
            if (res.status === 200) {
                setContent(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className='post-card'>
            {content && (
                <Row className='card-content' type='flex'>
                    <Col xs={4} sm={3}>
                        <img src={content.owner.picture} className='profile-pic' />
                    </Col>
                    <Col xs={20} sm={21}>
                        <Row>
                            <b><p>{content.owner.firstName}</p></b>
                        </Row>
                        <Row>
                            <p>{content.text}</p>
                        </Row>
                        {content.image && (
                            <div>
                                {imgLoaded ? null :
                                    (
                                        <Spin />
                                    )}
                                <Row>
                                    <img
                                        className='content-img'
                                        src={content.image}
                                        onLoad={() => setImgLoaded(true)}
                                        style={imgLoaded ? {} : { display: 'none' }} />
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            )}
            <hr />
        </div>
    )
}


export default timelineCard