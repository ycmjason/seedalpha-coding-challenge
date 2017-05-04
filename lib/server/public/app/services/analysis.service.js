import apiService from './api.service';

import pureDate from '../utils/pureDate';

const ENDPOINT = './api/analysis';

function AnalysisService(){ }

AnalysisService.prototype.get = function(date){
  return apiService.get(ENDPOINT, {date: pureDate(date)});
};

export default new AnalysisService()
