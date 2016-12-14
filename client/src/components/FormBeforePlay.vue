<template>
  <div v-show="checkName">
    <div v-if="checkFull" class="popUpName">
      <server-full></server-full>
    </div>
    <div v-else class="popUpName">
      <input-name :myAvatar="myAvatar" :letPlay="letPlay"></input-name>
      <sample-picture :color="color" :f="f"></sample-picture>
      <select-chick-menu :selectFace="selectFace" :f="f" :selectColor="selectColor" :c="c"></select-chick-menu>
      <explan-game></explan-game>
    </div>
  </div>
</template>

<script>
import ServerFull from './ServerFull'
import InputName from './InputName'
import SamplePicture from './SamplePicture'
import SelectChickMenu from './SelectChickMenu'
import ExplanGame from './ExplanGame'

export default {
  props: ['checkFull', 'checkName', 'letPlay', 'color', 'myAvatar', 'f', 'c', 'selectFace', 'selectColor'],
  components: {
    ServerFull,
    InputName,
    SamplePicture,
    SelectChickMenu,
    ExplanGame
  }
}
</script>
