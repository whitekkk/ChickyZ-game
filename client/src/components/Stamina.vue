<template>
  <div style="text-align: center;">
    <h5 class="status" style="left:290px; bottom: 0%;">
          Stamina :
        </h5>
        <h5 class="status" style="left:360px; bottom: 0%;">
          <progress :value="countStep" :max="maxStep"></progress>
          {{countStep}}
        </h5>
  </div>
</template>

<script>
export default {
  props: ['countStep', 'maxStep']
}
</script>
