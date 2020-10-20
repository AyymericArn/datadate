<script>
    import * as d3 from 'd3-shape'
    import mapSrc from '../../assets/DessinArrondissement.svg'
    import arrondissements from '../../data/arrondissements.geo.json'
    import results from '../../data/results.json'

    import { onMount } from 'svelte'

    import { trigoangle, normalizePoint, geocode, distance } from '../../utils'
import { Z_NO_COMPRESSION } from 'zlib';

    // const randf = require('randf')
    const simplifier = require('simplify-geojson')
    // const notThatSimpleArrondissements = simplifier(arrondissements, 0.0002)
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
            for (let point of feature.geometry.coordinates[0]) {
                // point[0] -= 2.32
                // point[0] *= 7000
                // point[0] += (svg.clientWidth/2 - 100)
                // point[1] -= 48.815
                // point[1] *= 10700 * 1.3
                point = normalizePoint(point, svg.clientWidth/2 - 100)
                ctx2.lineTo(point[0], point[1])
                ctx2.stroke()
            }
            ctx2.closePath()
        }
    }

    const responses = results.length


    function drawBlobs () {
        ctx.moveTo(10, 10)
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#fff'

        const zonesToFill = {
            'transparent': [],
            'rgba(255, 106, 213, 0.4)': [],
            'rgba(255, 106, 213, 0.6)': [],
            'rgba(255, 106, 213, 0.8)': [],
        }

        for (const [index, feature] of simpleArrondissements.features.entries()) {
            ctx.save()
            for (let point of feature.geometry.coordinates[0]) {
                    point = normalizePoint(point, svg.clientWidth/2 - 100)
            }

            const points = feature.geometry.coordinates[0]
            var line = d3.line().context(ctx).curve(d3.curveBundle.beta(1))
            line(points)
            // ctx.stroke()
            ctx.closePath()

            const visitors =
                results.reduce((acc, _res) =>
                    acc + _res.meets
                        .reduce((acc, _meet) =>
                            acc + _meet.dates
                                .reduce((acc, _date) =>
                                    acc + Number((index+1) === parseInt(_date.quartiers)), 0
                                ), 0), 0);

            // if (visitors) zonesToFill.push(index)

            ctx.fillStyle = 'transparent'
            if ( visitors/responses > 0.1 ) {
                ctx.fillStyle = 'rgba(255, 106, 213)'
                ctx.globalAlpha = 0.4
            }
            // if ( visitors/responses > 0.4 ) {
            //     ctx.fillStyle = 'rgba(255, 106, 213, 0.6)'
            // }
            // if ( visitors/responses > 0.7 ) {
            //     ctx.fillStyle = 'rgba(255, 106, 213, 0.8)'
            // }

            // console.log(ctx.fillStyle)
            ctx.fill()
            // addPoints()
            // ctx.fillStyle = 'white'
            // ctx.fontSize = '16px'
            // ctx.fontFamily = 'Arial'
            // ctx.fillText(index.toString(), feature.geometry.coordinates[0][0] + 50, feature.geometry.coordinates[0][1] + 50)
            ctx.restore()
        }
    }

    let interestPointsCoords = [], interestPointsAddresses = []
    function addPoints () {
        results.forEach(_res => {
            _res.meets.forEach(_meet => {
                _meet.dates.forEach(async _date => {
                    if (_date.address) {
                        const geocoding = await geocode(_date.address)
                        let point = geocoding.features[0].geometry.coordinates
                        point = normalizePoint(point, svg.clientWidth/2 - 100)
                        interestPointsCoords.push(point)
                        const gradient = ctx.createRadialGradient(Math.round(point[0]), Math.round(point[1]), 5, point[0], point[1], 30)
                        gradient.addColorStop(0, '#FF6AD5')
                        gradient.addColorStop(1, 'rgba(255,106,213,0)');
                        ctx.fillStyle = gradient
                        ctx.fill()
                    }
                })
            })
        })
    }

    function resize() {
        blobs.width = window.innerWidth
        drawBlobs()
        drawMap()
    }

    let overPoint
    function handleMouseMove (e) {
        // const clientX = window.innerWidth - e.clientX
        const clientX = e.clientX
        const clientY = window.innerHeight - e.clientY
        let isOverPoint = false
        for (const [index, interestPoint] of interestPointsCoords.entries()) {
            if (distance([clientX, clientY], interestPoint) < 30) {isOverPoint = true; overPoint = index;}
        }

        if (isOverPoint) e.target.style.cursor = 'pointer'
        else {e.target.style.cursor = 'initial'; overPoint = undefined;}
    }

    function handleClick() {
        if (overPoint) {
            zoom(interestPointsCoords[overPoint])
        }
    }

    function zoom(pos) {
        map.style.transform = 'scale(2)'
        blobs.style.transform = 'scale(2)'
    }

    onMount(async () => {
        canvas.width = window.innerWidth 
            // * window.devicePixelRatio
        canvas.height = window.innerHeight 
            // * window.devicePixelRatio
        blobs.width = window.innerWidth 
            // * window.devicePixelRatio
        blobs.height = window.innerHeight 
            // * window.devicePixelRatio
        map.width = window.innerWidth 
            // * window.devicePixelRatio
        map.height = window.innerHeight 
            // * window.devicePixelRatio

        ctx = blobs.getContext('2d')
        ctx2 = map.getContext('2d')
        
        // smoothing
        ctx.imageSmoothingEnabled = true
        // ctx.translate(0.5,0.5)
        ctx2.imageSmoothingEnabled = true
        // ctx.translate(0.5,0.5);

        drawBlobs()
        addPoints()
        drawMap()

        console.log(interestPointsCoords)

        window.addEventListener('resize', resize)
    })


</script>

<style lang="stylus">
    .blobs, .map
        transform rotate(180deg) scaleX(-1)
    canvas, img
      position absolute

    img
      opacity 0
      width: 100%
      height 100%
</style>

<img bind:this={svg} src={mapSrc} alt="">
<canvas bind:this={canvas}>
</canvas>

<canvas class="map" bind:this={map}>
</canvas>
<canvas on:click={handleClick} on:mousemove={handleMouseMove} class="blobs" bind:this={blobs}>
</canvas>