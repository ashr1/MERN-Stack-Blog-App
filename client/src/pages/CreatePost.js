import React, { Component } from 'react';
import TextInput from '../components/inputs/TextInput';
import { addPost } from '../api/Posts';
import Post from '../models/Post';
import './CreatePost.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';    

class CreatePost extends Component {

  state = {
    title: '',
    author: '',
    createdAt: Date.now(),
    body: '',
    images: [],
    postID: undefined,
    error: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, author, createdAt, body, images } = this.state;
    const { status, data, error } = await addPost({title, author, createdAt, body, images});
    if(data) {
      this.setState({
        postID: data.getId(),
        title: data.getTitle(),
        author: data.getAuthor(),
        body: data.getBody(),
        images: data.getImages(),
        createdAt: data.getCreatedAt()
      });
      this.props.history.push(`/post/${this.state.postID}`);
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

  handleBodyChange = (event, editor) => {
    const data = editor.getData();
    this.setState({
      body: data,
      error: false
    });
  }

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit} className="createPost-form">
          <TextInput 
            label="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleTextChange}
          />

          <TextInput
            label="Author"
            name="author"
            value={this.state.author}
            onChange={this.handleTextChange}
          />

          <label htmlFor="PostBody">
            Body
              </label>

              <CKEditor 
                editor={ ClassicEditor }
                data=""
                onInit={editor => {
                    // You can store the "editor and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={this.handleBodyChange}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
              />

          <div className="createPost-submitButton-Box">
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


export default CreatePost;

