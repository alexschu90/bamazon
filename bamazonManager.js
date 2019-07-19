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
  options(); 
});


function options () {
    inquirer.prompt(
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View products for sale", "View low inventory", "Add to existing inventory", "Add new product"]
        }
    ).then(function(answer) {
     
       if (answer.options === "View products for sale") {
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                var table = new Table({
                    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity' ],
                    colWidths: [10,18,20,15,18]
                });
            
            for (let i = 0; i < res.length; i++) {
                var values = Object.values(res[i]);
                table.push(
                    [values[0], values[1], values[2], values[3], values[4]]
                    )
                }
                console.log(table.toString());
            })
        } else if (answer.options === "View low inventory") {
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                var table = new Table({
                    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity' ],
                    colWidths: [10,18,20,15,18]
                });
            for (let i = 0; i < res.length; i++) {
                var values = Object.values(res[i]);
                if (values[4] < 5) {
                    table.push(
                        [values[0], values[1], values[2], values[3], values[4]]
                        )
                    }
                }
                console.log(table.toString());
            })
        } else if (answer.options === "Add to existing inventory") {
            connection.query("SELECT * FROM products", function(err,res) {
            if (err) throw err; 
            inquirer.prompt(
            [
                {
                    type: "input", 
                    name: "itemID",
                    message: "Please select the item to add",  
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to add?"
                }
            ]
            ).then(function(answer){
                console.log(answer)
                chosenID = answer.itemID;
                quantity = res[parseInt(chosenID)-1].stock_quantity;
                chosenAmount = parseInt(answer.quantity);
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: quantity + chosenAmount
                        },
                        {
                            item_id: chosenID
                        }
                    ]
                )
                console.log("successfully updated!")
                connection.query("SELECT * FROM products", function(err,res){
                    if (err) throw err; 
                    var table = new Table({
                        head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity' ],
                        colWidths: [10,18,20,15,18]
                    });
                    for (let i = 0; i < res.length; i++) {
                        var values = Object.values(res[i]);
                        table.push(
                            [values[0], values[1], values[2], values[3], values[4]]
                            )
                        }
                    console.log(table.toString());
                    })
                }) 
            })   
        } else {
            console.log(answer);
            inquirer.prompt(
                [
                    {
                        type: "input",
                        name: "product", 
                        message: "What is the product's name?" 
                    },
                    {
                        type: "input",
                        name: "department", 
                        message: "What department is the product?" 
                    },
                    {
                        type: "input",
                        name: "price", 
                        message: "What is the price per unit?" 
                    },
                    {
                        type: "input",
                        name: "stock", 
                        message: "What is the current stock?" 
                    }
                ]
            ). then(function(answer) {
                connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: answer.product,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.stock
                    }
                )
                console.log("New Product Added!");
                connection.query("SELECT * FROM products", function(err,res){
                    if (err) throw err; 
                    var table = new Table({
                        head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity' ],
                        colWidths: [10,18,20,15,18]
                    });
                    for (let i = 0; i < res.length; i++) {
                        var values = Object.values(res[i]);
                        table.push(
                            [values[0], values[1], values[2], values[3], values[4]]
                            )
                        }
                    console.log(table.toString());
                    })
            })

        }
    })
}

