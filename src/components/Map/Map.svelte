<script>
    import mapSrc from '../../assets/DessinArrondissement.svg'
    import { onMount } from 'svelte'

    let canvas

    onMount(async () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })
</script>

<style lang="stylus">
    canvas, img
      position absolute

    img
      opacity 0.5
      width: 100%
      height 100%
</style>

<img src={mapSrc} alt="">
<canvas bind:this={canvas}>
</canvas>

<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="exampleGradient" cx="0.5" cy="0.5" spreadMethod="pad" fx="0.25" fy="0.25">
            <stop offset="10%" stop-color="#5E02D5"/>
            <stop offset="95%" stop-color="#8d36ff88"/>
        </radialGradient>
    </defs>
    <path fill="url(#exampleGradient)" d="M21.1,-35.1C27,-24.7,31.3,-18.1,42.3,-8.1C53.3,1.9,70.9,15.3,72.9,28.2C74.9,41.1,61.3,53.4,46.6,56.6C31.8,59.7,15.9,53.7,2.9,49.8C-10.1,45.8,-20.3,43.8,-31.4,39.5C-42.6,35.2,-54.8,28.5,-60.9,17.8C-67,7.2,-67,-7.3,-60.8,-17.7C-54.6,-28.2,-42.2,-34.6,-31,-43.3C-19.9,-52,-9.9,-63.1,-1.2,-61.4C7.6,-59.8,15.1,-45.5,21.1,-35.1Z" transform="translate(100 100)" />
</svg>

<!--<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(-425px)">-->
<!--    <defs>-->
<!--        <radialGradient id="exampleGradient" cx="0.25" cy="0.25" spreadMethod="pad" fx="0.5" fy="0.5">-->
<!--            <stop offset="10%" stop-color="gold"/>-->
<!--            <stop offset="95%" stop-color="#FFFFFF88"/>-->
<!--        </radialGradient>-->
<!--    </defs>-->
<!--    <path fill="url(#exampleGradient)" d="M21.1,-35.1C27,-24.7,31.3,-18.1,42.3,-8.1C53.3,1.9,70.9,15.3,72.9,28.2C74.9,41.1,61.3,53.4,46.6,56.6C31.8,59.7,15.9,53.7,2.9,49.8C-10.1,45.8,-20.3,43.8,-31.4,39.5C-42.6,35.2,-54.8,28.5,-60.9,17.8C-67,7.2,-67,-7.3,-60.8,-17.7C-54.6,-28.2,-42.2,-34.6,-31,-43.3C-19.9,-52,-9.9,-63.1,-1.2,-61.4C7.6,-59.8,15.1,-45.5,21.1,-35.1Z" transform="translate(100 100)" />-->
<!--</svg>-->