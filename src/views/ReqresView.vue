<template>
  <div>
    <a href="https://reqres.in/" target="_blank" rel="noreferrer noopenner">
      使用Reqres來試試看Get user
    </a>
    <div>
      <h6>取得All users - XMLHttpRequest</h6>
      <div v-if="XMLHttpError">Error</div>
      <div v-else>{{userAllData && userAllData.data? userAllData.data: 'Error'}}</div>
    </div>
    <div>
      <h6>取得Page2 的 users - Fetch API</h6>
      <div v-if="fetchError">Error</div>
      <div v-else>{{userPageData && userPageData.data? userPageData.data: 'Error'}}</div>
    </div>
    <div>
      <h6>取得target users - Axios</h6>
      <div v-if="axioError">Error</div>
      <div v-else>{{targeUserData && targeUserData.data? targeUserData.data: 'Error'}}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      XMLHttpError: false,
      fetchError: false,
      axioError: false,
      userAllData: [],
      userPageData: [],
      targeUserData: {}
    }
  },
  created(){
    // 當網速慢或是資料很大的時候，放在created或mounted會有很大的差異
    // 在組件渲染前就去抓資料，看loading function怎麼寫(全域如vuex)
    // console.log('created');
  },
  mounted(){
    //在組件渲染後再去抓資料，看loading function怎麼寫
    // console.log('mounted');
    this.XMLHttpRequestFunc()
    this.FetchAPIFunc()
    this.AxiosFunc()
  },
  methods: {
    XMLHttpRequestFunc(){
      // JavaScript的原生物件，不需引入任何函式庫
      // 缺點： 每次使用就要new一個XMLHttpRequest物件
      //1. 初始化一個請求: (method, url, 同步｜非同步）
      //2. 發送請求
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://reqres.in/api/users', true)
      xhr.send()
      xhr.onload = () => { 
        switch (xhr.status) {
          case 200:
            this.XMLHttpError = false
            this.userAllData = JSON.parse(xhr.response)
            break;
          default:
            this.XMLHttpError = true
            break;
        }
      };
      xhr.onerror = function (err) {
        this.XMLHttpError = true
        console.log('錯誤:', err)
      }
    },
    FetchAPIFunc(){
      // 使用ES6的Promise物件做回傳的處理，不需引入任何函式庫
      // 可以搭配 async/await
      // 可以用Headers物件設定表頭
      // 缺點：舊瀏覽器如IE不支援

      //寫法一
      // const req = new Request('https://reqres.in/api/users?page=2', { method: 'GET', cache: 'reload' })
      // fetch(req).then((response) => {

      //寫法＝:Get method不能帶body
      // fetch('https://reqres.in/api/users?page=2').then((response) => {

      //寫法三:組URL
      const params = {page: 2}
      const url = new URL("https://reqres.in/api/users")
      for (let k in params) { url.searchParams.append(k, params[k])}
      fetch(url).then((response) => {

        // console.log(response);
        this.fetchError = (response.status !== 200)
        return response.text()

      }).then(responseText => {
        // console.log(responseText);
        this.userPageData = JSON.parse(responseText)
        
      }).catch((err) => {
        this.fetchError = true
        console.log('錯誤:', err)
      })
    },
    AxiosFunc(){
      //可以搭配 async/await，支持Promise
      //支持Promise
      //自動轉換JSON資料
      //不限瀏覽器

      axios.get('https://reqres.in/api/users/3').then((response) => {
        // console.log(response);
        //如果要帶參數
      // axios.get('https://reqres.in/api/users', { params: { page: 2 } }).then((response) => {
        this.axioError = (response.status !== 200)
        this.targeUserData = response.data
      }).catch((err) => {
        this.axioError = true
        console.log('錯誤:', err)
      })
    }
  }
}
</script>
