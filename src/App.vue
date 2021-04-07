<template>
  <div id="app">
    <h1><img class="img-logo" src="./assets/logo.svg" alt="Logo"> Web visualize</h1>
    <section>
      <csv-loader
          :defaultHeaderRowCount="1"
          @loadSuccess="loadSuccess"
      />
    </section>

    <section class="table-container">
      <table class="table is-bordered is-hoverable is-fullwidth">
        <thead>
        <tr v-for="(row, rowIndex) in csvHeader" v-bind:key="rowIndex">
          <td v-if="showCheckbox && rowIndex === 0">
            <input type="checkbox" />
          </td>
          <th v-for="(data, colIndex) in row" v-bind:key="colIndex">{{ data }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in csvBody" v-bind:key="rowIndex">
          <td v-if="showCheckbox">
            <input type="checkbox" @change="onCheckBoxCheck(row)" />
          </td>
          <td v-for="(data, colIndex) in row" v-bind:key="colIndex">{{ data }}</td>
        </tr>
        </tbody>
        <el-table
            :data="csvBody"
            border
            style="width: 100%">
          <el-table-column
              prop="date"
              label="Date"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="Name"
              width="180">
          </el-table-column>
          <el-table-column
              prop="address"
              label="Address">
          </el-table-column>
        </el-table>
      </table>
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
      this.csvHeader = result.csvHeader
      this.csvBody = result.csvBody
      console.clear()
      console.log('csvHeader', this.csvHeader)
      console.log('csvBody', this.csvBody)
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
</style>
