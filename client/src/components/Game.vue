<template>
  <div>
    <part-of-game :wait="wait" :mousePosition="mousePosition" :avatars="avatars" :myAvatar="myAvatar" :halfHeight="halfHeight" :halfWidth="halfWidth" :target="target" :foods="foods" :hOFs="hOFs" :ranking="ranking" :mapSize="mapSize" :mapResize="mapResize" :countStep="countStep"
    :maxStep="maxStep" :scoreColor="scoreColor"></part-of-game>
  </div>
</template>

<script>
import PartOfGame from './PartOfGame'

export default {
  props: ['wait', 'mousePosition', 'avatars', 'myAvatar', 'halfHeight', 'halfWidth', 'target', 'foods', 'hOFs', 'ranking', 'mapSize', 'mapResize', 'countStep', 'maxStep', 'scoreColor'],
  components: {
    PartOfGame
  }
}
</script>
