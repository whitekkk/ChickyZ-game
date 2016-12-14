<template>
  <div>
    <svg v-if="myAvatar.id === avatar.id || !wait" width="3000px" height="3000px" xmlns="http://www.w3.org/2000/svg" :style="{'position':'absolute', 'top': -avatar.y + 'px', 'left': -avatar.x + 'px'}">
      <defs>
          <pattern id="smallGrid" width="99.95" height="99.95" patternUnits="userSpaceOnUse">
            <path d="M 99.95 0 L 0 0 0 99.95" fill="none" stroke="gray" stroke-width="1.5" />
          </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#smallGrid)" />
    </svg>
    <div style="text-align: center; z-index: 100; position: absolute;">
      <a class="name">
          {{avatar.name}}
        </a>
      <br>
      <div class="chick" :style="{'background': avatar.color}">
        <img :src="'../../static/img/' + avatar.face + '.png'" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['wait', 'avatar', 'myAvatar', 'halfHeight', 'halfWidth'],
  components: {
  }
}
</script>
