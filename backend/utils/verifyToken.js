const jwt = require('jsonwebtoken');
const createError = require('./error.js');

//TODO: Middleware to validate JWT token

// module.exports = (req, res, next) => {
//     try {
        // Get the token from the request header
//         const token = req.headers.authorization.split(' ')[1];

        // Verify the token
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//               if (err) {
//                 throw createError(401, 'Invalid token');
//             }
//             req.user = decoded;
//             next();
//         });
//     } catch (error) {
//         next(createError(401, 'Unauthorized'));
//     }
// };


//TODO: Middleware to verify JWT token using [cookies]:
const verifyToken = (req,res,next)=>{
    try{
        const token = req.headers['authorization'].split(' ')[1]
        // const token = req.cookies.token;
        console.log(token)
    if(!token){
        return next(createError(401,"Authentication failed: No token provided."));
    };
    jwt.verify(token, process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(createError(403,'Token is not valid!'));
        };
        console.log('token is correct')

        // If token is valid, add the decoded user to the request object  so it can be accessed in subsequent middleware/routes.
        // new request property:
        // console.log(decoded)
        req.user = decoded;
        // Pass the control to the next middleware or endpoint:
        next();
    });
    } catch (error) {
        console.log('error: ',error)
        next(createError(401, 'Unauthorized'));
    }
};

//TODO: Middleware to verify User:
const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log('----------------- inside verify user -----------------------')
        if(req.user.id === req.params.id || req.user.isAdmin){
            console.log('This is verified user!')
            next();
        }else{
            console.log('Unauthorized User!')
            return next(createError(403, "You are not authorized!"));
        };
    });
};

//TODO: Middleware to verify Admin:
const verifyAdmin = (req,res,next)=>{
    console.log('---------------inside verify admin------------------')
    verifyToken(req,res,()=>{
        console.log('admin check: ',req.user)
        if(!req.user){
            console.log('user not found')
            // return next(createError(403, "You are not authorized!"));
        }
        // console.log('id: ',req.user.id === req.params.id)
        else if(req.user.isAdmin){
            //or
        // if(req.user.id === req.params.id && req.user.isAdmin){
            console.log('admin True: ',req.user.isAdmin)
            next();
        }else{
            console.log('you are  not admin',req.user.isAdmin)
            return next(createError(403, "You are not authorized!"));
        };
    });
};

module.exports = {verifyToken, verifyUser,verifyAdmin};