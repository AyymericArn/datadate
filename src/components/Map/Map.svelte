<script>
    import * as d3 from 'd3-shape'
    import mapSrc from '../../assets/DessinArrondissement.svg'
    import arrondissements from '../../data/arrondissements.geo.json'
    import { onMount } from 'svelte'

    import { trigoangle } from '../../utils'

    const randf = require('randf')
    const simplifier = require('simplify-geojson')
    const notThatSimpleArrondissements = simplifier(arrondissements, 0.0002)
    const simpleArrondissements = simplifier(arrondissements, 0.002)

    let canvas, blobs, map, svg, ctx, ctx2

    function isVertical ([cx, cy], [dx, dy]) {
        console.log(arguments)
        const angle = trigoangle(arguments[0], arguments[1])
        if (
            (angle > 45 && angle < 135) ||
            (angle > 225 && angle < 345)
        ) return true
        else return false
    }

    function drawMap () {
        ctx2.moveTo(10, 10)
        ctx2.fillStyle = '#fff'
        ctx2.strokeStyle = '#fff'

        for (const feature of arrondissements.features) {
            ctx2.beginPath()
            let prevPoint = feature.geometry.coordinates[0][0]
            for (const point of feature.geometry.coordinates[0]) {
                point[0] -= 2.32
                point[0] *= 7000
                point[0] += (svg.clientWidth/2 - 100)
                point[1] -= 48.815
                point[1] *= 10700 * 1.3
                ctx2.lineTo(point[0], point[1])
                ctx2.stroke()
            }
            ctx2.closePath()
        }
    }

    function drawBlobs () {
        ctx.moveTo(10, 10)
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#fff'

        ctx.strokeStyle = '#fff'
        for (const feature of simpleArrondissements.features) {
            for (const point of feature.geometry.coordinates[0]) {
                    point[0] -= 2.32
                    point[0] *= 7000
                    point[0] += (svg.clientWidth/2 - 100)
                    point[1] -= 48.815
                    point[1] *= 10700 * 1.3
            }
            const points = feature.geometry.coordinates[0]
            var line = d3.line().context(ctx).curve(d3.curveBundle.beta(1))
            line(points)
            ctx.stroke()

            // fill shape
            var radgrad = ctx.createRadialGradient(200,200,50,200,200,600);
            radgrad.addColorStop(0, '#A7D30C');
            radgrad.addColorStop(1, 'rgba(1,159,98,0)');

            var radgrad2 = ctx.createRadialGradient(0,150,1,0,150,150);
            radgrad2.addColorStop(0, '#FF5F98');
            radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

            var radgrad3 = ctx.createRadialGradient(150,0,1,150,0,150);
            radgrad3.addColorStop(0, '#00C9FF');
            radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

            var radgrad4 = ctx.createRadialGradient(200,200,50,200,200,600);
            radgrad4.addColorStop(0, '#F4F201');
            radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

            ctx.fillStyle = radgrad4;
            ctx.fill();
        }
    }

    function resize() {
        blobs.width = window.innerWidth
        // drawBlobs()
        drawMap()
    }

    onMount(async () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        blobs.width = window.innerWidth
        blobs.height = window.innerHeight
        map.width = window.innerWidth
        map.height = window.innerHeight

        ctx = blobs.getContext('2d')
        ctx2 = map.getContext('2d')

        drawBlobs()
        // drawMap()

        window.addEventListener('resize', resize)
    })


</script>

<style lang="stylus">
    .blobs, .map
        transform rotate(180deg) scaleX(-1)
    canvas, img
      position absolute

    img
      opacity 0.5
      width: 100%
      height 100%
</style>

<img bind:this={svg} src={mapSrc} alt="">
<canvas bind:this={canvas}>
</canvas>

<canvas class="map" bind:this={map}>
</canvas>
<canvas class="blobs" bind:this={blobs}>
</canvas>