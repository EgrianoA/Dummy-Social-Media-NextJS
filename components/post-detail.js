import { Row, Col, Spin } from 'antd';
import { UseState, UseEffect } from 'react';

const postDetail = props => {
    const [ImgLoaded, SetImgLoaded] = UseState()
    UseEffect(() => {
    }, []);

    if (props.postDetail) {
        const content = props.postDetail.postDetail
        const comments = props.postDetail.comments
        console.log(props)

        return (
            <div className='post-details'>
                {!props.postDetail ? (
                    <center><Spin /></center>
                ) : (<div>
                    <Row className='card-content' type='flex'>
                        <Col span={3}>
                            <img src={content.owner.picture} className='profile-pic' />
                        </Col>
                        <Col span={21}>
                            <Row>
                                <b><p>{content.owner.firstName}</p></b>
                            </Row>
                            <Row>
                                <p>{content.text}</p>
                            </Row>
                            {content.image && (
                                <div>
                                    {ImgLoaded ? null :
                                        (
                                            <Spin />
                                        )}
                                    <Row>
                                        <img
                                            className='content-img'
                                            src={content.image}
                                            onLoad={() => SetImgLoaded(true)}
                                            style={ImgLoaded ? {} : { display: 'none' }} />
                                    </Row>
                                </div>
                            )}
                        </Col>
                    </Row>
                    <hr />
                    <Row className='comment-section'>
                        <Col>
                            {comments.data && comments.data.length > 0 ?
                                comments.data.map((comment, index) => {
                                    return (<div key={index}>
                                        <Row type='flex' className='comment-card'>
                                            <Col span={3}>
                                                <img src={comment.owner.picture} className='profile-pic' />
                                            </Col>
                                            <Col span={21}>
                                                <Row>
                                                    <b><p>{comment.owner.firstName}</p></b>
                                                </Row>
                                                <Row>
                                                    <p>{comment.message}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </div>)
                                })
                                : (
                                    <div>No Comments</div>
                                )
                            }
                        </Col>
                    </Row>
                </div>)}

            </div>
        )
    } else {
        return (<center><Spin /></center>)
    }
}

export default postDetail