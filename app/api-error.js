class ApiError extends Error {
    constructor (statusCode, mesage){
        super();
        this.statusCode = statusCode;
        this.message = mesage;
    }
}

module.exports = ApiError;