const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()


const passengers = [
  {
      name: "Joyce",
      flightNumber: 7859,
      time: "18h00",
  },
  {
      name: "Brock",
      flightNumber: 7859,
      time: "18h00",
  },
  {
      name: "Eve",
      flightNumber: 7859,
      time: "18h00",
  },
];

app.get('/', (req, res)=>{

  const filePath = path.join(__dirname, "print.ejs")

  ejs.renderFile(filePath, {passengers}, (err, html)=>{
    if(err){
      return res.send('Erro na leitura do caminho')
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      }
    }

    //Criar pdf
    pdf.create(html, options).toFile("report.pdf", (err, data)=>{
      if(err){
        return res.send("Erro ao gerar pdf")
      }
      //Enviar para o navegador
      return res.send("Arquivo gerado com sucesso");
    })
  })


});

app.listen(3000, ()=>{
  console.log('🚀 Back-end started')
})