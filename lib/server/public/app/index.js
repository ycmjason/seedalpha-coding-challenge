import analysis_component from './components/analysis.component';
import monthName from './utils/monthName';
import pureDate from './utils/pureDate';

const DATE_FROM_DATE = 19;
const DATE_FROM_MONTH = 3;
const DATE_TO_DATE = 5;
const DATE_TO_MONTH = 4;

new Vue({
  el: '#app',
  data: {
    title: 'Seedalpha Coding Challenge',
    dates: [],
    dateFrom: new Date(2017, DATE_FROM_MONTH, DATE_FROM_DATE),
    dateFromDefaultDate: DATE_FROM_DATE,
    dateFromDefaultMonth: DATE_FROM_MONTH,
    dateTo: new Date(2017, DATE_TO_MONTH, DATE_TO_DATE),
    dateToDefaultDate: DATE_TO_DATE,
    dateToDefaultMonth: DATE_TO_MONTH,
  },
  created: function(){ this.updateDates(); },
  methods: {
    monthName: monthName,
    updateDates: function(){
      var ONE_DAY = 24 * 60 * 60 * 1000;
      var number_of_days = (pureDate(this.dateTo).getTime() - pureDate(this.dateFrom).getTime()) / ONE_DAY;

      var dates = [];
      for(let i = 0; i <= number_of_days; i++){
        dates.push(new Date(this.dateFrom.getTime() + i * ONE_DAY));
      }

      this.dates = dates;
    }
  },
  components: {
    'seedalpha-analysis': analysis_component
  }
});
