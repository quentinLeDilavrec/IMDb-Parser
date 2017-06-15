import * as fs from 'fs'

let txt = fs.readFileSync('in.txt')
let t = '"#15SecondScare"' + " (2015) {Because We Don't Want You to Fall Asleep (#1.3)}	USA"
let z = '"#Adulthood" (????)					USA'
z = '"#VanLifeAttila" (2016) {#CookingWithTheHun(bacon turkey)(#3.14) } Canada'

console.dir(t)

//let rmtab = (s: string) => (1) ? s : rmtab()

let g = t.split(/" \(/)
console.dir(g)

let h = g[1].split(/\)[ |\t]/)

console.dir(h)

let i = (h[1].charAt(0) == '}') ? h[1].split(/\}\t/) : h[1].split(/\t/)

console.dir([g[0], h[0], i[0].slice(1), i])

console.log(11111111111111111);

console.dir(
    [t.split(/" \(/)[0],
    t.split(/" \(/)[1].split(/\) \{/)[0],
    t.split(/" \(/)[1].split(/\) {/)[1].split(/\}\t/)[0],
    t.split(/" \(/)[1].split(/\) {/)[1]]
)
console.log(222222222222222222);
console.dir('(2011) {5th Houston Liberty Festival: Sporting Clays Tournament Benefitting "Homes for Our Troops" (#2.11)}	USA')

console.dir(
    'ATSN TV: American Trigger Sports Network Television" (2011) {5th Houston Liberty Festival: Sporting Clays Tournament Benefitting "Homes for Our Troops" (#2.11) }	USA'
        //.split(/[^\"]*\" \(/).join('')
        .split(/" \(/).slice(1).join('"')
)
//if (1) throw ''


let fct = (s: string) =>
    s.split('\r\n"').map(t => ((x => { /*console.dir(t);*/ return x })(t).match(/\) \{/) != null) ?
        [t.split(/" \(/)[0], t.split(/" \(/)[1].split(/\) \{/)[0], t.split(/" \(/)[1].split(/\) {/)[1].split(/\}\t/)[0], t.split(/" \(/).slice(1).join('"').split(/\) {/)[1].split(/\}\t/)[1].trim()] :
        [t.split(/" \(/)[0], t.split(/" \(/)[1].split(/\)\t/)[0], "", t.split(/" \(/)[1].split(/\)\t/)[1].trim()])

console.log(777777777777777)
console.dir(
    fs.writeFileSync('out.csv', fct(txt.toString().substring(1)).map(x => x.join('@@@')).join('++++'))
)