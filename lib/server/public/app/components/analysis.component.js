import analysisService from '../services/analysis.service';
import pureDate from '../utils/pureDate';
import monthName from '../utils/monthName';


var analysis_component = {
  props: {
    date: Date,
    show: false
  },
  created: function(){
    this.date = pureDate(this.date);

    analysisService.get(this.date)
      .then(res => {
        this.analyses = res;
      });
  },
  filters: {
    'pureDate': function(date){
      return `${date.getDate()} ${monthName(date.getMonth())}, ${date.getFullYear()}`;
    },
  },
  template: `
<div>
  <button v-bind:class="{'button-primary': show}" v-on:click="show =! show">{{date | pureDate}}</button>
  <div v-if="show">
  </div>
</div>
`
};

export default analysis_component;
