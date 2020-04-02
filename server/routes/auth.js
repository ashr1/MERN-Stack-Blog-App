import AuthenticationService from '../service/AuthenticationService';
import EmailService from '../service/EmailService';
import { UserModel } from '../models/User';

export default (app) => {
    app.post('/v1/auth', async (req,res) => {
        if(req.user) {
            console.log(req.user)
            res.send(req.user);
        }
        res.status(401).end();
    });

    app.post('/v1/login', async (req,res) => {
        
        const { email } = req.body;
        console.log(email)
        if(!email || email.split('@').length !== 2) {
            return res.status(400).end();
        }

        const user = await UserModel.findOne({ email });

        if(user) {

            const token = await AuthenticationService.generate(user);
            console.log('User exists. Generating a new token.');
            EmailService.sendEmail(user,token);
            res.status(200).end();

        } else {

            const newUser = await UserModel.create({
                username: email.split('@')[0],
                email,
                role: 'user'
            });

            const token = AuthenticationService.generate(newUser);
            console.log('Created a new user: ', newUser);
            EmailService.sendEmail(newUser,token);
            res.status(200).end();

        }
    });
}