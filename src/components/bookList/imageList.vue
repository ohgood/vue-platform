<template>
  <VmImageList :data="dataImageList" @to-buy="toBuy" class="vm-margin"></VmImageList>
</template>

<script>
  import VmImageList from '@/components/bookList/vm-image-list'
  export default {
    name: 'ImageList',
    components: {
      VmImageList
    },
    methods: {
      findAll () {
        this.$http.get('http://116.196.80.176:8090/api/goods/findAll', {}, {emulateJSON: true}).then(function (response) {
          this.dataImageList = response.data.result
        })
      },
      toBuy: function (data) {
      }
    },
    data: function () {
      return {
        dataImageList: [
        ]
      }
    },
    created () {
      this.findAll()
    }
  }
</script>
