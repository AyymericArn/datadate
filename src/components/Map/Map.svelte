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

    // const arrondissements = require('../../data/arrondissements-simplified.geojson')

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

        // for (const feature of simpleArrondissements.features) {
        const feature = simpleArrondissements.features[15]
            ctx.beginPath()
            let prevPoint = feature.geometry.coordinates[0][0]

            // for (let i = 2; i < feature.geometry.coordinates[0].length; i+=3) {
            //     let inflexPoint1 = feature.geometry.coordinates[0][i-2]
            //     let inflexPoint2 = feature.geometry.coordinates[0][i-1]
            //     let point = feature.geometry.coordinates[0][i]
            //     point[0] -= 2.32
            //     point[0] *= 7000
            //     point[0] += (svg.clientWidth/2 - 100)
            //     point[1] -= 48.815
            //     point[1] *= 10700 * 1.3
            //
            //     inflexPoint1[0] -= 2.32
            //     inflexPoint1[0] *= 7000
            //     inflexPoint1[0] += (svg.clientWidth/2 - 100)
            //     inflexPoint1[1] -= 48.815
            //     inflexPoint1[1] *= 10700 * 1.3
            //
            //     inflexPoint2[0] -= 2.32
            //     inflexPoint2[0] *= 7000
            //     inflexPoint2[0] += (svg.clientWidth/2 - 100)
            //     inflexPoint2[1] -= 48.815
            //     inflexPoint2[1] *= 10700 * 1.3
            //
            //         ctx.fillRect(point[0], point[1], 5, 5)
            //
            //     ctx.bezierCurveTo(inflexPoint1[0], inflexPoint1[1], inflexPoint2[0], inflexPoint2[1], point[0], point[1])
            //     ctx.stroke()
            // }
            // for (const point of feature.geometry.coordinates[0]) {
            //     point[0] -= 2.32
            //     point[0] *= 7000
            //     point[0] += (svg.clientWidth/2 - 100)
            //     point[1] -= 48.815
            //     point[1] *= 10700 * 1.3
            //     // ctx.fillRect(point[0] * 7000 + svg.clientWidth/2 - 100, point[1] * 10700 * 1.3, 2, 2)
            //     const inflexionPoint = [
            //         isVertical(prevPoint, point) ? randf(point[0] - 1, point[0] + 1) : randf(prevPoint[0], point[0]),
            //         isVertical(prevPoint, point) ? randf(prevPoint[1], point[1]) : randf(point[1] - 1, point[1] + 1)
            //     ]
            //     const inflexionPoint1 = [
            //         isVertical(prevPoint, point) ? randf(point[0] - 1, point[0] + 1) : randf(prevPoint[0], point[0]/2),
            //         isVertical(prevPoint, point) ? randf(prevPoint[1], point[1]/2) : randf(point[1] - 1, point[1] + 1)
            //     ]
            //     const inflexionPoint2 = [
            //         isVertical(prevPoint, point) ? randf(point[0] - 1, point[0] + 1) : randf(prevPoint[0] + point[0] / 2, point[0]),
            //         isVertical(prevPoint, point) ? randf(prevPoint[1] + point[1]/2, point[1]) : randf(point[1] - 1, point[1] + 1)
            //     ]
            //     ctx.quadraticCurveTo(inflexionPoint[0], inflexionPoint[1], point[0], point[1]  )
            //     ctx.fillRect(point[0], point[1], 5, 5)
            //     // ctx.bezierCurveTo(inflexionPoint1[0], inflexionPoint1[1], inflexionPoint2[0], inflexionPoint2[1], point[0], point[1] )
            //     // ctx.lineTo(point[0], point[1])
            //     ctx.stroke()
            //     prevPoint = point
            // }
            ctx.closePath()
        // }
        // for (const point of arrondissements.features[15].geometry.coordinates[0]) {
        // }

        ctx.strokeStyle = '#fff';
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

            // ctx.fillStyle = '#fff'
            // ctx.fill()

            ctx.fillStyle = radgrad4;
            ctx.fill();
            // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            // ctx.fillStyle = radgrad3;
            // ctx.fill();
            // ctx.fillStyle = radgrad2;
            // ctx.fill()
            // ctx.fillStyle = radgrad;
            // ctx.fill();
        }

        // var line = d3.line().context(ctx).curve(d3.curveCatmullRom.alpha(0.5))
        // var line = d3.line().context(ctx).curve(d3.curveCardinal.tension(1))
        console.log(line)

        // const point = arrondissements.features[15].geometry.coordinates[0][1]
        // point[0] -= 2.32
        // point[1] -= 48.815
        // console.log(point)
        // console.log(point[1] * 2)
        // ctx.fillRect(point[0] * 7000 + svg.clientWidth/2 - 100, point[1] * 10700, 2, 2)
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

        // var line = d3.line().context(ctx)
        // ctx.strokeStyle = '#fff'
        // ctx.beginPath()
        // line([[1, 3], [50, 57], [103, 102], [5, 2]])
        // ctx.fill();
        // ctx.stroke();
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

<!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="exampleGradient" cx="0.5" cy="0.5" spreadMethod="pad" fx="0.25" fy="0.25">
            <stop offset="10%" stop-color="#5E02D5"/>
            <stop offset="95%" stop-color="#8d36ff88"/>
        </radialGradient>
    </defs>
    <path fill="url(#exampleGradient)" d="M21.1,-35.1C27,-24.7,31.3,-18.1,42.3,-8.1C53.3,1.9,70.9,15.3,72.9,28.2C74.9,41.1,61.3,53.4,46.6,56.6C31.8,59.7,15.9,53.7,2.9,49.8C-10.1,45.8,-20.3,43.8,-31.4,39.5C-42.6,35.2,-54.8,28.5,-60.9,17.8C-67,7.2,-67,-7.3,-60.8,-17.7C-54.6,-28.2,-42.2,-34.6,-31,-43.3C-19.9,-52,-9.9,-63.1,-1.2,-61.4C7.6,-59.8,15.1,-45.5,21.1,-35.1Z" transform="translate(100 100)" />
</svg> -->

<!--<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="transform: translateY(-425px)">-->
<!--    <defs>-->
<!--        <radialGradient id="exampleGradient" cx="0.25" cy="0.25" spreadMethod="pad" fx="0.5" fy="0.5">-->
<!--            <stop offset="10%" stop-color="gold"/>-->
<!--            <stop offset="95%" stop-color="#FFFFFF88"/>-->
<!--        </radialGradient>-->
<!--    </defs>-->
<!--    <path fill="url(#exampleGradient)" d="M21.1,-35.1C27,-24.7,31.3,-18.1,42.3,-8.1C53.3,1.9,70.9,15.3,72.9,28.2C74.9,41.1,61.3,53.4,46.6,56.6C31.8,59.7,15.9,53.7,2.9,49.8C-10.1,45.8,-20.3,43.8,-31.4,39.5C-42.6,35.2,-54.8,28.5,-60.9,17.8C-67,7.2,-67,-7.3,-60.8,-17.7C-54.6,-28.2,-42.2,-34.6,-31,-43.3C-19.9,-52,-9.9,-63.1,-1.2,-61.4C7.6,-59.8,15.1,-45.5,21.1,-35.1Z" transform="translate(100 100)" />-->
<!--</svg>-->