<template>
  <div style="text-align: center;">
    <h5 class="status" style="left:140px; bottom: 0%;">
          Target :
        </h5>
        <div class="target" :style="{'background': target}">
        </div>

    <h5 class="status">
          Score :
        </h5>
        <h4 class="score" :style="{'color': scoreColor}"> {{myAvatar.score}} </h4>
  </div>
</template>

<script>
export default {
  props: ['target', 'myAvatar', 'scoreColor']
}
</script>
