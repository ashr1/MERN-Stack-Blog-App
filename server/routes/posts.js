import { PostModel } from '../models/Post';

export default (app) => {

    app.get('/v1/posts', async (req, res) => {
        console.log(req.user)
        const { categories } = req.query;

        const categoriesList = categories ? categories.split(',') : [];

        const posts = await PostModel.find(
            categoriesList.length > 0 ?
            { categories: { $in: categoriesList } } :
            undefined
        ) || [];

        res.send(posts);
    });
    
    app.get('/v1/posts/:id', async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if(post) {
                res.send(post);
            } else {
                res.status(404).end();
            }
        } catch(e) {
            res.status(404).end();
        }
    });
    
    app.post('/v1/posts', async (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'admin') {
            const post = await PostModel.create(req.body);
            if(post) {
                res.send(post);
            } else {
                res.status(500).end();
            }
        }
        res.status(401).end();
    });
    
    app.put('/v1/posts/:id', (req, res) => {
        if(req.user && req.user.data && req.user.data.role === 'admin') {
            console.log('an admin wants to update post')
            PostModel.findByIdAndUpdate(req.params.id, 
                req.body, 
                (error) => {
                    if(error) {
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
        } else {
            res.status(401).end();
        }
        
    });

    app.delete('/v1/posts/:id', (req, res) => {
        
        if(req.user && req.user.data && req.user.data.role === 'admin') {
            
            PostModel.findByIdAndDelete(req.params.id, 
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
