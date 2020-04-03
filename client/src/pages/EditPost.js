import React, { Component } from 'react';
import TextInput from '../components/inputs/TextInput';
import {getPost} from '../api/Posts';
import LoadingIndicator from '../components/LoadingIndicator';
import {
  Link
} from 'react-router-dom';
import { updatePost, deletePost } from '../api/Posts';
import './EditPost.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';   

function transform(node, index) {
  let allImages = [];
  let result;
  if(node.children) {
      node.children.forEach((currNode) => {
          result = transform(currNode, currNode.index);
          console.log(result)
          if(result) {
            allImages = [...allImages, ...result]
          }
      })
  }
  if(node.type === 'tag' && node.name === 'img') {
    // console.log('an image encountered')
    allImages.push(node);
  } 
  if(allImages.length) {
    return allImages;       
  }

  return null;
}

class EditPost extends Component {

  state = {
    title: undefined,
    author: undefined,
    createdAt: undefined,
    body: undefined,
    images: undefined,
    editSuccess: undefined,
    loading: true
  };

  componentDidMount = async () => {
    const post = await getPost(this.props.match.params.id);

    this.setState({
        title: post.getTitle(),
        author: post.getAuthor(),
        createdAt: post.getCreatedAt(),
        body: post.getBody(),
        images: post.getImages(),
        loading: false
    });
}

  handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.state);
    const { success } = await updatePost(this.props.match.params.id, Object.assign({},this.state));
    this.setState({
      editSuccess: success
    });
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      editSuccess: undefined
    });
  }

  handleBodyChange = (event, editor) => {
    const imageSrcs = this.getImages(editor.getData());
    this.setState({
      body: editor.getData(),
      images: imageSrcs,
      editSuccess: undefined
    });
  }

  getImages = (bodyToParse) => {
    let imageNodes = ReactHtmlParser(bodyToParse, { transform });
    let imageSrcs = [];
    imageNodes = imageNodes.filter((node) => node);
    imageNodes.forEach((nodeList) => {
      nodeList.forEach((imgNode) => {
        if(imgNode.name === 'img') {
          if(imgNode.attribs && imgNode.attribs.src) {
            imageSrcs.push(imgNode.attribs.src)
          }
        }
      })
    })
    return imageSrcs;
  }

  handleDelete = async (e) => {
    
    const status  = await deletePost(this.props.match.params.id);
    if(status === 200) {
      this.props.history.push('/');
    } else {
      this.setState({
        editSuccess: false
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (  
      loading ?
      <LoadingIndicator />:
      <div>
        <form onSubmit={this.handleSubmit} className="editPost-form">
            <TextInput 
              label="Title"
              name="title" 
              value={this.state.title || ''}
              onChange={this.handleTextChange}
            />

            <TextInput 
              label="Author"  
              name="author"
              value={this.state.author || ''} 
              onChange={this.handleTextChange}
            />

            <label htmlFor="PostBody">
              Body
            </label>
            <CKEditor 
                editor={ ClassicEditor }
                data={this.state.body || ''}
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

            
            <div className="editPost-form-buttonBox">
              <button type='submit'>Submit</button>
              <button onClick={this.handleDelete}>Delete Post</button>
            </div>
            
            {
              typeof this.state.editSuccess === 'boolean' ?
              ( 
                this.state.editSuccess ?
                <span>✔️ Changes Saved</span> :
                <span>❌ Changes Not Saved</span> 
              ) : 
              null
            }
        </form>
        

      <div style={{textAlign: 'right'}} className="editPost-viewPost">
        <Link to={`/post/${this.props.match.params.id}`}>View Post</Link>
      </div>
      
      </div>
        
    );
  }
}


export default EditPost;

