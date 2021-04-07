<script>
import { Bubble } from 'vue-chartjs'

export default {
  name: 'BubbleChart',
  extends: Bubble,
  props: {
    data: { type: Array, default: () => [40, 20, 80, 10] },
  },
  mounted () {
    this.renderChart({
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [
            {
              x: 20,
              y: 25,
              r: 5
            },
            {
              x: 40,
              y: 10,
              r: 10
            },
            {
              x: 30,
              y: 22,
              r: 30
            }
          ]
        },
        {
          label: 'Data Two',
          backgroundColor: '#7C8CF8',
          data: [
            {
              x: 10,
              y: 30,
              r: 15
            },
            {
              x: 20,
              y: 20,
              r: 10
            },
            {
              x: 15,
              y: 8,
              r: 30
            }
          ]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>
#bubble-chart {
  margin: 0 auto;
  max-width: 600px;
}
</style>