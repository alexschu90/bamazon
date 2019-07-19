DROP DATABASE IF EXISTS bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products(
item_id int not null auto_increment,
product_name varchar(50) null,
department_name varchar(50) null, 
price decimal (10, 2) null, 
stock_quantity integer(10) null,
primary key (item_id)
);

select stock_quantity from products; 

insert into products (product_name, department_name, price, stock_quantity)
values ("t-shirts", "clothing", 5.99, 50);
insert into products (product_name, department_name, price, stock_quantity)
values ("ps4", "electronics", 299.99, 4);
insert into products (product_name, department_name, price, stock_quantity)
values ("laptop", "electronics", 900.00, 5);
insert into products (product_name, department_name, price, stock_quantity)
values ("jeans", "clothing", 9.99, 50);
insert into products (product_name, department_name, price, stock_quantity)
values ("hats", "clothing", 4.99, 50);
insert into products (product_name, department_name, price, stock_quantity)
values ("tv", "electronics", 1000.00, 3);
insert into products (product_name, department_name, price, stock_quantity)
values ("shoes", "clothing", 39.99, 50);
insert into products (product_name, department_name, price, stock_quantity)
values ("keyboards", "electronics", 55.99, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("monitors", "electronics", 79.99, 10);
insert into products (product_name, department_name, price, stock_quantity)
values ("bakcpacks", "clothing", 60.00, 10);

select * from products;