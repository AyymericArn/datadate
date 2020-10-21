export const trigoangle = ([cx,cy]: number[], [dx,dy]: number[]) => Math.atan2(dy - cy, dx - cx) * 180 / Math.PI

export const distance = ([cx, cy]: number[], [dx, dy]: number[]) => Math.sqrt(Math.pow(cx - dx, 2) + Math.pow(cy - dy, 2))

export const normalizePoint = (point: number[], offset: number, time: number) => {
    point[0] -= 2.32
    point[0] *= 4000
    * (window.innerWidth/1920) 
    point[0] += (offset)
    point[1] -= 48.805
    point[1] *= 10100
    *  (window.innerHeight/1080)
    return point
}

export const geocode = async (address: string) => {
    try {
        const response = await fetch('https://api-adresse.data.gouv.fr/search/?q='+address).catch(()=>null)
        const result = await response?.json()
        return result
    } catch (e) {}
}