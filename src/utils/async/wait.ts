

export const waitFor = (ms: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(''), ms)
    })
}
