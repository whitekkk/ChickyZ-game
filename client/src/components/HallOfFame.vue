<template>
  <div>
    <a v-if="rank.score !== undefined">
        <div style="display: inline-block;">
          {{' '}}
        </div>
        <div style="display: inline-block;">
          &nbsp;
          {{rank.name + ' '}}
        </div>
        <div style="position: absolute; right:0; display: inline-block;">
          {{rank.score}}
          &nbsp;
        </div>
      </a>
  </div>
</template>

<script>
export default {
  props: ['rank'],
  components: {
  }
}
</script>
