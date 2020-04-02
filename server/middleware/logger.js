export default (req,res,next) => {
    console.log(
        '=>',
        req.method,
        req.originalUrl,
        ' || ',
        'isAuthenticated: ',
        typeof req.user === 'object',
        'isAdmin: ',
        req.isAdmin
    );
   // console.log(req.user);
    next();
}