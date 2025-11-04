const { StatusCodes } = require("http-status-codes");
const AppErrors = require("./error-handler");


class ValidationError extends AppErrors{
    constructor(error){
        let errorname = error.name
        let description = []

        error.errors.forEach((err) => {
            description.push(err.message)
        });

        super(
            errorname,"Not able to validate the data sent in the request",description,StatusCodes.BAD_REQUEST
        )
    }
}



module.exports = ValidationError