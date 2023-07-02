export const safeJsonParse = (v: string) => {
    try {
        return JSON.parse(v)
    } catch {
        return {}
    }
}
export const getDate = () => parseInt(`${new Date().valueOf() / 1000}`)