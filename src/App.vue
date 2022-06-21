<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Manager from './components/Manager.vue'

export default {
  name: 'App',
  components: {
    Manager
  }
}
</script>
