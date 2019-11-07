export function sort_ASCII(obj){
    let arr = new Array()
    let num = 0
    for(let i in obj){
        arr[num] = i
        num++
    }
    let sortArr = arr.sort()
    let sortObj = {}
    for(let i in sortArr){
        sortObj[sortArr[i]] = obj[sortArr[i]]
    }
    return sortObj
}