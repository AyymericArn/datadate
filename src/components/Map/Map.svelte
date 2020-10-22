<script>
    import * as d3 from 'd3-shape'
    import mapSrc from '../../assets/DessinArrondissement.svg'
    import arrondissements from '../../data/arrondissements.geo.json'
    import streets from '../../data/voie.json'
    import results from '../../data/results.json'

    import { onMount } from 'svelte'
    import { selected } from '../../stores/state'

    import { trigoangle, normalizePoint, geocode, distance } from '../../utils'

    // import { vec3 } from 'gl-matrix'
    // import enableWebGlCanvas from '../../lib/webgl/Canvas2DtoWebGL'

    // const randf = require('randf')
    const simplifier = require('simplify-geojson')
    const TWEEN = require('@tweenjs/tween.js')
    const inside = require('point-in-polygon')

    const notThatSimpleArrondissements = simplifier(arrondissements, 0.0002)
    const simpleArrondissements = simplifier(arrondissements, 0.002)

    // props
    export let stepped = false
    export let index = 0

    let canvas, blobs, map, svg, ctx, ctx2
    // let zoomLevel = {val: 4}
    // let center = {x: -1077/1.3, y: -620/1.3}
    let zoomLevel = {val: 1}
    let center = {x: 0, y: 0}
    let shouldRender = false, isZooming = false
    let state = {
        isZoomed: false,
        isDragging: false
    }
    let shouldDrawMap = true

    let time = 0
    setInterval(() => {
        time++
    }, 1000);

    const colors = {
        'alternant':'#5E02D4',
        'student': '#FF6B00',
        'jobless':'#00FFC2',
        'employed': '#FFCC33',
        'retired':'#FF6AD5',
        'other': '#2A92E8'
    }

    function drawStreets () {
        console.log('drawstreet')
        // ctx2.save()
        // ctx2.scale(zoomLevel.val, zoomLevel.val)
        // ctx2.translate(center.x, center.y)
        // ctx2.fillStyle='#fff'
        for (const feature of streets.features) {
            for (const point of feature.geometry.coordinates) {
                // console.log(point)
                ctx2.lineTo(point[0], point[1])
                ctx2.stroke()
            }
        }
        // ctx2.restore()
    }

    async function drawMap () {
        // ctx2.moveTo(10, 10)
        ctx2.save()
        ctx2.scale(zoomLevel.val, zoomLevel.val)
        ctx2.translate(center.x, center.y)
        ctx2.fillStyle = '#fff'
        ctx2.strokeStyle = '#ffffff88'
        ctx2.globalAlpha = 0.5

        // console.log(arrondissements.features[0].geometry.coordinates[0])
        for (const feature of notThatSimpleArrondissements.features) {
            ctx2.beginPath()
            ctx2.lineWidth = 3.0
            let prevPoint = feature.geometry.coordinates[0][0]
            for (let point of feature.geometry.coordinates[0]) {
                ctx2.lineTo(point[0], point[1])
                ctx2.stroke()
            }
            ctx2.closePath()
        }
        // drawStreets()
        ctx2.restore()
    }

    function resizePoints () {
        // for (const feature of streets.features) {
        //     for (let point of feature.geometry.coordinates) {
        //         if (stepped) point = normalizePoint(point, svg.clientWidth/2 - 100, 0.5)
        //         else point = normalizePoint(point, svg.clientWidth/2 - 100, 1)
        //     }
        // }
        for (const feature of arrondissements.features) {
            for (let point of feature.geometry.coordinates[0]) {
                if (!stepped) point = normalizePoint(point, svg.clientWidth/2 - 100, 1)
                else point = normalizePoint(point, svg.clientWidth/2 - 100, 0.5)
            }
        }
        for (const feature of notThatSimpleArrondissements.features) {
            for (let point of feature.geometry.coordinates[0]) {
                if (!stepped) point = normalizePoint(point, svg.clientWidth/2 - 100, 1)
                else point = normalizePoint(point, svg.clientWidth/2 - 100, 0.5)
            }
        }
        for (const feature of simpleArrondissements.features) {
            for (let point of feature.geometry.coordinates[0]) {
                if (!stepped) point = normalizePoint(point, svg.clientWidth/2 - 100, 1)
                else point = normalizePoint(point, svg.clientWidth/2 - 100, 0.5)
            }
        }
    }

    let visitors;
    function extractVisitors () {
        visitors = [...Array(20).keys()].map(() => {
            return { alternant: 0, student: 0, employed: 0, jobless: 0, other: 0, retired: 0 }
        })

        ;results.forEach((_res) => {
            _res.meets.forEach(_meet => {
                _meet.dates.forEach(_date => {
                    if (!isNaN(parseInt(_date.quartiers))) visitors[parseInt(_date.quartiers)-1][_res.situation] += 1
                })
            })
        })

        console.log('visitors', visitors)
    }

    let hotZones = []
    function drawBlobs () {
        ctx.save()
        ctx.scale(zoomLevel.val, zoomLevel.val)
        ctx.translate(center.x, center.y)
        ctx.moveTo(10, 10)
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#fff'

        for (const population of $selected.population) {
            const totalPop = results.reduce((acc, _res) => {
                if (_res.situation === population) return acc + 1
                return acc
            }, 0)
            console.log(population, totalPop)
            for (const [index, feature] of simpleArrondissements.features.entries()) {
                // ctx.beginPath()

                const shape = new Path2D()
                const points = feature.geometry.coordinates[0]
                const line = d3.line().context(shape).curve(d3.curveBundle.beta(1))
                line(points)
                shape.closePath()

                ctx.fillStyle = 'transparent'
                if ( visitors[index][population]/totalPop >= 0.1 ) {
                    ctx.fillStyle = colors[population]
                    ctx.globalAlpha = 0.4
                }
                if ( visitors[index][population]/totalPop >= 0.4 ) {
                    ctx.fillStyle = colors[population]
                    ctx.globalAlpha = 0.6
                    if (!hotZones.some(_z => (_z[0][0] === points[0][0] && _z[0][1] === points[0][1])))
                        hotZones.push(points)
                }
                if ( visitors[index][population]/totalPop >= 0.7 ) {
                    ctx.fillStyle = colors[population]
                    ctx.globalAlpha = 0.8
                }

                ctx.fill(shape)
                if (!isZooming && !state.isDragging) addPoints(shape, population )
                // ctx.fillStyle = 'white'
                // ctx.fontSize = '16px'
                // ctx.fontFamily = 'Arial'
                // ctx.fillText(index.toString(), feature.geometry.coordinates[0][0] + 50, feature.geometry.coordinates[0][1] + 50)
            }
        }

        ctx.restore()
    }

    let interestPointsCoords = [], interestPointsAddresses = []
    let geocoding
    function addPoints (path, population) {
        const hasCache = !!geocoding

        for (const _res of results) {
            if (_res.situation !== population) continue
            _res.meets.forEach(async _meet => {
                for (const _date of _meet.dates) {
                    if (_date.address) {
    
                        const geocoding = await geocode(_date.address)
    
                        if (!geocoding) continue

                        let point = geocoding.features[0].geometry.coordinates
                        
                        if (!hasCache) point = normalizePoint(point, svg.clientWidth/2 - 100)
                        
                        // console.log(point)
                        // console.log(point[0] * zoomLevel.val + center.x)
                        // console.log(point[1] * zoomLevel.val + center.y)
                        
                        if (state.isZoomed) {
                            point[0] *= zoomLevel.val/1.15
                            point[0] += center.x/0.3
                            point[1] *= zoomLevel.val/1.15
                            point[1] += center.y/0.3
                        }
                        
                        // console.log(point)
                        
                        if (!interestPointsCoords.some(_p => _p[0] === point[0])) {
                            interestPointsCoords.push(point)
                        }
                        if (!interestPointsAddresses.includes(_date.address)) {
                            interestPointsAddresses.push(_date.address)
                        }
    
                        const gradient = ctx.createRadialGradient(
                            Math.round(point[0]),
                            Math.round(point[1]),
                            15,
                            point[0],
                            point[1],
                            16
                        )
    
                        gradient.addColorStop(0, colors[population])
    
                        gradient.addColorStop(1, 'rgba(255,106,213,0)');
    
                        ctx.fillStyle = gradient
    
                        ctx.fill(path)
                    }
                }
            })
        }
    }

    function resize() {
        blobs.width = window.innerWidth
        drawBlobs()
        drawMap()
    }

    let overPoint
    function handleMouseMove (e) {
        // const clientX = window.innerWidth - e.clientX
        let clientX = e.clientX
        let clientY = window.innerHeight - e.clientY

        if (state.isZoomed) {
            clientX *= zoomLevel.val/3.1
            clientX += center.x/2.3
            clientY *= zoomLevel.val/3.1
            clientY += center.y/2.3
        }

        // console.log(clientX, clientY)
        clientX -= (translation.x*zoomLevel.val*12)
        clientY += (translation.y*zoomLevel.val*12)

        // console.log('after++', clientX, clientY)
        // console.log('translation', translation.x, translation.y)
        // console.log('multiplier', translation.x*zoomLevel.val*12, translation.y*zoomLevel.val*12)

        let isOverPoint = false

        for (const [index, interestPoint] of interestPointsCoords.entries()) {
            if (distance([clientX, clientY], interestPoint) < 16) {isOverPoint = true; overPoint = index;}
        }

        if (isOverPoint) e.target.style.cursor = 'pointer'
        else {e.target.style.cursor = 'initial'; overPoint = undefined;}

        for (const hotZone of hotZones) {
            if (inside([clientX, clientY], hotZone)) console.log('inside hot zone !')
        }
    }

    let mousePosition = {x: 0, y: 0}
    let translation = {x: 0, y: 0}
    function updateMousePosition(e) {
        mousePosition.x = e.clientX
        mousePosition.y = e.clientY
        if (mouseDown) {
            translation.x = (e.clientX - mouseBasePosition.x)/50
            translation.y = (-(e.clientY - mouseBasePosition.y))/50
            ctx.translate(translation.x, translation.y)
            ctx2.translate(translation.x, translation.y)
        }
    }

    let setPin = false
    function handleClick(e) {
        // console.log('interespoint', interestPointsCoords)
        // console.log('clicked')
        // console.log(e)
        // console.log($selected)
        if (overPoint !== undefined && !state.isZoomed) {
            zoom(interestPointsCoords[overPoint])
        }
        setTimeout(() => {
            appearPoint(interestPointsCoords[overPoint], interestPointsAddresses[overPoint])
        }, 1000)
        // if (!state.isZoomed) {
        // } else {
        //     appearPoint(interestPointsCoords[overPoint], interestPointsAddresses[overPoint])
        // }
    }

    let mouseDown = false, mouseBasePosition = {x: 0, y: 0}
    function handleMouseDown (e) {
        shouldRender = true
        // shouldDrawMap = false
        state.isDragging = true
        mouseDown = true
        mouseBasePosition.x = e.clientX
        mouseBasePosition.y = e.clientY
    }
    function handleMouseUp (e) {
        // shouldDrawMap = true
        shouldRender = false
        mouseDown = false
        state.isDragging = false
        render()
    }

    function zoomScroll() {

    }

    function zoom(pos) {
        // console.log('zoomed');
        shouldRender = true
        isZooming = true
        state.isZoomed = true
        vignetting.style.opacity = 1
        const scale = new TWEEN.Tween(zoomLevel)
            .to({val: 4}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start()
            .onComplete(() => shouldRender = false)
        const translate = new TWEEN.Tween(center)
            .to({x: -pos[0] / 1.35, y: -pos[1] / 1.35}, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start()
            .onComplete(() => {
                isZooming = false
                render()
            })
    }

    let pin
    let vignetting
    function appearPoint(point, address) {
        // point[0] *= zoomLevel.val/1.15
        // point[0] += center.x/0.3
        // point[1] *= zoomLevel.val/1.15
        // point[1] += center.y/0.3
        point[0] += (translation.x*zoomLevel.val*12)
        point[0] -= center.x/2.3
        point[0] /= zoomLevel.val/3.1

        point[1] -= (translation.y*zoomLevel.val*12)
        point[1] -= center.y/2.3
        point[1] /= zoomLevel.val/3.1

        pin.style.left = `${point[0] - 14}px`
        pin.style.top = `${window.innerHeight - point[1] - 90 - 14}px`

        setTimeout(() => {
            pin.style.opacity = 1
            setPin = true
            pin.children[0].textContent = address.substring(0, address.indexOf(','))
        }, 200)

        setTimeout(() => setPin = false, 1000)

        console.log('appearpoint', point)
    }

    function render () {
        ctx.save()
        ctx.translate(0, 0)
        ctx2.translate(0, 0)
        ctx.clearRect(0, 0, blobs.width*window.devicePixelRatio+translation.x, blobs.height*window.devicePixelRatio-translation.y)
        ctx2.clearRect(0, 0, map.width*window.devicePixelRatio+translation.x, map.height*window.devicePixelRatio-translation.y)
        ctx.restore()
        drawBlobs()
        // drawStreets()
        if (shouldDrawMap) drawMap()
        // console.log('render' + index + shouldDrawMap)
    }
    
    function animate() {
        // ctx.start2D()
        if (shouldRender) {
            render()
            TWEEN.update()
        }
        // addPoints()
        requestAnimationFrame(animate)
        // ctx.finish2D()
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

        // ctx = enableWebGLCanvas( blobs );
        // ctx2 = enableWebGLCanvas( map );

        // smoothing
        // ctx.imageSmoothingEnabled = true
        // ctx.translate(0.5,0.5)
        // ctx2.imageSmoothingEnabled = true
        // ctx.translate(0.5,0.5);

        extractVisitors()

        resizePoints()
        // drawBlobs()
        // drawMap()

        shouldRender = true
        animate()
        shouldRender = false
        // addPoints()

        selected.subscribe(val => {
            render()
        })

        // window.time = 1
        // setInterval(() => {
        //     window.time++
        // }, 1000);

        window.addEventListener('resize', resize)
        window.addEventListener('touchstart', handleMouseDown)
        window.addEventListener('touchend', handleMouseUp)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', updateMousePosition)
    })


</script>

<style lang="stylus">
    .pin
        position absolute
        opacity 0
        border-left 1px solid white
        transition opacity 0.3s ease
        padding-left 16px
        height 90px
        display flex
        z-index 60
        flex-direction column
        justify-content space-between
        pointer-events none

        h3
            font-family: Shrikhand;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 23px;
            color: #FFFFFF;
        button
            cursor pointer
            border 1px solid white
            padding 8px 12px
            border-radius 50px
            background none
            color white
            pointer-events all

        &.animated
          animation appear 0.3s ease 1 both
          h3
            animation pop 0.3s ease 1 0.3s both
          button
            animation pop_bounce 0.3s ease 1 0.6s both

    .blobs, .map
        transform rotate(180deg) scaleX(-1)
    .map
        opacity 0.2

    .vignetting
        position absolute
        z-index 20
        width 100vw
        height 100vh
        opacity: 0;
        pointer-events none
        background-image radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,2) 100%)

    canvas, img
      position absolute

    img
      opacity 0
      width: 100%
      height 100%

    @keyframes appear {
      0% {transform: scaleY(0)}
      100% {transform: scaleY(1)}
    }

    @keyframes pop {
      from {transform: scale(0)}
      to {transform: scale(1)}
    }

    @keyframes pop_bounce {
      0% {transform: scale(0)}
      80% {transform: scale(1.2)}
      100% {transform: scale(1)}
    }

</style>

<img bind:this={svg} src={mapSrc} alt="">

<div bind:this={pin} class={ setPin ? 'pin animated' : 'pin'}>
    <h3>Endroit</h3>
    <button>Partager à ton date →</button>
</div>

<div bind:this={vignetting} class="vignetting"></div>

<canvas bind:this={canvas}>
</canvas>

<canvas class="map" bind:this={map}>
</canvas>
<canvas on:click={handleClick} on:mousemove={handleMouseMove} class="blobs" bind:this={blobs}>
</canvas>