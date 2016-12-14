<template>
  <div style="margin: 0 auto; display: inline-block;">
    <button @click="selectFace(-1)" class="button play"><a>&lt;</a></button> Face : {{ f }}
    <button @click="selectFace(1)" class="button play"><a>&gt;</a></button>
    <br>
    <button @click="selectColor(-1)" class="button play"><a>&lt;</a></button> Color : {{ c }}
    <button @click="selectColor(1)" class="button play"><a>&gt;</a></button>
  </div>
</template>

<script>
export default {
  props: ['selectFace', 'f', 'selectColor', 'c']
}
</script>
