# bamazon

video link for bamazon Customer - https://drive.google.com/file/d/1tIcqDYB_4PRfG6d7S9JCVbAM7tef0KNl/view
video link for bamazon Manager - https://drive.google.com/file/d/1FCvIWCqjOxZ1hoywhWnhEs_I1_VDDjlA/view

This program focuses on two different user bases.

1. Customer: 
    - The bamazonCustomer program allows the user to first see a table, on the command line, which shows items that are currently for sale. 
    This includes: ID, Product's name, Department's name, the Price, and finally the quantity available. 

    - The program then prompts the user to choose an item based on the item ID, followed by the quantity desired. 

    - Program then show's you the total amount of your purchase order and asks if the user would like to make another purchase. If so, the user will be shown an updated table with the previously ordered items changed in stock. 

    - Finally, if the user's imput tells the program that they would not like the continue, the program will output a thank you message and end the program. 
 
2. Manager: 
    -  The bamazonManager program allows the user to first choose between 4 options [View prodcuts for sale, View low inventory, Add to existing inventory, and Add new products].

    - View Products: 
        - allows the manager to see the current table of products with their associated ID, Name, Department, Price and Quantity.
    - View low inventory: 
        - will populate a table to the manager with items that currently have a stock quantity of less than 5.
    - Add to existing inventory: 
        - will allow the manager to "restock" (update) the stock quantity of any products. The program will also then repopulate the table with the updated stock quantity. 
    - Add new products: 
        - allows the manager to add to the database a brand new product as long as, all the necessary params have been inputted. 

    - Finally, a prompt function was used to allow the manager to continue to choose different actions or completely exit the program. 


3. Technologies used: Node, MySQL, express, cli(table), & inquirer 


