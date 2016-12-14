<template>
  <div class="rankingBoard">
    <center>
      <a style="font-weight:bold;">
        Ranking
      </a>
    </center>
    <div class="ranking" v-for="rank in ranking">
      <ranking :rank="rank"></ranking>
    </div>
  </div>
</template>

<script>
import Ranking from './Ranking'

export default {
  props: ['ranking'],
  components: {
    Ranking
  }
}
</script>
