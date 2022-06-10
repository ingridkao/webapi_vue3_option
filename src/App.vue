<template>
  <nav>
    <router-link 
      v-for="(iten, index) in routers" 
      :key="index" 
      :to="iten.path"
    >
      {{iten.name}}
    </router-link>
  </nav>
  <router-view class="routerView"/>
</template>

<script>
// import {routes} from '@/router/index.js'
// 要偷懶寫成這樣也是可以啦
import {routes} from '@/router'
export default {
  data(){
    return {
      // routers: [
      //   {path: "/", name: "Home"},
      //   {path: "/about", name: "About"},
      //   {path: "/weather", name: "Weather"}
      // ]
      routers: routes
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  padding: 5px;
  color: #2c3e50;
  &:hover{
    color: #42b983;
  }
}

nav {
  padding: 30px;
  a {
    display: inline-block;
    font-weight: bold;
    &:after{
      content: '|';
      padding: .5rem;
    }
    &:last-child:after{
      display: none;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.routerView{
  margin: 0px 30px;
  padding: 15px;
  background-color: #efefef;
}
</style>
