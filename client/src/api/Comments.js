import axios from './axios';
import Comment from '../models/Comment';
import getAuthHeader from './getAuthHeader';

export const getComments = async (postId) => {
    try {
        const { data, status } = await axios.get(
            `/v1/comments/${postId}`
        );
        if(status !== 200) {
            return [];
        }                               
        return data.map((rawComment) => (new Comment(rawComment)));
    } catch(error) {
        console.error(error);
    }
}

export const addComment = async (body) => {
    try {
        const { status, data } = await axios.post(
            '/v1/comments',
            body,
            { headers: await getAuthHeader() }
        );
        return { 
            status, 
            data: new Comment(data)
        };
    } catch(error) {
        return {
            error: 'an unknown error occurred'
        };
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await axios.delete(
            `/v1/comments/${id}`,
            { headers: await getAuthHeader() }
        );
        console.log(response);
        return response.status;
    } catch(error) {
        console.error(error);
    }
    
};

export const updateComment = async (id, body) => {
    try {
        
        const { data, status } = await axios.put(
            `/v1/comments/${id}`,
            body,
            { headers: await getAuthHeader() }
        );
        
        if((data && data._id) || status === 200) {
            return {
                success: true,
                data: new Comment(data)
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


