<script>
    import * as d3 from 'd3-shape'
    import mapSrc from '../../assets/DessinArrondissement.svg'
    import arrondissements from '../../data/arrondissements.geo.json'
    import results from '../../data/results.json'

    import { onMount } from 'svelte'

    import { trigoangle, normalizePoint, geocode, distance } from '../../utils'

    // const randf = require('randf')
    const simplifier = require('simplify-geojson')
    const TWEEN = require('@tweenjs/tween.js')
    // const notThatSimpleArrondissements = simplifier(arrondissements, 0.0002)
    const simpleArrondissements = simplifier(arrondissements, 0.002)

    let canvas, blobs, map, svg, ctx, ctx2
    let zoomLevel = {val: 1}
    let center = {x: 0, y: 0}

    let time = 0
    setInterval(() => {
        time++
    }, 1000);

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
        // ctx2.moveTo(10, 10)
        ctx2.save()
        ctx2.scale(zoomLevel.val, zoomLevel.val)
        ctx2.translate(center.x, center.y)
        ctx2.fillStyle = '#fff'
        ctx2.strokeStyle = '#ffffff88'
        ctx2.globalAlpha = 0.5

        for (const feature of arrondissements.features) {
            ctx2.beginPath()
            ctx.lineWidth = 2.0;
            let prevPoint = feature.geometry.coordinates[0][0]
            for (let point of feature.geometry.coordinates[0]) {
                ctx2.lineTo(point[0], point[1])
                ctx2.stroke()
            }
            ctx2.closePath()
        }
        ctx2.restore()
    }

    const responses = results.length

    function resizePoints () {
        for (const feature of arrondissements.features) {
            for (let point of feature.geometry.coordinates[0]) {
                point = normalizePoint(point, svg.clientWidth/2 - 100, time)
            }
        }
        for (const feature of simpleArrondissements.features) {
            for (let point of feature.geometry.coordinates[0]) {
                point = normalizePoint(point, svg.clientWidth/2 - 100, time)
            }
        }
    }

    function drawBlobs () {
        // console.log(scale);
        ctx.save()
        ctx.scale(zoomLevel.val, zoomLevel.val)
        ctx.translate(center.x, center.y)
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
            // ctx.save()

            ctx.beginPath()

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
            if ( visitors/responses > 0.4 ) {
                ctx.fillStyle = 'rgba(255, 106, 213, 0.6)'
            }
            if ( visitors/responses > 0.7 ) {
                ctx.fillStyle = 'rgba(255, 106, 213, 0.8)'
            }

            // console.log(ctx.fillStyle)
            ctx.fill()
            // addPoints()
            // ctx.fillStyle = 'white'
            // ctx.fontSize = '16px'
            // ctx.fontFamily = 'Arial'
            // ctx.fillText(index.toString(), feature.geometry.coordinates[0][0] + 50, feature.geometry.coordinates[0][1] + 50)
            
            // ctx.restore()
        }
        ctx.restore()
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
        // map.style.transform = 'scale(2)'
        // blobs.style.transform = 'scale(2)'
        // let factor = 1
        console.log('zoomed');
        const scale = new TWEEN.Tween(zoomLevel)
            .to({val: 2}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start()
        // const center = new TWEEN.Tween(center)
        //     .to({x: pos[0] * 100, y: pos[1] * 100}, 1000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .start()
        // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        // ctx2.clearRect(0, 0, window.innerWidth, window.innerHeight)
        // ctx.scale(1.5, 1.5)
        // ctx2.scale(1.5, 1.5)
        // zoomLevel = 2
    }
    
    function animate() {
        ctx.clearRect(0, 0, innerWidth, innerHeight)
        ctx2.clearRect(0, 0, innerWidth, innerHeight)
        drawBlobs()
        drawMap()
        TWEEN.update()
        requestAnimationFrame(animate)
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

        resizePoints()
        // drawBlobs()
        // drawMap()

        animate()
        addPoints()

        // window.time = 1
        // setInterval(() => {
        //     window.time++
        // }, 1000);

        window.addEventListener('resize', resize)
    })


</script>

<style lang="stylus">
    .blobs, .map
        transform rotate(180deg) scaleX(-1)
    .map
        opacity 0.3
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