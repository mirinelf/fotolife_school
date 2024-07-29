const sizeStr = 18

export const validateName = (str: string): string => {
    let name = str.split('/').at(-1)
    let cutName = name && name.length > sizeStr
        ? name.slice(0, 3) + '...' + name.slice(-(sizeStr-5))
        : name
    return cutName ?? ''
}