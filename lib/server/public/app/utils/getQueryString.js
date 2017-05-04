import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';

import unwrapValue from './unwrapValue';

export default function getQueryString(query){
  var filtered_query = omitBy(query, (v) => v === null || v === undefined || isNaN(v));
  return '?' + map(mapValues(filtered_query, unwrapValue), (value, key) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
}
