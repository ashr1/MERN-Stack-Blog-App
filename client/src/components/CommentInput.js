import React, { Component } from 'react';
//import TextInput from '../components/inputs/TextInput';
import { addComment } from '../api/Comments';
import Comment from '../models/Comment';
import './CommentInput.css';

class CommentInput extends Component {

  state = {
    content: '',
    userId: this.props.userId,
    postId: this.props.postId,
    createdAt: Date.now(), // or moment user submits the comment
    error: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state); //!this.state.postID 
    // edits will be treated as a new post
    const { content, userId, createdAt, postId } = this.state;
    const { status, data, error } = await addComment({content, user_id: userId, createdAt, post_id: postId});
    if(data && status === 200) {
      this.props.addComment(data);
      this.setState({
        content: '',
        createdAt: Date.now()
      });
      //this.props.history.push(`/post/${this.state.postID}`);
    } else {
      this.setState({
        error: true
      });
    }
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false
    });
  }

  render() {
    return (
      <div className="commentInput-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="InputComment">
            Add Comment:
          </label>

          <textarea
            id="InputComment"
            name="content"
            value={this.state.content}
            onChange={this.handleTextChange}
            style={{ width: '100%', height: '200px', marginBottom: '10px' }}
          />

          <div className="commentInput-button-box">
            <button>Submit</button>
          </div>
          {
            this.state.error ?
            <span>❌ Changes Not Saved</span> :
            null
          }
        </form>
      </div>
      
    );
  }
}


export default CommentInput;



