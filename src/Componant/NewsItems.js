import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props
        return (
            <div className='my-3'>

                <div className="card" >
                    <div style={{display:'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
                        <span className=" badge rounded-pill bg-danger">
                            {source.name}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202312/representational-image-305628335-16x9_2.jpg?VersionId=jjvMOPI0VjI4h.wrvuusI6zHwdlcUNJ1" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className='text'><small className='text-muted'>Published by {author} @ {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems