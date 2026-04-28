import fs from 'fs';
import pdf from 'pdf-parse';

let dataBuffer = fs.readFileSync('ppm_rec_doc.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error(error);
});
