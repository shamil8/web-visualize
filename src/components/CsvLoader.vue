<template>
  <div id="csv-to-table">
    <h3>{{ uploadButtonLabelText }}</h3>
    <div class="field-header-row">
      <span>{{ headerRowCountLabelText }}</span>
      <el-input
          v-model="headerRowCount"
          id="headerRowCount"
          size="small"
      />
    </div>

    <div class="field-body">
      <el-button :loading="loading" @click="$refs.uploadFile.click()" type="primary">
        Upload<i class="el-icon-upload el-icon-right"></i>
      </el-button>
      <input ref="uploadFile" v-show="false" type="file" @change="uploaded" />
      <template v-if="fileName.length">
        <span class="file-label">{{ uploadButtonText }}</span>
        <span class="file-name">{{ fileName }}</span>
      </template>

      <br><br><i v-if="loading" class="el-icon-loading" />
    </div>
  </div>
</template>

<script>
import Encoding from 'encoding-japanese'

export default {
  name: 'CsvLoader',
  props: {
    defaultHeaderRowCount: {
      type: Number,
      default: 0,
      required: false
    },
    headerRowCountLabelText: {
      type: String,
      default: 'Header rows count',
      required: false
    },
    uploadButtonLabelText: {
      type: String,
      default: 'Choosing csv file',
      required: false
    },
    uploadButtonText: {
      type: String,
      default: 'Chose file: ',
      required: false
    }
  },
  created: function() {
    this.headerRowCount = this.defaultHeaderRowCount;
  },
  data() {
    return {
      headerRowCount: 0,
      labelHeaderRowCount: '',
      fileName: '',
      loading: false
    }
  },
  methods: {
    uploaded(e) {
      const file = e.target && e.target.files && e.target.files[0]
      if (file) {
        this.fileName = file.name
        this.loadCsv(file, sjisData => {
          const arr = sjisData.split(/$/mg).filter(it => it.length > 1).map(item => item.split(','))
          const header = this.headerRowCount > 0 ? arr.slice(0, this.headerRowCount) : []
          const body = this.headerRowCount > 0 ? arr.slice(this.headerRowCount, arr.length - 1) : arr

          this.$emit('loadSuccess', { csvHeader: header, csvBody: body })
          this.loading = false
        })
      }
    },
    loadCsv(file, callBack) {
      const reader = new FileReader()
      this.loading = true
      reader.onerror = function() {
        alert(`${file} Не получилось загрузить файл(;`)
      }
      reader.onload = () => {
        try {
          const str = new TextDecoder().decode(new Uint8Array(reader.result))
          const sjisData = Encoding.convert(str, {
            to: 'UNICODE',
            from: 'AUTO'
          })

          callBack(sjisData)
        } catch (e) {
          // Call stack overflow
          this.$message.error('Файл слишком большой ;(')
          return 1
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style>
/* header row */
.field-header-row {
  margin: 15px 0;
}
.field-header-row .el-input {
  display: inline;
}
#headerRowCount {
  width: 50px;
  padding: 0;
  margin-left: 10px;
  font-size: 14px;
  text-align: center;
}

/* body chose button */
.field-body {
  margin-bottom: 30px;
}

.field-body .el-button {
  margin-right: 15px;
}

.file-name {
  margin-left: 5px;
  font-weight: bold;
  background: #e3ee1e;
  padding: 5px 10px;
  border-radius: 10px;
}

</style>