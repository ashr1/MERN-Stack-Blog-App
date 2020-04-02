import UserModel from '../models/User';

const user1 = new UserModel({
    id: '1',
    username: 'blah1',
    email: 'blahmanmblah@goomail.com',
    role: 'user'
});

const user2 = new UserModel({
    id: '2',
    username: 'john',
    email: 'johnabra@yaguuu.com',
    role: 'admin'
});

const users = [user1.getData(), user2.getData()];

export default users;