import React from 'react';       
import PostView from './PostView';
import './PostList.css';
import { Link } from 'react-router-dom';

export default class PostList extends React.Component {
    render() {
        //const { id, title, author, createdAt, body, images } = this.props;
        const { posts } = this.props;

        return (
            <div className="postList-box">
                {
                    posts.map((post, index) => (
                        <Link
                            key={post.getId()}
                            to={`/post/${post.getId()}`}
                        >
                            <PostView 
                                title={post.getTitle()}
                                author={post.getAuthor()}
                                createdAt={post.getFormattedCreatedAt()}
                                body={post.getBody()}
                                images={post.getImages()}
                            />
                        </Link>
                    ))
                }
            </div>
        );
    }
}
