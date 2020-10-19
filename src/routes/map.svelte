<script lang="ts">
    import Title from '../components/Map/Title.svelte'
    import Map from '../components/Map/Map.svelte'
    import Menu from '../components/Map/Menu.svelte'
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
    <Map></Map>
    <Menu></Menu>
</div>
