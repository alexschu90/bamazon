var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Melody123!",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  purchase();
});

function ask() {; 
  inquirer.prompt(
    {
      type: "input", 
      name: "repurchase",
      message: "Would you like to make another order? (type yes or no)",
      choices: ["yes","no"]
  }
  ).then(function(answer){
    if(answer.repurchase === "yes") {
      purchase();
    } else {
      console.log("Thank you for shopping with us and have a nice day!")
      connection.end(); 
    }
  })
}


function purchase() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    inquirer.prompt([
    {
        type: "input", 
        name: "itemID",
        message: "Please select the item id for the product you wish to purchase."
    },
    {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?" 
    }
    ]).then(function(answer){
      chosenID = answer.itemID;
      quantity = res[parseInt(chosenID) - 1].stock_quantity;
      price = res[parseInt(chosenID) - 1].price;
      chosenAmount = parseInt(answer.quantity);
      if (chosenAmount <= quantity) {
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: quantity - chosenAmount
          },
          {
            item_id: chosenID
          }
        ]
      )
      total = (chosenAmount * price).toFixed(2); 
      console.log("You order has been placed! \nYour Total is: " + total);
      ask(); 
      } else {
        console.log("Insufficient Quantity \n Please make another order");
        purchase(); 
      }
    })
  })
}



