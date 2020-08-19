const fs = require("fs")
const csvParser = require("csv-parser") //instalar via npm install csv-parser, antes
const createCsvWriter = require('csv-writer').createObjectCsvWriter; //instalar via npm install
const chalk = require('chalk');

const stream = fs.createReadStream("houses.csv")

//stream.pipe(csvParser()) //a função PIPE vai jogando os dados pouco a pouco

console.log(chalk.bold.rgb(10, 100, 200)('Arquivo começou a ser processado'));

let conteudo = [] //lista vazia que vai armazenar a saída de xxx.csv

stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        id: conteudo.length +1,
        city: data['city'],
        area: Number(data['area']),
        rooms: Number(data['rooms']),
        bathroom: Number(data['bathroom']),
        'parking spaces': Number(data['parking spaces']),
        floor: data['floor'],
        animal: data['animal'],
        furniture: data['furniture'],
        hoa: Number(data['hoa']*100),
        'rent amount': Number(data['rent amount']*100),
        'property tax': Number(data['property tax']*100),
        'fire insurance': Number(data['fire insurance']*100),
        total: Number(data['total']*100),
    })
    console.log(conteudo[0]) 
})

stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'imoveis.csv',
        header: [
             //city,area,rooms,bathroom,parking spaces,floor,animal,furniture,hoa,rent amount,property tax,fire insurance,total
            {id: 'id', title: 'id'},
            {id: 'city', title: 'cidade'},
            {id: 'area', title: 'area'},
            {id: 'rooms', title: 'sala'},
            {id: 'bathroom', title: 'banheiros'},
            {id: 'parking spaces', title: 'garagens'},
            {id: 'floor', title: 'andares'},
            {id: 'animal', title: 'permite_animais'},
            {id: 'furniture', title: 'mobilia'},
            {id: 'hoa', title: 'taxa_associacao'},
            {id: 'rent amount', title: 'valor_aluguel'},
            {id: 'property tax', title: 'taxa_predial'},
            {id: 'fire insurance', title: 'seguro_incendio'},
            {id: 'total', title: 'total'},
        ]
    });
    csvWriter.writeRecords(conteudo)
    .then(() => {
    });
    console.log(chalk.bold.rgb(10, 100, 200)('O arquivo terminou de ser processado e o arquivo imoveis.csv foi criado'));
})

