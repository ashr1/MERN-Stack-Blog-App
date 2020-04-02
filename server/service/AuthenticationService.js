const jwt = require('jsonwebtoken');

class AuthenticationService {
    generate = async (user) => {
        return await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
            data: user
        }, process.env.JWT_SECRET);
    };
}

const AuthenticationServiceSingleton = new AuthenticationService();

export default AuthenticationServiceSingleton;

