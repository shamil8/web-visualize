<template>
  <div id="app">
    <h1><img class="img-logo" src="@/assets/img/logo.svg" alt="Logo"> Web visualize</h1>
    <section>
      <csv-loader :defaultHeaderRowCount="1"  @loadSuccess="loadSuccess" />
    </section>

    <section class="table-container">
      <el-table v-if="csvHeader.length" :data="csvBody">
        <el-table-column
            v-for="(item, idx) of this.csvHeader"
            :key="idx"
            :prop="idx.toString()"
            :label="item"
            width="180" />
      </el-table>
    </section>

    <h2>Chart examples</h2>
    <section>
      <h4>1. Bar chart</h4>
      <BarChart class="bar-chart" />

      <h4>2. Line chart</h4>
      <LineChart class="line-chart" />

      <h4>3. Pie chart</h4>
      <PieChart class="pie-chart" />

      <h4>4. Bubble chart</h4>
      <BubbleChart class="bubble-chart" />

      <h4>5. Dough-nut chart</h4>
      <DoughnutChart class="doughnut-chart" />
    </section>
  </div>
</template>

<script>
import CsvLoader from '@/components/CsvLoader'
import BarChart from '@/components/charts/Bar'
import LineChart from '@/components/charts/Line'
import PieChart from '@/components/charts/Pie'
import BubbleChart from '@/components/charts/Bubble'
import DoughnutChart from '@/components/charts/Doughnut'

export default {
  name: 'App',
  components: {
    CsvLoader,
    BarChart,
    LineChart,
    PieChart,
    BubbleChart,
    DoughnutChart
  },
  data () {
    return {
      showCheckbox: true,
      csvHeader: [],
      csvBody: []
    }
  },
  methods: {
    loadSuccess: function(result) {
      if (result.csvHeader) {
        this.csvHeader = Object.values(result.csvHeader[0])
        this.csvBody = result.csvBody
      } else {
        alert('Выбранный файл пусто!')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app h1 {
  font-size: 40px;
}

.img-logo {
  width: 64px;
}

.table-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Charts containers */
.line-chart, .pie-chart, .bubble-chart, .doughnut-chart {
  margin-bottom: 35px;
}

h4 {
  margin-bottom: 5px;
}
</style>
