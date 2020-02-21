const { getById } = require('../users/userDb');

const logger = (req, res, next) => {
    console.log(req.method, req.originalUrl, new Date());
    next();
}

const validateUserId = async (req, res, next) => {
    if( !req.params.id ) next( new Error("No user ID provided") );

    try {
        verifiedByID = await getById(req.params.id);
        if( verifiedByID ){
            req.user = verifiedByID;
            next(); 
        } else {
            res.status(400).send(JSON.stringify({message: "invalid user id"}));
        }
    }

    catch (exception) {
        next( new Error(String(exception)) );
    }
    
}

const validateUser = (req, res, next) => {
    if( !req.body ) return res.status(400).send( JSON.stringify( { message: "missing user data"} ) );
    if( !req.body.name ) return res.status(400).send( JSON.stringify( { message: "missing required name field" } ) );
    next();
}

const validatePost = (req, res, next) => {
    if( !req.body ) res.status(400).send(JSON.stringify({message: "missing post data"}));
    if( !req.body.text ) res.status(400).send(JSON.stringify({message: "missing required text field"}));
    next();
}

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost
}