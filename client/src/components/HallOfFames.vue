<template>
  <div class="hOF">
    <center>
      <a style="font-weight:bold;">
        Hall of Fame <img src="../../static/img/crown.png"/>
      </a>
      </center>
    <div class="ranking" v-for="rank in hOFs">
      <hall-of-fame :rank="rank"></hall-of-fame>
    </div>
  </div>
</template>

<script>
import HallOfFame from './HallOfFame'

export default {
  props: ['hOFs'],
  components: {
    HallOfFame
  }
}
</script>
