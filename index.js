const axios = require('axios'),
	print = console.log
	schoolId = process.argv[2],
	fs = require('fs');

let schoolUrl = `https://ppdb.jakarta.go.id/seleksi/reguler/sma/2-${schoolId}-1000.json`;

function loopNumId(i) {
	axios.get(schoolUrl)
		.then(function(response) {
			let lol = response.data.data[i][1],
				nama = response.data.sekolah.nama;
			// print(`${i + 1} : ${lol}`)
			getStudentData(i, lol, nama)
		})
		.catch(function(error) {
			print(error)
		})
}

for (var i = 0; i < 5; i++) {
	loopNumId(i)
}

function getStudentData(num, id, namaSekolah) {
	axios.get(`https://api-jkt.siap-ppdb.com/cari?no_daftar=${id}`)
		.then(function (response) {
			let raw = response.data[0][3][6][3];
			let newStr = raw.split(',');

			// print(num + ',' + response.data[0][3][2][3] + ',' + newStr[0] + ',' +  namaSekolah + ',' + response.data[2][3][4][3][0] + ',' + response.data[0][3][4][3])
			let message = `\n${num+1},${response.data[0][3][2][3]},${newStr[0]},${namaSekolah},${response.data[2][3][4][3][0]},${response.data[0][3][4][3]}`
			writeData(schoolId, message)
		})
		.catch(function (error) {
			print(error)
		})
}

function writeData(schoolId=schoolId, message) {
	fs.appendFile(`data/${schoolId}.csv`, message, function (err) {
	  if (err) {
	    print(error)
	  } else {
	    print(`${schoolId} has been successly written.`)
	  }
	})
}