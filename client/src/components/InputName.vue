<template>
  <div style="display: inline;">
    <input v-model="myAvatar.name" type="text" placeholder="Guest [0-8]" autofocus>
    <button class="button play" @click="letPlay"><a>PLAY</a></button>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  props: ['myAvatar', 'letPlay']
}
</script>
