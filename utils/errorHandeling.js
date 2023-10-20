export class ErrorHandler{
    constructor(){
        this.message = "Server Error";
        this.statusCode = 500;
    }
    Errors(message, statusCode, req, res, next){
        this.message = message;
        this.statusCode = statusCode;
        return res.status(200).json({
            status: "failed", 
            message: this.message
        })
    }
}
