<template>
  <div class="about">
    <a href="https://reqres.in/" target="_blank" rel="noreferrer noopenner">
      使用Reqres來試試看CRUD
    </a>
    <div class="userContainer">
      <h6>1. Get All Users</h6>
      <div v-if="axioLoading">Loading</div>
      <div v-else-if="axioError">Error</div>
      <div v-else-if="userData.length === 0">No data</div>
      <div v-else class="userBox">{{userData}}</div>

      <h6>2. Update pagination</h6>
      <div class="pagination">
        <button v-for="page in total_pages" :key="page" @click="selectPage(page)">
          {{page}}
        </button>
      </div>

      <h6>3. Get total</h6>
      <div>Total users: {{total}}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      axioLoading: false,
      axioError: false,
      params: {
        page: 1,
        per_page:5
      },
      total_pages: 0,
      total: 0,
      userData: []
    }
  },
  created(){
    this.axioLoading = true
  },
  mounted(){
    this.fetchUsers()
  },
  methods: {
    fetchUsers(){
      this.total_pages = 0

      // axios.get('https://reqres.in/api/users/3').then((response) => {
      axios.get('https://reqres.in/api/users', { 
        params: this.params
      }).then((response) => {
        // console.log(response);
        if(response.status === 200 && response.data){
          this.axioError = false
          const {data, total_pages, total} = response.data
          this.total_pages = total_pages
          this.total = total
          this.userData = data ? data: []
        }else{
          this.axioError = true
          this.userData = []
        }
      }).catch((err) => {
        // console.log('錯誤:', err.response)
        if(err.response.status === 404){
          this.axioError = false
          this.userData = []
        }else{
          this.axioError = true
        }
      }).finally((re) => {
        this.axioLoading = false
      })
    },
    selectPage(page){
      this.params.page = page
      this.fetchUsers()
    }
  }
}
</script>
<style lang="scss" scoped>
.userContainer{
  min-height: 50vh;
}
.userBox {
  min-height: 25vh;
}
.pagination{
  button{
    margin: 3px;
  }
}
</style>

