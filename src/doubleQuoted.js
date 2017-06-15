const fs = require('fs')

/*
Some realy specific script to prcess a table like the one that follow



*/

let f = (s) => s.split('\r\n')//.map(x=>x.match(/[(\w),]+/)).map(x=>x.length)///.reduce((acc,y)=>acc+'","'+y,'("'))//.reduce((acc,x)=>'("'+x+'")')
    .map(x => g(x))

let g = (s) => {
    let res = ['']
    curEmbr = ''
    let i = 0
    while (i < s.length) {

        if (s[i] == '"') {
            if (curEmbr == '"') {
                if ((i + 1) < s.length && s[i + 1] != ',') res.push('')
                curEmbr = ''
            } else curEmbr = '"'
        } else {
            if (curEmbr == '') {
                if (s[i] == ',') res.push('')
                else res[res.length - 1] = res[res.length - 1] + s[i]
            } else res[res.length - 1] = res[res.length - 1] + s[i]
        } i++
    }
    return res
}

let tab = f(fs.readFileSync('sample/doubleQuotedTable.csv').toString())

fs.createWriteStream('result/result.sql')
    .write('INSERT INTO TableName (' + tab[0].map(y => '"' + y + '"').join(',') + ')\nVALUES ' +
    tab.slice(1).map(x => '(' + x.map(y => (y == '') ? "null" : '"' + y + '"').join(',') + ')')
        .join(',\n') +
    ';')


var string = 'A\uD835\uDC68';

var strIter = string[Symbol.iterator]();
console.log(strIter.next().value); // "A"
console.log(strIter); 
console.log(strIter.next().value); // "\uD835\uDC68"
