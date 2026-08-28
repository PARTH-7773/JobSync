const printOneLine = (data) => {
    let LineData = '';
    for (let i = 0; i < data.length; i++) {
        LineData = i < data.length - 1 ? LineData += data[i] + ',' : LineData += data[i]
    }
    return LineData
}

// const data = printOneLine(['I', 'am', 'parth', 'solanki'])
// console.log(data)



const reverseStr = (str) => {
    console.log(str.length)
    let strReverse = []
    for (let i = str.length - 1; i >= 0; i--) {
        strReverse.push(str[i])
    }

    return strReverse.join('')
}

// const Reverse = reverseStr('hello')
// console.log(Reverse)


const findtheMisssingNumber = (list)=>{
    let actualSum = 0
    list.forEach(i => {
        actualSum += i    
    });

    console.log(actualSum)

}


(()=>{
    console.log("hello")
})()
// findtheMisssingNumber([1,2,3,4,6])
