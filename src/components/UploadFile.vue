<template>
  <el-upload
      action="https://adab.tj/udate/"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :auto-upload="false"
  >
    <template v-if="!isChose">
      <el-button size="small" type="primary">Выбрать .csv файл</el-button>
      <div slot="tip" class="el-upload__tip">csv files with a size less than 20mb</div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadFile.vue',
  data() {
    return {
      isChose: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log('Removing a file...')
      console.log(file, fileList)
      this.isChose = false
    },
    handleChange(file, uploadFiles) {
      this.isChose = true
      console.log('Choose file', file)
      console.log('uploadFiles', uploadFiles)

    },
    beforeRemove(file) {
      return this.$confirm(`Удалить файл ${ file.name } ?`)
    }
  }
}
</script>

<style scoped>

</style>