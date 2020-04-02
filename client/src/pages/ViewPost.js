import React, { Component } from 'react';
import Post from '../components/Post';    
import {getPost} from '../api/Posts';    
import LoadingIndicator from '../components/LoadingIndicator';
import {
    Link
} from 'react-router-dom';
import Comments from '../components/Comments';
import './ViewPost.css';

export class ViewPost extends React.Component {
    state = {
        post: undefined,
        loading: true
    };

    componentDidMount = async () => {
        const post = await getPost(this.props.match.params.id);
        this.setState({
            post,
            loading: false
        });
    }
    
    render() {
        const {post} = this.state;
        if(this.state.loading || this.state.post === undefined) {
            return <LoadingIndicator />
        }
        return (
            <div>
                
                <Post 
                    key={post.getId()}
                    title={post.getTitle()}
                    author={post.getAuthor()}
                    createdAt={post.getFormattedCreatedAt()}
                    body={post.getBody()}
                    images={post.getImages()}
                />
               
                
                {
                    this.props.isAdmin &&  <Link to={`/edit/post/${this.props.match.params.id}`} className="viewPost-admin-edit">Edit</Link>
                }
                <Comments 
                    postId={this.props.match.params.id} 
                    userId={this.props.userId}
                    isAdmin={this.props.isAdmin}
                />
            </div>
            
        );
    }
}

export default (isAdmin, userId) => ((props) =>(
    <ViewPost 
        isAdmin={isAdmin}
        userId={userId}
        {...props}
    />
));

