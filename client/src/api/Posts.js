import axios from './axios';
import Post from '../models/Post';
import getAuthHeader from './getAuthHeader';

export const getPosts = async (categories) => {
    try {
        const { data } = await axios.get(
            `/v1/posts`
        );
        return data.map((rawPost) => new Post(rawPost));
    } catch(error) {
        console.error(error);
    }
};

export const getPost = async (id) => {
    try {
        const { data } = await axios.get(
            `/v1/posts/${id}`
        );
        return new Post(data);
    } catch(error) {
        console.error(error);
    }
}

export const addPost = async (body) => {
    try {
        const { status, data } = await axios.post(
            `/v1/posts`,
            body,
            { headers: await getAuthHeader() }
        );
        return { 
            status, 
            data: new Post(data)
        };
    } catch(error) {
        return {
            error: 'an unknown error occurred'
        };
    }
}
    
export const updatePost = async (id, body) => {
    try {
        
        const { data, status } = await axios.put(
            `/v1/posts/${id}`,
            body,
            { headers: await getAuthHeader() }
        );
        
        if((data && data._id) || status === 200) {
            return {
                success: true,
                data: new Post(data)
            };
        } else {
            return {
                success: false,
                error: 'An unknown error occurred. Please, retry again later.'
            };
        }
    } catch(error) {
        console.error(error);
    }
};


export const deletePost = async (id) => {
    try {
        const response = await axios.delete(
            `/v1/posts/${id}`,
            { headers: await getAuthHeader() }
        );
        console.log(response);
        return response.status;
    } catch(error) {
        console.error(error);
    }
    
};

