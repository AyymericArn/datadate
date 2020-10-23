<script lang="ts">
    import Title from '../components/Map/Title.svelte'
    import Map from '../components/Map/Map.svelte'
    import Menu from '../components/Map/Menu.svelte'

    import mouseSrc from '../assets/mouse.svg'

    import { screen } from '../stores/state'

    import { onMount } from 'svelte'

    let tutoDisappear = false

    onMount(async () => {
        window.addEventListener('click', () => {
            tutoDisappear = true
        }, {once: true})
    })
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

    .tuto
      position absolute
      width 100vw
      height 100vh
      background #00000088
      z-index 100
      animation fade 0.4s ease 1 reverse 0.4s both
      font-family: Shrikhand;
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 32px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #FFFFFF;
      display flex
      flex-direction column
      justify-content center
      align-items center
      transition opacity 0.4s linear

    &.disappeared
        animation fade 0.4s ease 1 both
        opacity 0
        pointer-events none

      img
        position relative
        left 20px
        top -30px
        //transform translate(20px, -30px)
        animation: bounce 3s ease infinite both;
      .hitPoint
        opacity 0.5
        width 50px
        height 50px
        background radial-gradient(white, transparent);
        border-radius 50px

      //.hit
      //  transform scale(0)
      //
      //  .ray
    @keyframes fade {
      from { opacity: 1 }
      to { opacity: 0 }
    }

    @keyframes bounce {
      0% { transform: scale(1) }
      75% { transform: scale(1) }
      80% { transform: scale(0.8) }
      90% { transform: scale(1) }
      100% { transform: scale(1) }
    }
</style>

<div class="fadeIn"></div>
<div class={tutoDisappear ? 'tuto disappeared' : 'tuto'}>
    <div class="hitPoint"></div>
<!--    <div class="hit">-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--        <div class="ray"></div>-->
<!--    </div>-->
    <img src={mouseSrc}>
    Clique sur un point pour zoomer sur la zone
</div>
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
    <Menu stepped={$screen === 0}></Menu>
</div>
