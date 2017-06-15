let base_txt = `Lorem ipsum dolor sit amet, conse'ctetur adipiscing élit. Ut viverra prétium risus, eu a'liquet diam feugiat égét. Sed bibendum nunc sed nis'i dictum, séd sagittis érat' luctus. Donéc consectetur magna elit, id auctor félis tincidunt ut. Véstibulum sagittis néc félis nec tempor. Orci varius natoque pénatibus ét magnis dis parturiént montes, nascetur ridiculus mus. Ut pulvinar cursus arcu eu varius'. Cras aliquam convallis lacus vitae tristiqué. Maécenas vel nibh id magna mo'léstié vulputaté et id magna. Duis' interdum id dui nec moléstié`
.split(' ')

//console.log(base_txt[Math.floor(Math.random() * (base_txt.length-1))])
let getWord = (sep:string,embraceFun:(x:string)=>string) => () => (x=>(x.indexOf(sep)==-1)?x:embraceFun(x))(base_txt[Math.floor(Math.random() * (base_txt.length-1))])

let randWhatEverConsLeng = (f) => (n:number):string[] => (n > 0) ? randWhatEverConsLeng(f)(n - 1).concat(f()) : []
let randNumConsLeng = randWhatEverConsLeng(()=>Math.floor(Math.random() * 9))

//console.log(randNumConsLeng(10))

let base_date_Gen = () => randNumConsLeng(2).join('') + '/' + randNumConsLeng(2).join('') + '/' + randNumConsLeng(4).join('')

//console.log(base_date_Gen())

let base_number_Gen = () => randNumConsLeng(Math.random() * 9).join('') + '.' + randNumConsLeng(Math.random() * 9).join('')

//console.log(base_number_Gen())

let quote_embrace = (str) => '"'+str+'"'

let randGrenerator = [base_number_Gen,base_date_Gen,getWord(',',quote_embrace),getWord(',',quote_embrace)]

let rand_string_Gen = ()=>(x=>(Math.random()>0.5)?x:(x.indexOf('"')==-1)?quote_embrace(x):x)((randGrenerator[Math.floor(Math.random()*(randGrenerator.length))])())

let rand_line_Gen = randWhatEverConsLeng(rand_string_Gen)

//console.log(rand_line_Gen(10))

//console.log(Array<number>(10).fill(5).map(()=>rand_line_Gen(10).join(',')).join('\n'))