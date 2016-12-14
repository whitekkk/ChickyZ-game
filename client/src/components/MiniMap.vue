<template>
  <div @click="mapResize" class="miniMap" :style="{'height': 3000*mapSize + 'px','width': 3000*mapSize + 'px'}">
    <div v-for="avatar in avatars" style="position: absolute;">
      <div v-if="myAvatar.id === avatar.id" class="miniAvatar" :style="{'position':'absolute','background': myAvatar.color,'top': avatar.y*mapSize + 'px', 'left': avatar.x*mapSize + 'px'}">
      </div>
      <div v-else class="miniAvatar" :style="{'position':'absolute','background': '#888888', 'top': avatar.y*mapSize + 'px', 'left': avatar.x*mapSize + 'px'}">
      </div>
    </div>
    <div v-for="food in foods">
      <div v-if="food.color !== ''" class="miniFood" :style="{'position':'absolute','background': '#888888','top': food.y*mapSize + 'px', 'left': food.x*mapSize + 'px'}">
      </div>
      <div v-else class="miniFood" :style="{'position':'absolute','background': food.color,'top': food.y*mapSize + 'px', 'left': food.x*mapSize + 'px'}">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['avatars', 'myAvatar', 'foods', 'mapSize', 'mapResize']
}
</script>
