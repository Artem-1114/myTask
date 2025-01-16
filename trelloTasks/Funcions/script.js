const sum = (a, b) => {
    resolt = a + b
    return resolt
}
console.log(sum(47, 23))


let big = (biges) => {
    
    if (typeof biges !== "string") {
        return console.log('Треба водити лише букви')
    }
    return biges.toUpperCase()
}

console.log(big("Мене завати Артем"))

const arr = (arrays) => {
    if (!Array.isArray(arrays)) {
        return console.log("Лише масив чисел")
    }
    return arrays.map(num => num * 2)
}
console.log(arr(4))

