import constants from 'helper/constants/constants';

/*                                                                                                    
// Api requests are required to return an object containing
// three properties: status, body, error - use response()
// to create this object
*/

class API {
  static response(err, res, callback) {
    let status; 

    if (res && res.statusCode === 200) {
      status = constants.api.success;
    } else {
      status = constants.api.failure;
    }

    callback({
      status,
      res,
      err,
    });
  }

  constructor(baseUrl) {
    // Properties
    this.baseUrl = baseUrl;
  }
}

export default API;
