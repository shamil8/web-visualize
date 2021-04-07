<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
  props: {
    labels: { type: Array, default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    data: { type: Array, default: () => [40, 20, 12, 39, 10, 60, 39, 30, 40, 20, 12, 11] },
    label: { type: String, default: 'GitHub Commits' },
    bgColor: { type: String, default: '#009237' },
  },
  mounted () {
    // Overwriting base render method with actual data.
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
#bar-chart {
  margin: 0 auto;
  max-width: 600px;
}
</style>