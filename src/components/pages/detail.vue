<template>
<div class="detail">
  <div class="detail-left">
    <div class="product-board">
      <!-- 为图片绑定路由映射 -->
      <img :src="picUrl" class="img" style="width: 100px; height: 100px"/>
    </div>
  </div>
  <div class="detail-right">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      picUrl: ''
    }
  },
  created () {
    this.picUrl = this.$route.query.picUrl
  }
}
</script>

<style>
.detail {
  width:1200px;
  margin:0 auto;
  padding-top:20px;
  overflow:hidden;
}
/* 左侧 */
.detail-left {
  float:left;
  width:200px;
  text-align:center;
}
.detail-left .product-board {
  background:#fff;
  padding:20px 0;
}
.detail-left .product-board ul {
  margin-top:15px;
}
.detail-left .product-board ul li {
  width:170px;
  list-style:none;
  line-height:33px;
  font-size:15px;
  cursor:pointer;
  text-align:left;
  padding-left:30px;
}
.detail-left .product-board ul .active, .detail-left .product-board ul li:hover {
  background:#55ca93;
  color:#fff;
}

/* 右侧 */
.detail-right {
  float:right;
  width:980px;
  margin-left:20px;
  overflow:hidden;
}
/* 将四个产品详情页的样式统一写在detail组件中 */
.sales-board {
  background:#fff;
}

/* 产品头部信息 */
.sales-board-intro h3{
  padding:15px 20px;
  font-size:20px;
}
.sales-board-intro p {
  background:#f7fcff;
  line-height:25px;
  color:#999;
  padding:10px 20px;
}
/* 产品规格说明 */
.sales-board-form {
  padding:10px 0 0 25px;
}
.sales-board-form  .sales-board-info {
  margin:15px 0;
}

.sales-board-info .left {
  display:inline-block;
  width:100px;
  margin:3px 10px 0 0;
  font-size:15px;
  color:#666;
}
.sales-board-info .right {
  display:inline-block;
  width:75%;
}

.sales-board-info .right p {
  color:#444;
  font-size:15px;
}
.sales-board-info .btn {
  width:80px;
  height:35px;
  background:#55ca93;
  border:1px solid #eee;
  border-radius:5px;
  margin-left:50px;
  cursor:pointer;
}

/* 产品说明信息 */
.sales-board-description {
  border-top:20px solid #f4f9f7;
}
.sales-board-description h3 {
  font-size:20px;
  padding:15px 20px;
}
.sales-board-description p {
  background:#f7fcff;
  line-height:25px;
  color:#999;
  padding:10px 20px;
}
/* 表格 */
.sales-board-table {
  width:100%;
  border-collapse:collapse;
}
.sales-board-table tr  td {
  border:1px solid #eee;
  padding:12px 10px;
  text-align:center;
  font-size:14px;
  color:#777;
}
.sales-board-table tr  td:hover {
  background:#eee;
}
/* 更多相关产品 */
.more-products {
  border-top:20px solid #f4f9f7;
}
.more-products h3 {
  padding:15px 20px;
}
</style>
