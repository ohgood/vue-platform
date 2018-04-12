<template>
<div class="index">
  <!-- 左侧 -->
  <div class="index-left">
    <!-- 所有产品 -->
    <div class="index-left-allProducts">
      <h3>全部产品</h3>

      <!-- 定义一个组件 -->
      <div v-for="product in productList">
        <div>
          <p> {{product.resource.name}} </p>
          <ul>
            <!-- 为每个li添加路由 -->
            <router-link  v-for="item in product.childResource" :to="{path: item.url}" tag="li" active-class="active">
              {{item.name}}
            </router-link>
          </ul>
          <div v-show="!product.last" class="hr"></div>
        </div>
        <div class="detail-right">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>

    <!-- 最新消息 -->
    <div class="index-left-news">
      <h3>最新消息</h3>
      <ul>
        <li v-for="item in newsList">
          <a :href="item.url">{{item.context}}</a>
        </li>
      </ul>
    </div>
  </div>

  <!-- 右侧 -->
  <div class="index-right">
    <!-- 轮播幻灯片组件 -->
    <slideShow :slides="newsList" :interval="time"></slideShow>
    <div class="index-board-list">
      <div class="index-board-item" v-for="(item,index) in boardList"
           :class="[{ 'item-even' : index % 2 !== 0}, 'board-item-' + item.id ]">
        <div class="index-board-item-inner">
          <img :src="item.picUrl" />
          <h3>{{item.name}}</h3>
          <router-link
            :to="{
              path: '/detail',
              query: { id: item.id,
                        picUrl: item.picUrl}}
             ">
             <button>点击购买</button>
           </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import slideShow from './slideShow.vue'
export default {
  components: {
    slideShow: slideShow
  },
  created () {
    this.get_resources()
    this.findHot()
    this.getNews()
  },
  methods: {
    get_resources () {
      this.$http.get('http://116.196.80.176:8090/api/getResources', {}, {emulateJSON: true}).then(function (response) {
        if (response.data.code === 0) {
          this.productList = response.data.result
        }
      })
    },
    findHot () {
      this.$http.get('http://116.196.80.176:8090/api/goods/findHot', {}, {emulateJSON: true}).then(function (response) {
        if (response.data.code === 0) {
          this.boardList = response.data.result
        }
      })
    },
    getNews () {
      this.$http.get('http://116.196.80.176:8090/api/goods/getList', {}, {emulateJSON: true}).then(function (response) {
        if (response.data.code === 0) {
          this.newsList = response.data.result
        }
      })
    }
  },
  data () {
    return {
     /* 轮播间隔时间 */
      time: 1500,
     /* 全部产品数据 */
      productList: {
      },
      /* 最新消息数据 */
      newsList: [
      ],
      /* 主要产品数据 */
      boardList: [
      ]
    }
  }
}
</script>

<style scoped>
/* 左侧 */
.index {
  width:90%;
  margin:0 auto;
  padding:20px;
}
.index-left {
  width:25%;
  float:left;
  overflow:hidden;
}
.index-left-allProducts, .index-left-news{
  background:#fff;
}
.index-left-allProducts {
  padding-bottom:10px;
}
.index-left-news {
  margin-top:25px;
  padding-bottom:10px;
}
.index-left-allProducts .hr {
  border-bottom:1px solid #999;
}
.index-left-allProducts h3, .index-left-news h3{
  height:40px;
  background:#55ca93;
  line-height:40px;
  padding-left:20px;
  color:#fff;
  letter-spacing:5px;
}
.index-left-allProducts p{
  margin:15px 0 8px 20px;
  font-size:20px;
  font-weight:bold;
}
.index-left-allProducts ul {
  margin:0 0 20px 32px;
}
.index-left-news ul {
  margin:15px 0 0 32px;
}
.index-left-allProducts ul li, .index-left-news ul li {
  list-style:none;
  font-size:14px;
  line-height:25px;
}
.index-left-allProducts ul li  a, .index-left-news ul li a {
  text-decoration:none;
  color:#666;
}
.index-left-allProducts ul li  a:hover,  .index-left-news ul li a:hover {
  color:#6f0;
}
.hotTag {
  background:#f00;
  color:#fff;
}

/* 右侧 */
.index-right {
  width:75%;
  float:right;
}
.index-board-item {
  width:390px;
  height:110px;
  background:#fff;
  padding:20px;
  margin:20px 10px 10px 20px;
  float:left;
}
.item-even {
  margin-right:0;
}
.index-board-item-inner {
  padding:0 0 0 120px;
}
.index-board-item-inner h3{
  line-height:20px;
}
.index-board-item-inner p {
  line-height:50px;
}
.index-board-item-inner button {
  width:90px;
  height:40px;
  background:#55ca93;
  border:3px solid #ddd;
  border-radius:5px;
  font-size:15px;
  cursor:pointer;
}
</style>
