<template>
  <div class="about">
    <a href="https://reqres.in/" target="_blank" rel="noreferrer noopenner">
      使用Reqres來試試看CRUD
    </a>
    <div class="userContainer">
      <h6>5. Search ID</h6>
      <div>
        <input type="text" v-model="search" @keyup="searchUser">
      </div>

      <h6>4. Desigh Users List</h6>
      <div v-if="axioLoading">Loading</div>
      <div v-else-if="axioError">Error</div>
      <div v-else-if="userData.length === 0">No data</div>
      <div v-else class="userBox">
        <div v-for="item in userData" :key="item.id">
          <b>{{`${item.first_name} ${item.last_name}`}}</b>
          <p>{{item.email}}</p>
          <div class="imgBox">
            <img :src="item.avatar" :alt="`${item.first_name} ${item.last_name}`">
          </div>
        </div>
      </div>

      <h6>2. Update pagination</h6>
      <div class="pagination">
        <button v-for="page in total_pages" :key="page" @click="selectPage(page)">
          {{page}}
        </button>
      </div>
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
      page: 1,
      per_page:5,
      total_pages: 0,
      search: "",
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
      let fetchURL = 'https://reqres.in/api/users'
      if(this.search){
        //一般來說search後端不該這樣寫，這個僅能做information
        fetchURL = fetchURL + `/${this.search}`
        this.params = {}
      }else{
        this.params = {
          page: this.page,
          per_page: this.per_page
        }
      }
      axios.get(fetchURL, { 
        params: this.params
      }).then((response) => {
        // console.log(response);
        if(response.status === 200 && response.data){
          this.axioError = false
          const {data, total_pages} = response.data
          this.total_pages = total_pages
          this.userData = Array.isArray(data) ? data: [data]
        }else{
          this.axioError = true
          this.userData = []
        }
      }).catch((err) => {
        // console.log('錯誤:', err.response)
        this.axioError = (err.response.status !== 404)
      }).finally((re) => {
        this.axioLoading = false
      })
    },
    selectPage(page){
      this.page = page
      this.fetchUsers()
    },
    searchUser(){
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
  >div{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 5px 10px;
    p{
      margin: 5px;
    }
    .imgBox{
      width: 128px;
      height: 128px;
      margin: auto;
      img{
        width: 100%;
      }
    }
  }
}
.pagination{
  button{
    margin: 3px;
  }
}
</style>

