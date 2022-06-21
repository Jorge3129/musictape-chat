type CallBack<T> = (item: any, index: number, array: T[]) => Promise<any>

export const asyncForEach = <T = any>(items: T[], callback: CallBack<T>): Promise<any> => {
    return Promise.all(
        items.map(callback)
    )
}
