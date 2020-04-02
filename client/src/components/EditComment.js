import React, { Component } from 'react';
//import TextInput from '../components/inputs/TextInput';
import { updateComment } from '../api/Comments';
import Comment from '../models/Comment';
import './EditComment.css';

class EditComment extends Component {

   //props: content, id, , userId, createdAt, editComment, cancelEdit

  state = {
    content: this.props.content,
    id: this.props.id,
    userId: this.props.userId,
    error: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { content, id, userId } = this.state;
    this.props.editComment(id, userId, {content});
    
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="editComment-form">
          <label htmlFor="EditComment">
            Edit Comment:
          </label>

          <textarea
            id="EditComment"
            name="content"
            value={this.state.content}
            onChange={this.handleTextChange}
            style={{ width: '100%', height: '200px', marginBottom: '10px' }}
          />

          <div className="editComment-button-box">
            <button type='submit' className="editComment-submit-button">Submit</button>
            <button onClick={this.props.cancelEdit}>Cancel</button>
          </div>
          
          {
            this.state.error ?
            <span>❌ Changes Not Saved</span> :
            null
          }
        </form>
        
      
    );
    
  }
}


export default EditComment;



