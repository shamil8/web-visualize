<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: {
    labels: { type: Array, default: () => ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'] },
    data: { type: Array, default: () => [40, 20, 80, 10] },
    bgColors: { type: Array, default: () => [
        '#41B883',
        '#E46651',
        '#00D8FF',
        '#DD1B16'
      ]
    },
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.bgColors,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>
#doughnut-chart {
  margin: 0 auto;
  /*max-width: 600px;*/
}
</style>