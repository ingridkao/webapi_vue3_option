<template>
  <div>
    <a href="https://tdx.transportdata.tw/api-service/swagger/basic/2cc9b888-a592-496f-99de-9ab35b7fb70d#/Bike/BikeApi_Station" target="_blank" rel="noreferrer noopenner">
      使用TDX的Open data來取得自行車資料
    </a>
    <div>
      API呼叫次數限制:
      <ul>
        <li>若不使用API金鑰呼叫API，則僅能透過瀏覽器呼叫API，且每個呼叫來源端IP的上限為每日50次。</li>
        <li>使用API金鑰呼叫API，每個呼叫來源端IP呼叫次數限制為50次/秒 (無每日上限)。</li>
      </ul>
    </div>
    <div class="userContainer">
      <h6>
        1. 欲查詢縣市
        <select name="city" id="city" v-model="city" @change="selectCity">
          <option v-for="item in cityOption" :value="item" :key="item">{{item}}</option>
        </select>
      </h6>
 
      <h6>2. Get bike station List</h6>
      <div v-if="axioLoading">Loading</div>
      <div v-else-if="axioError">Error</div>
      <div v-else-if="bikeStationData.length === 0">No data</div>
      <div v-else class="bikeStaion">
        <div v-for="item in bikeStationData" :key="item.StationUID">
          <p>{{item.StationUID}}</p>
          <p>{{item.StationName.Zh_tw}}</p>
        </div>
      </div>

      <h6>2. Show map</h6>
      <a href="https://vue2-leaflet.netlify.app/quickstart/#hello-map" target="_blank" rel="noreferrer noopenner">
        Sample
      </a>
      <div id="mapContainer" class="mapaBox"></div>
      <!-- <h6>2. Update pagination</h6>
      <div class="pagination">
        <button v-for="page in total_pages" :key="page" @click="selectPage(page)">
          {{page}}
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const API_URL = 'https://tdx.transportdata.tw/api/basic/'
const CITY_OPTION = [
  "Taichung",
  "Hsinchu",
  "MiaoliCounty",
  "NewTaipei",
  "PingtungCounty",
  "KinmenCounty",
  "Taoyuan",
  "Taipei",
  "Kaohsiung",
  "Tainan",
  "Chiayi"
]
const MAP_CONFIG = {
      zoom: 15,
      center: [25.056, 121.50],
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}
// console.log(latLng);
export default {
  data(){
    return {
      axioLoading: false,
      axioError: false,
      bikeStationData: [],

      cityOption: CITY_OPTION,
      city: "Taoyuan",

      map: null,
      ...MAP_CONFIG,
      page: 1,
      total_pages: 0
    }
  },
  created(){
    this.axioLoading = true
  },
  mounted(){
    this.fetchBikeStation()
    this.initMap()
  },
  methods: {
    fetchBikeStation(){
      this.params = {
        '$format' :JSON
      }
      //取得指定[縣市]的公共自行車租借站位資料
      axios.get(API_URL + 'v2/Bike/Station/' + this.city, { 
        params: this.params
      }).then((response) => {
        // console.log(response.data);
        if(response.status === 200 && response.data){
          this.axioError = false
          this.bikeStationData = response.data
        }else{
          this.axioError = true
          this.bikeStationData = []
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
      this.fetchBikeStation()
    },
    selectCity(){
      this.fetchBikeStation()
    },
    initMap(){
      this.map = L.map("mapContainer").setView(this.center, this.zoom);
      L.tileLayer(this.url, {
        attribution: this.attribution
      }).addTo(this.map)
    }
  }
}
</script>
<style lang="scss" scoped>
.userContainer{
  min-height: 50vh;
}
.bikeStaion {
  max-height: 100px;
  overflow: scroll;
  >div{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 5px 10px;
    p{
      margin: 5px;
    }
  }
}
.mapaBox{
  width: 100%;
  height: 300px;
}
.pagination{
  button{
    margin: 3px;
  }
}
</style>

