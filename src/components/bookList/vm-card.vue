<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="picUrl" alt="">
      <div v-if="editable && type == 'vertical'" class="control">
        <router-link
          :to="{
              path: '/detail',
              query: { id: id,
                        picUrl: picUrl}}
             ">
          <span class="delete" onclick="toBuy">buy
             <i class="fa fa-trash"></i>
          </span>
        </router-link>
      </div>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ name }}</h2>
      <p>{{description}}</p>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      editable: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'Title'
      },
      picUrl: {
        type: String,
        default: require('@/assets/img/qrcode.png')
      },
      description: {
        type: String,
        default: '....'
      },
      id: {
        type: Number,
        default: '1'
      }
    },
    data: function () {
      return {
        QRCodeUrl: require('../../assets/img/qrcode.png')
      }
    }
  }
</script>
