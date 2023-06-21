class LoggerService {
  // logger
  LoggerHandler = (status, message = "", response, data = {}) => {
    let success = status == 200 || status == 201 ? true : false;

    return response
      .status(status)
      .json({ message: message, status: status, success: success, data });
  };
}
module.exports = new LoggerService();
