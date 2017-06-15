import * as fs from 'fs'
import * as buf from 'buffer-split'
import * as esc from 'unicode-escape'
import * as he from "he";

let txt = fs.readFileSync('in.txt', 'utf8')
//let txt = fs.readFileSync('prodIMDB.txt', 'utf8')
//txt.slice(txt.length - 10, txt.length).map(x => fs.appendFileSync('resprodaaa.txt', (x as Buffer).toString('utf8', 0, x.length) + '\n\n', 'utf8'))
//.map(x => x.toString()) as string[]
//let txt = fs.readFileSync('D:\\tables Imbd\\producers.list')//.toString()
//let filePath = 'D:\\tables Imbd\\producers';
/*
var CHUNK_SIZE = 10 * 1024 * 1024, // 10MB
    buffer = new Buffer(CHUNK_SIZE),

fs.open(filePath, 'r', function (err, fd) {
    if (err) throw err;
    function readNextChunk() {
        fs.read(fd, buffer, 0, CHUNK_SIZE, null, function (err, nread) {
            if (err) throw err;

            if (nread === 0) {
                // done reading file, do any necessary finalization steps

                fs.close(fd, function (err) {
                    if (err) throw err;
                });
                return;
            }

            var data;
            if (nread < CHUNK_SIZE)
                data = buffer.slice(0, nread);
            else
                data = buffer;

        });
    }
    readNextChunk();
});
*/
//fs.appendFileSync(filePath + '.txt', fs.readFileSync(filePath + '.list'))

//console.log(txt)/**/

let a = txt.split(')\r\n\r\n').map(x => x.split(')\r\n'))


let b = a.map(x => {
    //console.dir(x)
    return {
        nom: x[0].trim().split(/[\t]+/)[0].trim(),
        films: (x.length == 1) ?
            [x[0].trim().split(/[\t]+/)[1].trim()] :
            [x[0].trim().split(/[\t]+/)[1]].concat(x[0].split(/[\t]+/)[1].trim(), x.slice(1).map(x => x.trim()))
    };
})
//console.log(c.map(x => x.nom + '\n\t' + x.films.map(x =>x.join()).join('\n\t')).join('\n\n'))
let c = b.map(x => {
    return {
        nom: x.nom,
        films: x.films
            .map(x => {
                let res: string[] = [], tmp: string[] = [];

                if (x.match(/^.* \(.*\) \{.*\}  \(.*\) \(.*$/) != null)// _ () {}  () (

                    res = (x => [x[0], x[1], '\\N']
                        .concat(
                        (y => (y == null) ?
                            ['\\N', '\\N', '\\N'] :
                            y.slice(1))(/^(.*)\(#(.*)\.(.*)\)$/.exec(x[2])).map(x => (x == '') ? '\\N' : x)
                        )
                        .concat([x[3], x[4]]))
                        (/^(.*) \((.*)\) \{(.*)\}  \((.*)\) \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\) \{.*\}  \(.*$/) != null)// _ () {}  (

                    res = (x => [x[0], x[1], '\\N']
                        .concat(
                        (y => (y == null) ?
                            ['\\N', '\\N', '\\N'] :
                            y.slice(1))(/^(.*)\(#(.*)\.(.*)\)$/.exec(x[2])).map(x => (x == '') ? '\\N' : x)
                        )
                        .concat([x[3], '\\N']))
                        (/^(.*) \((.*)\) \{(.*)\}  \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\) \(.*\)  \(.*\) \(.*\) \(.*$/) != null) // _ ()  () () () (

                    res = (x => [x[0], x[1], '\\N']
                        .concat(
                        (y => (y == null) ?
                            ['\\N', '\\N', '\\N'] :
                            y.slice(1))(/^(.*)\(#(.*)\.(.*)\)$/.exec(x[2])).map(x => (x == '') ? '\\N' : x)
                        )
                        .concat([x[3], x[4]]))
                        (/^(.*) \((.*)\) \((.*)\)  \((.*)\) \((.*)\) \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\) \(.*\)  \(.*\) \(.*$/) != null) // _ ()  () () (

                    res = (x => [x[0], x[1], x[2], '\\N', '\\N', x[3], x[4]])(/^(.*) \((.*)\) \((.*)\)  \((.*)\) \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\)  \(.*\) \(.*$/) != null) // _ ()  () (

                    res = (x => [x[0], x[1], '\\N', '\\N', '\\N', x[2], x[3]])(/^(.*) \((.*)\)  \((.*)\) \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\) \(.*\)  \(.*$/) != null) // _ () ()  (

                    res = (x => [x[0], x[1], x[2], '\\N', '\\N', x[3], '\\N'])(/^(.*) \((.*)\) \((.*)\)  \((.*)$/.exec(x).slice(1))
                else if (x.match(/^.* \(.*\)  \(.*$/) != null)//////// _ ()  (

                    res = (x => [x[0], x[1], '\\N', '\\N', '\\N', x[2], '\\N'])(/^(.*) \((.*)\)  \((.*)$/.exec(x).slice(1))
                else res = [x + '!!!!!!!!!!!!!!!']
                return res
            })
    }
})
//console.log(c.map(x => x.films));

/*console.log(
    "Louis, Where the Hell Are You? (2016)  (producer".match(/^.* \(.*\)  \(.*\) \(.*$/)
)*/
//console.log(c.map(x => x.nom + '\n\t' + x.films.map(x => x.join('***')).join('\n\t')).join('\n'))
fs.writeFileSync('out.csv', c.map(x => x.films.map(y => x.nom + '@@@' + y.join('@@@')).join('++++')).join('++++'))
//console.log(txt[txt.length - 1])











/*
let fct = (s: string) =>
    s.split('\r\n"').map(t => t.match(/\) \{/) != null) ?
        [t.split(/" \(/)[0], t.split(/" \(/)[1].split(/\) \{/)[0], t.split(/" \(/)[1].split(/\) {/)[1].split(/\}\t/)[0], t.split(/" \(/).slice(1).join('"').split(/\) {/)[1].split(/\}\t/)[1].trim()] :
        [t.split(/" \(/)[0], t.split(/" \(/)[1].split(/\)\t/)[0], "", t.split(/" \(/)[1].split(/\)\t/)[1].trim()])

console.log(777777777777777)
console.dir(
    fs.writeFileSync('resultIMDB.csv', fct(txt.toString().substring(1)).map(x => x.join('@@@')).join('++++'))
)
*/