<template>
  <div class="chick" :style="{'background': color}" style="margin: 0 auto; display: inline-block;">
    <img :src="'../static/img/' + f + '.png'" width="100%" />
  </div>
</template>

<script>
export default {
  props: ['color', 'f']
}
</script>
