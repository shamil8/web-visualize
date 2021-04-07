<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: {
    labels: { type: Array, default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    data: { type: Array, default: () => [40, 20, 12, 39, 10, 60, 39, 30, 40, 20, 12, 11] },
    label: { type: String, default: 'Data One' },
    bgColor: { type: String, default: '#1149d9' },
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          backgroundColor: this.bgColor,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>
#line-chart {
  margin: 0 auto;
  max-width: 600px;
}
</style>