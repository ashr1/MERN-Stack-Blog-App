class EmailService {
    sendEmail = (user,token) => {
       // console.log(`[Email Service.sendEmail] The token is: ${token}`);
       console.log(`[Email Service.sendEmail] Magic Link for:  ${user.email} ${user.role} http://localhost:3000/auth/${token}`)
    };
}

const EmailServiceSingleton = new EmailService();

export default EmailServiceSingleton;