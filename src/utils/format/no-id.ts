export const removeId = (item: any) => ({...item, id: undefined})

export const removeIds = (items: any[]) => items.map(removeId)
