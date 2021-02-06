<template>
    <div>
      <nav-bar></nav-bar>
      <friend-cell></friend-cell>
    </div>
</template>

<script>
  import FriendCell from 'components/addressBook/FriendCell'
  import NavBar from 'components/addressBook/NavBar'
  import SideNav from 'components/addressBook/sideNav'
    export default {
        name: "Friends",
      components:{
          FriendCell,
        NavBar,
        SideNav
      }
    }
</script>

<style scoped>

</style>
