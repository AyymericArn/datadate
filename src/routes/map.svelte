<script lang="ts">
    import Title from '../components/Map/Title.svelte'
    import Map from '../components/Map/Map.svelte'
    import Menu from '../components/Map/Menu.svelte'

    import { screen } from '../stores/state'

    import { onMount } from 'svelte'
</script>

<style lang="stylus">
    *
      color white
    .map
      display flex
      flex-direction column
      justify-content space-between
      height 100vh

    .fadeIn
      pointer-events none
      position absolute
      width 100vw
      height 100vh
      background black
      z-index 100
      animation fade 0.4s ease 1 both

    @keyframes fade {
      from { opacity: 1 }
      to { opacity: 0 }
    }
</style>

<div class="fadeIn"></div>
<div class="transitionner"></div>
<div class="map">
    <Title stepped={$screen !== 0}></Title>
    {#if $screen === 0}
    <Map></Map>
    {:else if $screen === 1}
      <!-- <Map index={0} stepped={true}></Map> -->
      <Map index={0} position={-1} stepped={true}></Map>
      <Map index={1} position={0} stepped={true}></Map>
      <Map index={2} position={1} stepped={true}></Map>
    {/if}
    <Menu></Menu>
</div>
