import analysis_component from './components/analysis.component';

new Vue({
  el: '#app',
  data: {
    title: 'Seedalpha Coding Challenge'
  },
  components: {
    'seedalpha-analysis': analysis_component
  }
});
