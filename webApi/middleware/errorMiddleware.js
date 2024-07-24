const LightItClientErrors = require('../../lightItErrors/LightItClientErrors');
 
const errorMiddleware = (err, req, res, next) => {
    if(err instanceof LightItClientErrors.BadRequestError || err instanceof LightItClientErrors.ForbiddenError){
        return res.status(err.statusCode).send({ message: err.message});
    }

    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({message: "Internal server error" });
};

module.exports = errorMiddleware;
