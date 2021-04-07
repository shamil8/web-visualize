import Vue from 'vue'
import {
  Button,
  Input,
  Table,
  TableColumn,
  Message,
  MessageBox
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)

locale.use(lang)

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
