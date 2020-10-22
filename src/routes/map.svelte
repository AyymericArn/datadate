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
</style>

<div class="map">
    <Title></Title>
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
