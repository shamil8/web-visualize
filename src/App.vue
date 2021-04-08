<template>
  <div id="app">
    <h1><img class="img-logo" src="@/assets/img/logo.svg" alt="Logo"> Web visualize</h1>
    <section>
      <csv-loader :defaultHeaderRowCount="1"  @loadSuccess="loadSuccess" />
    </section>

    <section class="table-container">
      <el-table
          v-if="csvHeader.length"
          :data="csvBody"
          @header-click="headerClick"
          height="500"
      >
        <el-table-column
            v-for="(item, idx) of csvHeader"
            :key="idx"
            :prop="idx.toString()"
            :label="item"
            width="180" />
      </el-table>
    </section>

    <br>
    <section v-if="labels">
      <h2>Chart examples</h2>

      <h4>1. <span v-if="column">Column: <i>{{ column }}</i> - </span>Bar chart</h4>
      <BarChart
          :labels="labels"
          :data="data"
          :label="column"
          class="bar-chart"
      />

      <h4>2. <span v-if="column">Column: <i>{{ column }}</i> - </span>Line chart</h4>
      <LineChart
          :labels="labels"
          :data="data"
          :label="column"
          class="line-chart"
      />

      <h4>3. <span v-if="column">Column: <i>{{ column }}</i> - </span>Pie chart</h4>
      <PieChart
          :labels="labels"
          :data="data"
          :bg-colors="bgColors"
          class="pie-chart"
      />

      <h4>4. <span v-if="column">Column: <i>{{ column }}</i> - </span>Bubble chart</h4>
      <BubbleChart class="bubble-chart" />

      <h4>5. <span v-if="column">Column: <i>{{ column }}</i> - </span>Dough-nut chart</h4>
      <DoughnutChart
          :labels="labels"
          :data="data"
          :bg-colors="bgColors"
          class="doughnut-chart"
      />
    </section>
    <p v-else-if="csvBody.length">You need to click in your data column!</p>
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
      csvBody: [],
      labels: null,
      data: null,
      bgColors: null,
      column: null
    }
  },
  methods: {
    loadSuccess(result) {
      if (result.csvHeader) {
        this.csvHeader = Object.values(result.csvHeader[0])
        this.csvBody = result.csvBody
      } else {
        this.$message.warning('Выбранный файл пусто!')
      }
    },
    headerClick({ label, property }) {
      this.labels = null

      setTimeout(() => {
        this.column = label
        const dataForChart = this.csvBody.map(item => item[property]).reduce((acc, val) => {
          acc[val] = acc[val] ? acc[val] + 1 : 1

          return acc
        }, {})

        this.labels = Object.keys(dataForChart).sort()
        this.data = Object.values(dataForChart)
        this.bgColors = new Array(this.labels.length)
            .fill(0)
            .map(() => '#' + ((1 << 24) * Math.random() | 0).toString(16))
      })
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
