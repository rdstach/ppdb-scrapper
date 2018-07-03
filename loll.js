const fs = require('fs'),
      axios = require('axios'),
      cheerio = require('cheerio'),
      print = console.log,
      param = process.argv[2]
      status = process.argv[3];

let newParam = param.split(',')

// print(newParam)
// print(typeof newParam)
// print(newParam.length)

for (var i = 0; i < newParam.length; i++) {
  search(newParam[i], status, i)
  // print(newParam)
}

// search(newParam[2], status)

// search(newParam[0], status)

function search(param, status, num) {
  axios.get(`https://api-jkt.siap-ppdb.com/cari?no_daftar=${param}`)
    // .then((response) => {
    //   if (response.status == 200) {
    //     const body = response.data;
    //     const $ = cheerio.load(body);


    //     const tbody = $($('tr td span:contains("Tempat, Tanggal Lahir")').closest('tr').children("td")[1]).text()
    //     // const tbody = $('table mtable.table.table-komplit').text();

    //     print(body)
    //   }
    // }, (error) => print(err))
    .then(function (response) {
        let raw = response.data[0][3][6][3];
        let newStr = raw.split(',');

      // if (status == 1) {
      //   print(response.data[2][3][5][3][0] + ' == ' + response.data[0][3][2][3])
      // } else if (status == 2) {
      // } else if (status == 3) {
      //   print(response.data[2][3][5][3][0] + ' == ' + response.data[2][3][5][3][0])
      // } else if (status == 4) {
      //   print(response.data[2][3][5][3][0] + ' == ' + response.data[0][3][4][3])
      // }
      // else {
      //   print('wat')
      // }

      print(num + '. ' + response.data[0][3][2][3] + ' 1== ' + newStr[0] + ' 2== ' + response.data[2][3][5][3][0] + ' 3== ' + response.data[0][3][4][3])
    })
    .catch(function (error) {
      console.log(error);
    });
}

