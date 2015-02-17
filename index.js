var request = require('superagent');


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
  getQuote(symbol)
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