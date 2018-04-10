<template>
<div class="dialog">
  <div class="dialog-wrap">
    <!-- dialog-cover相当于一个遮罩层，类似于模态框效果 -->
    <div class="dialog-cover" v-show="showCheckDialog" @click="closeCheckDialog"></div>
    <!-- 弹出对话框的动画效果 -->
    <transition name="dropDialog">
      <div class="dialog-container" v-show="showCheckDialog">
        <div class="dialog-header">
          <slot name="header-info">请确认您的支付状态</slot>
          <img :src="picUrl" alt=""><br>
          <label>操作人：</label>
          <input v-model="operator" /><br>
          <label>收货人：</label>
          <input v-model="receiver" /><br>
          <label>手机号：</label>
          <input v-model="iphone" /><br>
          <label>收货地址：</label>
          <input slot="header-info" v-model="address" /><br><br>
          <span @click="paySuccess">支付成功</span>
          <span @click="payFailed">支付失败</span>
          <div class="dialog-close" @click="closeMyself">x</div>
        </div>
        <div class="dialog-content">
          <slot name="content-info"></slot>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  props: {
    showCheckDialog: {
      type: Boolean,
      default: false
    },
    goodId: {
      type: Number,
      default: 1
    },
    amount: {
      type: String,
      default: '1'
    },
    sum: {
      type: Number,
      default: '1'
    }
  },
  data () {
    return {
      isShowPaySuccess: false,
      isShowPayFailed: false,
      picUrl: require('../../assets/img/qrcode.png'),
      operator: '',
      receiver: '',
      iphone: '',
      address: ''
    }
  },
  methods: {
    /* 关闭支付状态选择框 */
    closeCheckDialog () {
      this.showCheckDialog = false
    },
    closeMyself () {
      this.$emit('close')
    },
    /* 点击支付成功 */
    paySuccess () {
      this.$http.post('http://localhost:8090/api/pay/createOrder', {'operator': this.operator, 'amount': this.amount, 'sum': this.sum, 'receiver': this.receiver, 'iphone': this.iphone, 'address': this.address, 'goodId': this.goodId}, {emulateJSON: true}).then(function (response) {
        this.$router.push({path: '/orderList', query: {order: response.data.result}})
      })
    },
    /* 点击支付失败 */
    payFailed () {
      /* showCheckDialog是从父级获取过来的数据，在子组件中一般
       不修改，所以触发事件on-close来关闭支付状态选择框 */
      this.$emit('on-close')
    },
    /* 关闭购买失败 */
    closeFailed () {
      this.isShowPayFailed = false
    },
    /* 订单详情页 */
    toOrderList () {
      this.$router.push({path: '/orderList'})
      this.isShowPaySuccess = false
    }
  }
}
</script>

<style scoped>
span {
  border:1px solid #ccc;
  padding:7px 9px;
  background:#55ca93;
  margin:5px 8px 5px 30px;
  cursor:pointer;
}
.dialog-wrap {
  width:100%;
  height:100%;
}
/* dialog-cover相当于一个遮罩层，类似于模态框效果 */
.dialog-cover {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:#000;
  opacity:0.6;
}
.dialog-container {
  position:fixed;
  left:25%;
  height: 60%;
  top:15%;
  width:18%;
  background:#fff;
  border:4px solid #fffed7;
  border-radius:15px;
}
.dialog-container .dialog-header {
  width:100%;
  height:50px;
  background:#eee;
  border-radius:10px;
  line-height:25px;
  text-align:center;
}
.dialog-container .dialog-header .dialog-close {
  position:absolute;
  top:10px;
  right:25px;
  width:20px;
  height:20px;
  border:1px solid #ccc;
  text-align:center;
  line-height:15px;
  font-size:20px;
  cursor:pointer;
}
.dialog-container .dialog-header .dialog-close:hover {
  background:#f00;
}
.dialog-container .dialog-content {
  padding:15px;
}
</style>
