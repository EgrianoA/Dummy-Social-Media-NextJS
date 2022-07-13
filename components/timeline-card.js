import { Row, Col, Spin } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';


const TimelineCard = props => {
    const [Content, SetContent] = useState()
    const [ImgLoaded, SetImgLoaded] = useState()
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
                SetContent(res.data)
            } else {
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className='post-card'>
            {Content && (
                <Row className='card-content' type='flex'>
                    <Col xs={4} sm={3}>
                        <img src={Content.owner.picture} className='profile-pic' />
                    </Col>
                    <Col xs={20} sm={21}>
                        <Row>
                            <b><p>{Content.owner.firstName}</p></b>
                        </Row>
                        <Row>
                            <p>{Content.text}</p>
                        </Row>
                        {Content.image && (
                            <div>
                                {ImgLoaded ? null :
                                    (
                                        <Spin />
                                    )}
                                <Row>
                                    <img
                                        className='content-img'
                                        src={Content.image}
                                        onLoad={() => SetImgLoaded(true)}
                                        style={ImgLoaded ? {} : { display: 'none' }} />
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


export default TimelineCard