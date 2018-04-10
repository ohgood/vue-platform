<template>
  <div class="regForm">
    <div class="reg">
      <div class="reg-info">
        <label>请输入手机号</label>
        <input class="input1" type="text" placeholder="请输入您的手机号" v-model="phoneNumber" />
        <span class="errorInfo">{{phoneNumberError.errorInfo}}</span>
      </div>
      <div class="reg-info">
        <label>请输入密码</label>
        <input class="input2" type="text" placeholder="请输入您的密码" v-model="password" />
        <span class="errorInfo">{{passwordError.errorInfo}}</span>
      </div>
      <div class="reg-info">
        <label>请输入真实姓名</label>
        <input class="input3" type="text" placeholder="请输入您的真实姓名" v-model="realname" />
        <span class="errorInfo">{{realnameError.errorInfo}}</span>
      </div>
      <!--<div class="reg-info">
        <label>获取验证码</label>
        <input class="input2" type="text" placeholder="输入验证码" v-model="Code"/>
        <button class="code" @click="numberChange">{{verificationCode}}</button>
      </div>-->
      <div class="reg-info">
        <button class="regBtn" @click="reg">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phoneNumber: '',
        password: '',
        realname: '',
        /* Code: '', */
        verificationCode: '获取验证码',
        timer: null
      }
    },
    methods: {
      numberChange () {
        this.verificationCode = 60
        this.setInter()
      },
      /* 发送验证码60s倒计时 */
      setInter () {
        this.timer = setInterval(() => {
          this.verificationCode--
          if (this.verificationCode === 0) {
            this.verificationCode = '重新获取'
            clearInterval(this.timer)
          }
        }, 1000)
      },
      reg () {
        if (this.phoneNumber === '' || this.password === '' || this.realname === '') {
          alert('您尚未注册,请完整填写手机号+密码+真实姓名!')
        } else {
          this.$http.get('http://116.196.80.176:8090/api/register?username=' + this.phoneNumber + '&password=' + this.password + '&realname=' + this.realname, {}, {emulateJSON: true}).then(function (response) {
            if (response.data.code === 0) {
              alert('您已经注册成功!')
              this.$emit('has-reg')
            }
          })
        }
        /* 采用本地存储localStorage存储注册数据 */
        let LStorage = window.localStorage
        LStorage.setItem('regInformation', this.phoneNumber + ',' + this.Code)
      }
    },
    computed: {
      /* 利用正则表达式进行表单验证 */
      phoneNumberError () {
        let reg = /^1[34578](\d{9})$/
        let errorInfo, status
        if (!reg.test(this.phoneNumber)) {
          status = false
          errorInfo = '请输入正确的手机号格式'
        } else {
          status = true
          errorInfo = ''
        }
        /* 第一次进入错误信息不提示 */
        if (!this.phoneNumberFlag) {
          errorInfo = '请输入正确的手机号'
          this.phoneNumberFlag = true
        }
        return {
          status,
          errorInfo
        }
      },
      passwordError () {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z_]{6,32}$/
        let errorInfo, status
        if (!reg.test(this.password)) {
          status = false
          errorInfo = '密码为6到32位字母数字下划线组合，必须包含字母数字'
        } else {
          status = true
          errorInfo = ''
        }
        /* 第一次进入错误信息不提示 */
        if (!this.phoneNumberFlag) {
          errorInfo = ''
          this.phoneNumberFlag = true
        }
        return {
          status,
          errorInfo
        }
      },
      realnameError () {
        let reg = /^[\u4e00-\u9fa5]{2,10}$/
        let errorInfo, status
        if (!reg.test(this.realname)) {
          status = false
          errorInfo = '真实姓名为2到10位中文'
        } else {
          status = true
          errorInfo = ''
        }
        /* 第一次进入错误信息不提示 */
        if (!this.phoneNumberFlag) {
          errorInfo = ''
          this.phoneNumberFlag = true
        }
        return {
          status,
          errorInfo
        }
      }
    }
  }
</script>

<style scoped>
  .reg {
    margin:10px 0 0 30px;
  }
  .reg-info {
    margin:5px 0 25px 0;
  }
  .reg-info label {
    color:#36adde;
  }
  .reg-info input {
    width:200px;
    height:30px;
    border:1px solid #ddd;
    border-radius:5px;
    margin-left:15px;
    text-indent:7px;
  }
  .reg-info .input2 {
    margin-left:30px;
  }
  .reg-info .regBtn {
    width:80px;
    height:35px;
    border:1px solid #69b5ff;
    border-radius:7px;
    background:#c5ffac;
    font-size:16px;
    letter-spacing:4px;
    margin-left:130px;
    cursor:pointer;
  }
  .reg-info .errorInfo {
    font-size:14px;
    color:#f00;
  }
</style>
