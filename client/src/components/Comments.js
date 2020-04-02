import React from 'react';   
import {getComments} from '../api/Comments';   
import LoadingIndicator from './LoadingIndicator'; 
import UserComment from './UserComment';
import CommentInput from './CommentInput';
import {deleteComment, updateComment} from '../api/Comments';
import EditComment from './EditComment';
import './Comments.css';

export default class Comments extends React.Component {
    // props: userId, postId, isAdmin
    
    state = { 
        comments: [], 
        loading: true,
        editComment: undefined
    };

    componentDidMount = async () => {
        const comments = await getComments(this.props.postId);
        
        this.setState({
            comments,
            loading: false
        });
    }

    addCommentToList = (newComment) => {
        const { comments } = this.state;
        comments.push(newComment);
        this.setState({
            comments
        });
    }

    usersOwnComment = (commentUserId) => {
        //console.log(this.props.isAdmin)
        if(this.props.userId === commentUserId || this.props.isAdmin) {
            return true;
        } else {
            return false;
        }
    }

    removeCommentFromList = async (commentId, commentAuthor) => {
        //console.log('remove comment authorized: admin or comment poster');

        if(this.usersOwnComment(commentAuthor)) {
            const resolved = await deleteComment(commentId); 
            if(resolved===200) {
                const updatedCommentList = this.state.comments.filter((comment) => comment.getId() !== commentId);
                this.setState({
                    comments: updatedCommentList
                });
            }
        }
    }

    commentToEdit = (index) => {
        const editComment = this.state.comments[index];
        //console.log('editing comment: id, updated fields')
        this.setState({
            editComment,
            editIndex: index
        });
    }

    cancelEdit = () => {
        this.setState({
            editComment: undefined,
            editIndex: undefined
        });
    }

    editComment = async (commentId, commentCreatorId, updatedContent) => {
        //put async
        //console.log(updatedContent)
        //redundant check :
        if(this.usersOwnComment(commentCreatorId)) {
            const { success, data, error } = await updateComment(commentId, updatedContent);

            if(data && success) {
              //this.props.addComment(data);
              const commentCopy = [...this.state.comments];
              commentCopy[this.state.editIndex] = data;
              //console.log(commentCopy)
              console.log(data)
              this.setState({
                editComment: undefined,
                editIndex: undefined,
                comments: commentCopy,
                error: false
              });
            
            } else {
              this.setState({
                error: true
              });
            }
            //console.log('edit comment')
            
        } 

        //remember to reset this.state.editComment
    }

    render() {
        if(this.state.loading) {
            return <LoadingIndicator />;
        }
        
        return (
            
            <div className="comments-container">
                <h1>Comments</h1>
                <div className="commentList-box">
                    {
                        this.state.comments.length > 0 ?
                        this.state.comments.map((comment,index) => (
                            <UserComment 
                                key={comment.getId()}
                                index={index}
                                id={comment.getId()}
                                content={comment.getContent()}
                                userId={comment.getUserId()}
                                postId={comment.getPostId()}
                                createdAt={comment.getCreatedAt()}
                                removeComment={this.removeCommentFromList}
                                editComment={this.commentToEdit}
                                permissions={this.usersOwnComment(comment.getUserId())}
                                isAdminComment={this.props.isAdmin && (this.props.userId === comment.getUserId())}
                            />
                        )) :
                        <p className="noCommentsMsg">No comments yet...</p>
                    }
                </div>
                
                {
                    this.props.userId && 
                    <div className="commentInteraction-box">
                    {
                        this.state.editComment ?
                        <EditComment 
                            content={this.state.editComment.getContent()}
                            id={this.state.editComment.getId()}
                            userId={this.state.editComment.getUserId()}
                            createdAt={this.state.editComment.getCreatedAt()}
                            editComment={this.editComment}
                            cancelEdit={this.cancelEdit}
                        /> : 
                        <CommentInput 
                            postId={this.props.postId} 
                            userId={this.props.userId} 
                            addComment={this.addCommentToList}
                        />
                    }
                </div>
                }
                
            </div>
        );
    }
}

/*
<div className="commentList-box">
                <h1>Comments</h1>
                {
                    this.state.comments.length > 0 ?
                    this.state.comments.map((comment,index) => (
                        <UserComment 
                            key={comment.getId()}
                            index={index}
                            id={comment.getId()}
                            content={comment.getContent()}
                            userId={comment.getUserId()}
                            postId={comment.getPostId()}
                            createdAt={comment.getCreatedAt()}
                            removeComment={this.removeCommentFromList}
                            editComment={this.commentToEdit}
                        />
                    )) :
                    <p>Be the first to comment.</p>
                }
                <CommentInput 
                    postId={this.props.postId} 
                    userId={this.props.userId} 
                    addComment={this.addCommentToList}
                />
            </div>
*/

