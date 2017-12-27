<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style rel='stylesheet/stylus' lang='stylus'>
html
body
  padding 0
  margin 0
  width 100%
  height 100%
  #app
    width 100%
    height 100%
</style>
