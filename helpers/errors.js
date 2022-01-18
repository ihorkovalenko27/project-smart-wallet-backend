class AppError extends Error {
  status;

  constructor(status,message) {
    super(message)
    this.status = status;
   
  }
  static NotAuthorizedError(message){
    return new AppError(401,message);
  }
  static RegisterConflictError(){
    return new AppError(409,'Email in use');
  }
  static NotFoundError(){
    return new AppError(404,'Not found');
  }
  static BadRequest(message){
    return new AppError(400,message);
  }
 
}
module.exports = AppError;
  