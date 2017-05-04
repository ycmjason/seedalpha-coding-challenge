import padStart from 'lodash/padStart';

import analysisService from '../services/analysis.service';
import pureDate from '../utils/pureDate';
import monthName from '../utils/monthName';

var shared = {
  show: null,
};


var analysis_component = {
  props: {
    date: Date,
  },
  data: function(){
    return {
      analyses: [],
      shared: shared
    }
  },
  created: function(){
    this.date = pureDate(this.date);

    analysisService.get(this.date)
      .then(res => res.sort((a, b) => a.hour-b.hour))
      .then(res => this.analyses = res);
  },
  methods: {
    summary: function(){
      var sum = (a, b) => a+b;
      var positive_count = this.analyses.map(a => a.positive).reduce(sum, 0);
      var neutral_count = this.analyses.map(a => a.neutral).reduce(sum, 0);
      var negative_count = this.analyses.map(a => a.negative).reduce(sum, 0);
      return {
        positive: positive_count,
        neutral: neutral_count,
        negative: negative_count
      };
    },
    hour: function(hour){
      var ONE_HOUR = 60 * 60 * 1000;
      var padZero = (s) => padStart(s, 2, '0');
      var showHour = (date) => `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      var from = new Date(this.date.getTime() + hour * ONE_HOUR);
      var to = new Date(this.date.getTime() + (hour + 1) * ONE_HOUR);
      return `${showHour(from)}-${showHour(to)}`;
    } 
  },
  filters: {
    'analysis_count': function(a){
      var total = a.positive + a.neutral + a.negative;
      return `pos: ${a.positive}, neu: ${a.neutral}, neg: ${a.negative}, total: ${total}`;
    },
    'pureDate': function(date){
      return `${date.getDate()} ${monthName(date.getMonth())}, ${date.getFullYear()}`;
    }
  },
  template: `
<div>
  <button v-bind:class="{'button-primary': shared.show == date}" v-on:click="shared.show !== date? shared.show = date: shared.show = null">{{date | pureDate}} ({{summary() | analysis_count}})</button>
  <div v-if="shared.show == date">
    <div >
    </div>
    <table class="u-full-width">
      <thead>
        <tr>
          <th>Hour</th>
          <th>Overview</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="analysis in analyses">
          <td>{{hour(analysis.hour)}}</td>
          <td>{{analysis | analysis_count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`
};

export default analysis_component;
