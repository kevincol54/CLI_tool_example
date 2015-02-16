var request = require('superagent'),
    chalk   = require('chalk');


function ask(question, callback) {
  var stdin = process.stdin;
  var stdout = process.stdout;
 
  stdout.write(question + ": ");
 
  stdin.once('data', function(data) {
    data = data.toString().trim().toUpperCase();
    callback(data); 
  });
}

ask("What is the symbol of the stock you would like to look up?", function(symbol) {
  console.log("Your symbol is: ", symbol);
  if (symbol == "CATS"){
    getCats()
  } else {
    getQuote(symbol)
  }
});

function getQuote (symbol) {
  request
    .get('http://dev.markitondemand.com/Api/v2/Quote/json')
    .query({ symbol: symbol})
    .set('Accept', 'application/json')
    .end(function(error, res){
      stock = JSON.parse(res.text);
      console.log("The last price of " + stock.Name + " was $" + stock.LastPrice);
    });
}

function getCats () {
  var query = {v: '1.0', rsz: '8', q: "nic cage cats", safe: 'active'}
  request
    .get('http://ajax.googleapis.com/ajax/services/search/images')
    .query(query)
    .end(function(error, res){
      var images = JSON.parse(res["text"])
      images = images.responseData.results
      if (images.length > 0) {
        var image  = images[Math.floor(Math.random() * images.length)]
        console.log(chalk.yellow("Clickbait:"), image.unescapedUrl)
      }
    });
}