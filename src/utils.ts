export const trigoangle = ([cx,cy]: number[], [dx,dy]: number[]) => Math.atan2(dy - cy, dx - cx) * 180 / Math.PI

export const distance = ([cx, cy]: number[], [dx, dy]: number[]) => Math.sqrt(Math.pow(cx - dx, 2) + Math.pow(cy - dy, 2))

export const normalizePoint = (point: number[], offset: number) => {
    point[0] -= 2.32
    point[0] *= 7000
    point[0] += (offset)
    point[1] -= 48.815
    point[1] *= 10700 * 1.3
    return point
}

export const geocode = async (address: string) => {
    const response = await fetch('https://api-adresse.data.gouv.fr/search/?q='+address)
    const result = await response.json()
    return result
}