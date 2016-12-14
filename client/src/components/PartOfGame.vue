<template>
  <div @mousemove="mousePosition()">
    <div class="screen">

      <div class="foods" :style="{'top': food.y-myAvatar.y+halfHeight + 'px', 'left': food.x-myAvatar.x+halfWidth + 'px'}" v-for="food in foods">
          <food :food="food"></food>
      </div>

      <div class="avatar" :style="{'top': avatar.y-myAvatar.y+(halfHeight)-75 + 'px', 'left': avatar.x-myAvatar.x+halfWidth-50 + 'px'}" v-for="avatar in avatars">
        <avatar :wait="wait" :avatar="avatar" :myAvatar="myAvatar" :halfHeight="halfHeight" :halfWidth="halfWidth"></avatars>
      </div>

      <div v-show="!wait">

        <rank-board :ranking="ranking"></rank-board>

        <mini-map :avatars='avatars' :myAvatar="myAvatar" :foods="foods" :mapSize="mapSize" :mapResize="mapResize"> </mini-map>

        <stamina :countStep="countStep" :maxStep="maxStep"></stamina>

        <score-and-target :target="target" :myAvatar="myAvatar" :scoreColor="scoreColor"></score-and-targe>

      </div>

      <hall-of-fames :hOFs="hOFs"></hall-of-fames>

    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import RankBoard from './RankBoard'
import Food from './Food'
import ScoreAndTarget from './ScoreAndTarget'
import MiniMap from './MiniMap'
import HallOfFames from './HallOfFames'
import Stamina from './Stamina'

export default {
  props: ['wait', 'mousePosition', 'avatars', 'myAvatar', 'halfHeight', 'halfWidth', 'target', 'foods', 'hOFs', 'ranking', 'mapSize', 'mapResize', 'countStep', 'maxStep', 'scoreColor'],
  components: {
    Avatar,
    RankBoard,
    Food,
    ScoreAndTarget,
    MiniMap,
    HallOfFames,
    Stamina
  }
}
</script>
