import React from 'react';
import './Post.css';        
import '../content-styles.css';
import ReactHtmlParser from 'react-html-parser';

export default class Post extends React.Component {
    render() {
        const { id, title, author, createdAt, body, images } = this.props;
        const [week, month, day, year,] = createdAt.split(' ');
        console.log(week, month, day, year)

        return (
            <div className="postPage-box">

                <div className="postPage-createdAt">
                    {`${week} ${month} ${day}, ${year}`}
                </div>

                {
                    images && (
                        <div className="postPage-image-box">
                            <img className="postView-image" src={images[0]} />
                        </div>
                    )
                }
                
                <div className="postPage-title">
                    {title}
                </div>

                <div className="postPage-author">
                    {
                        author ? 
                        <div className="author-box">
                            <p>By,</p>
                            <p>{`${author}`}</p>
                        </div> : 
                        ''
                    } 
                </div>

                <div className="ck-content postPage-body">
                    { 
                        ReactHtmlParser(body)
                    }
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

