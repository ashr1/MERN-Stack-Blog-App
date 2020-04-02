import mongoose, { Schema, Types } from 'mongoose';
import { CommentModel } from '../models/Comment';

export default (app) => {

    app.get('/v1/comments/:id', async (req, res) => {
        const post_id = req.params.id;
        
        if(!post_id) {
            res.status(500).end();
            return;
        }
        
        const comments = await CommentModel.find({ post_id: Types.ObjectId(`${post_id}`) } ) || [];
        
        res.send(comments);
    });

    app.post('/v1/comments', async (req, res) => {
        if(req.user && req.user.data && (req.user.data.role === 'admin' || req.user.data.role === 'user')) {
            const comment = await CommentModel.create(req.body);
            if(comment) {
                res.send(comment);
            } else {
                res.status(500).end();
            }
        }
        res.status(401).end();
    });

    app.put('/v1/comments/:id', async (req, res) => {
        if(req.user && req.user.data) {
            const comment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
             
                    if(!comment) {
                        res.status(500).end();
                    } else {
                        res.send(comment);
                    }
                
        
        } else {
            res.status(401).end();
        }
        
    });

    app.delete('/v1/comments/:id', (req, res) => {
        //req.user && req.user.data && req.user.data.role === 'admin'
        if(req.user && req.user.data) {
            
            CommentModel.findByIdAndDelete(req.params.id, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        }
        else {
            res.status(401).end();
        }
        
    });

}
