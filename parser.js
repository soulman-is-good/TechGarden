var fs = require('fs');
var x = require('./src/data/newdata.json');
var j = 0;
for (var i in x.items) {
  if (x.items[i].category_id === 12) {
    j++;
    if (j % 5 === 0) {
      x.items[i].category_id = 13;
      x.items[i].lat = parseFloat(x.items[i].lat) + Math.random() * 100 * 0.00000904363;
      x.items[i].lon = parseFloat(x.items[i].lon) + Math.random() * 100 * 0.00000904363;
    }
  }
}
x.categories['13'] = 'УП';
fs.writeFileSync('./src/data/data.json', JSON.stringify(x));