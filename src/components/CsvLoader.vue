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
      <el-button @click="$refs.uploadFile.click()" type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-button>
      <input ref="uploadFile" v-show="false" type="file" @change="uploaded" />
      <template v-if="fileName.length">
        <span class="file-label">{{ uploadButtonText }}</span>
        <span class="file-name">{{ fileName }}</span>
      </template>
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
      default: 'Header Rows count',
      required: false
    },
    uploadButtonLabelText: {
      type: String,
      default: 'Choosing csv file',
      required: false
    },
    uploadButtonText: {
      type: String,
      default: 'Choose file...',
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
      fileName: ''
    };
  },
  methods: {
    onCheckBoxCheck: function() {},
    uploaded: function(e) {
      const file = e.target && e.target.files && e.target.files[0]
      if (file) {
        this.fileName = file.name;
        this.loadCsv(file, sjisData => {
          const lineArray = sjisData.split("\r")
          const itemArray = []
          let header = []
          let body = []
          for (let i = 0; i < lineArray.length; i++) {
            itemArray[i] = lineArray[i].split(",")
          }
          if (this.headerRowCount > 0) {
            header = itemArray.slice(0, this.headerRowCount);
            body = itemArray.slice(this.headerRowCount, itemArray.length - 1)
          } else {
            body = itemArray;
          }
          this.$emit("loadSuccess", {
            csvHeader: header,
            csvBody: body
          });
        });
      }
    },
    loadCsv: function(file, callBack) {
      const reader = new FileReader()
      reader.onerror = function() {
        alert(`${file}の読み込みに失敗しました。`)
      };
      reader.onload = () => {
        const str = String.fromCharCode.apply(
            "",
            new Uint8Array(reader.result)
        );
        const sjisData = Encoding.convert(str, {
          to: "UNICODE",
          from: "AUTO"
        });
        callBack(sjisData)
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