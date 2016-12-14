<template>
  <div v-show="wait">
    <Background-and-logo></Background-and-logo>
    <countdown-to-play :waitingTime="waitingTime" :checkName="checkName"></countdown-to-play>
    <form-before-play :wait="wait" :checkFull="checkFull" :checkName="checkName" :letPlay="letPlay" :color="color" :myAvatar="myAvatar" :f="f" :c="c" :selectFace="selectFace" :selectColor="selectColor"> </form-befor-play>
  </div>
</template>

<script>
import BackgroundAndLogo from './BackgroundAndLogo'
import ServerFull from './ServerFull'
import FormBeforePlay from './FormBeforePlay'
import CountdownToPlay from './CountdownToPlay'

export default {
  props: ['wait', 'checkFull', 'checkName', 'letPlay', 'color', 'myAvatar', 'f', 'c', 'selectFace', 'selectColor', 'waitingTime'],
  components: {
    BackgroundAndLogo,
    ServerFull,
    CountdownToPlay,
    FormBeforePlay
  }
}
</script>
