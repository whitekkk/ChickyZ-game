<template>
  <div>
    <div v-show="!checkName" class="popUpName">
      <h4 style="color: #FFFFFF; text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black; font-size: 2em;">
          Ready in {{waitingTime}}
        </h4>
    </div>
    <div v-show="!checkName" class="law">
      <explan-law-in-game></explan-law-in-game>
    </div>
  </div>
</template>
<script>
import ExplanLawInGame from './ExplanLawInGame'

export default {
  props: ['checkName', 'waitingTime'],
  components: {
    ExplanLawInGame
  }
}
</script>
