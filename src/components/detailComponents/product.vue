<template>
<div class="sales-board">
  <!-- 头部信息 -->
  <div class="sales-board-intro">
    <h3>{{goods.name}}</h3>
    <p>{{goods.description}}</p>
  </div>
  <!-- 规格说明 -->
  <div class="sales-board-form">

    <div class="sales-board-info">
      <div class="left">产品类型：</div>
      <div class="right">
        <p>{{goods.type}}</p>
      </div>
    </div>

    <div class="sales-board-info">
      <div class="left">售卖地区：</div>
      <div class="right">
        <p>{{goods.saleArea}}</p>
      </div>
    </div>

    <div class="sales-board-info">
      <div class="left">库存数量</div>
      <div class="right">
        <p>{{goods.amount}}</p>
      </div>
    </div>

    <div class="sales-board-info">
      <div class="left">购买数量</div>
      <div class="right">
        <!-- 购买数量组件 -->
      <input  v-model="num">
      </div>
    </div>

    <div class="sales-board-info">
      <div class="left">总价：</div>
      <div class="right">
        <p>{{goods.price}}</p>
      </div>
    </div>

    <div class="sales-board-info">
      <button class="btn" @click="showPayDialog">立即购买</button>
    </div>
  </div>

  <!-- 产品说明信息 -->
  <div class="sales-board-description">
    <h3>产品说明</h3>
    <p>{{goods.description}}</p>
  </div>

  <!-- 更多相关产品 -->
  <div class="more-products">
    <h3>更多相关产品</h3>
  </div>

  <!-- 点击立即购买弹出对话框 -->
  <myDialog :isShow="isShowPayDialog" @close="closePayDialog">
    <h3 slot="header-info">支付页面</h3>
    <!-- 支付详情页面 -->
    <div slot="content-info">
      <table class="payDialog-table">
        <thead>
          <tr>
            <td>产品类型</td>
            <td>售卖地区</td>
            <td>购买数量</td>
            <td>总价</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{goods.name}}</td>
            <td>{{goods.saleArea}}</td>
            <td>{{num}}</td>
            <td>{{num*500}}</td>
          </tr>
        </tbody>
      </table>
      <h3>请选择银行</h3>
      <!-- 选择银行组件 -->
      <bankChoose></bankChoose>
      <button class="payDialog-btn" @click="confirmBuy">确认购买</button>
    </div>
  </myDialog>

  <!-- 支付状态选择框 -->
  <checkDialog :show-check-dialog="isShowCheckDialog" @on-close="closeCheckDialog"></checkDialog>

  </div>
</template>

<script>
import Dialog from '../../components/headerComponents/dialog.vue'
import BankChoose from '../../components/detailSelectionComponents/bankChoose.vue'
import CheckDialog from '../../components/detailSelectionComponents/checkDialog.vue'
export default {
  components: {
    myDialog: Dialog,
    bankChoose: BankChoose,
    checkDialog: CheckDialog
  },
  data () {
    return {
      goods: {},
      amount: 1,
      isShowPayDialog: false,
      /* bankId开始为null */
      bankId: null,
      isShowCheckDialog: false,
      isShowOrderList: false,
      num: this.amount
    }
  },
  methods: {
    findOne () {
      // 取到路由带过来的参数
      let id = this.$route.query.id
      // 将数据放在当前组件的数据内
      this.$http.get('http://116.196.80.176:8090/api/goods/findOne?id=' + id, {}, {emulateJSON: true}).then(function (response) {
        if (response.data.code === 0) {
          this.goods = response.data.result
          this.amount = response.data.result.amount
        }
      })
    },
    onParamChange (attr, val) {
      this[attr] = val
    },
    /* 点击立即购买显示购买对话框 */
    showPayDialog () {
      this.isShowPayDialog = true
      /* 产生bug 修改后添加的代码 */
      this.isShowCheckDialog = false
    },
    /* 关闭购买对话框 */
    closePayDialog () {
      this.isShowPayDialog = false
    },
    /* 确认购买 */
    confirmBuy () {
      this.isShowPayDialog = false
      this.isShowCheckDialog = true
      /* 利用localStorage存储用户购买信息 */
      localStorage.setItem('amount', JSON.stringify(this.amount))
    },
    /* 关闭支付状态选择框 */
    closeCheckDialog () {
      this.isShowCheckDialog = false
    }
  },
  mounted () {
    this.amount = 1
    this.findOne()
  }
}
</script>

<style>
.payDialog-table {
  width:100%;
  margin-bottom:10px;
  border-collapse:collapse;
}
.payDialog-table thead tr td {
  border:1px solid #e3e3e3;
  padding:3px 5px;
  background:#55c396;
  text-align:center;
}
.payDialog-table tbody tr td  {
   border:1px solid #e3e3e3;
   padding:3px 5px;
   text-align:center;
   font-size:14px;
}
.payDialog-btn {
  width:80px;
  height:40px;
  border:1px solid #eee;
  border-radius:7px;
  background:#55ca93;
  font-size:15px;
  color:#fff;
  cursor:pointer;
}
</style>
