import getQueryString from '../utils/getQueryString';

function ApiService(){ }

ApiService.prototype.get = function(endpoint, query){
  // `query` would be a key/value pair object
  return fetch(endpoint + getQueryString(query)).then((res) => res.json())
};

ApiService.prototype.post = function(endpoint, query){
  // TODO: NOT IMPLEMENTED
};

ApiService.prototype.put = function(endpoint, query){
  // TODO: NOT IMPLEMENTED
};

export default new ApiService();
