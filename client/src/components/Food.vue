<template>
  <div>
    <img :src="'../../static/img/RICE'+ food.pic +'.png'" style="position: absolute; z-index: 99;" width="150%" />
  </div>
</template>

<script>
export default {
  props: ['food']
}
</script>
