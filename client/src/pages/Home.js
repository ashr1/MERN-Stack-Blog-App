import React, { Component } from 'react';
import PostList from '../components/PostList';
import {posts} from '../data/posts';
import {getPosts} from '../api/Posts';
import LoadingIndicator from '../components/LoadingIndicator';

class Home extends Component {

  state = {
    posts: [],
    loading: true
  };

  componentDidMount = async () => {
    const posts = await getPosts() || [];
   
    this.setState({
      posts,
      loading: false
    });

  }
  render() {
    return (
      <div className="home-page">
        {
          this.state.loading ?
          <LoadingIndicator /> : 
          this.state.posts.length > 0 ?
          <PostList posts={this.state.posts} /> :
          <p>Add Posts To Get Started</p>
        }
      </div>
      
    );
  }
}


export default Home;


