var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require("cli-table2");

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
    var table = new Table({
      head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
      colWidths: [10,18,20,15,18]
    });

for (let i = 0; i < res.length; i++) {
  var values = Object.values(res[i]);
    table.push(
      [values[0], values[1], values[2], values[3], values[4]]
      )
  }


    console.log(table.toString());
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
      sales = res[parseInt(chosenID)- 1].product_sales;
      salesTotal = parseInt(sales);
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
      total = parseInt((chosenAmount * price).toFixed(2)); 
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            product_sales: salesTotal + total
          },
          {
            item_id: chosenID
          }
        ]
      )
      console.log("You order has been placed! \nYour Total is: " + total);
      ask(); 
      } else {
        console.log("Insufficient Quantity \n Please make another order");
        purchase(); 
      }
    })
  })
}



