<template>
    <div>
      <nav-bar></nav-bar>
      <friend-cell></friend-cell>
    </div>
</template>

<script>
  import FriendCell from 'components/addressBook/FriendCell'
  import NavBar from 'components/addressBook/NavBar'
    export default {
        name: "Friends",
      components:{
          FriendCell,
        NavBar
      }
    }
</script>

<style scoped>

</style>
