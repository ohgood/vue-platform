<template>
<div class="orderList">
  <h3>我的订单信息</h3>
  <table class="orderList-table">
    <tr class="table-title">
      <td>订单流水编号</td>
      <td>产品名称</td>
      <td>产品类型</td>
      <td>售卖地区</td>
      <td>购买数量</td>
      <td>总价</td>
    </tr>
    <tr class="table-body">
      <td>{{order.orderNo}}</td>
      <td>{{order.goodsName}}</td>
      <td>{{order.goodsType}}</td>
      <td>{{order.saleArea}}</td>
      <td>{{order.amount}}</td>
      <td>{{order.sum}}</td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  data () {
    return {
      order: this.$route.query.order
    }
  }
}
</script>

<style>
.orderList {
  padding:20px 200px 30px 200px;
}
.orderList .orderList-table {
  margin:20px 0 20px 100px;
  border:1px solid #aaa;
  border-collapse:collapse;
}
.orderList .orderList-table .table-title td {
  padding:5px 15px;
  border:1px solid #aaa;
  background:#55ca93;
  text-align:center;
}
.orderList .orderList-table .table-body td {
  padding:5px 15px;
  border:1px solid #aaa;
  font-size:15px;
  text-align:center;
}
.orderList .orderList-table .table-body td:hover {
  background:#e3e3e3;
  cursor:pointer;
}
</style>
