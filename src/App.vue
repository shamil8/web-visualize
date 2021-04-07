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
  </div>
</template>

<script>
import CsvLoader from '@/components/CsvLoader'

export default {
  name: 'App',
  components: {
    CsvLoader,
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
</style>
