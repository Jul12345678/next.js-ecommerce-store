-- Node js

-- Create products table
CREATE TABLE products (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 name varchar (40) NOT NULL,
 type varchar (50) NOT NULL,
 price integer NOT NULL
 );
-- insert a product (C in CRUD = Creaqte)
  INSERT INTO products
 (name, type, price)
 VALUES
 ('You Can Be Anything', 'Educational Book', 10),
  ('Drinkable Sausage', 'Refreshment', 10),
  ('Gush and Flush', 'Medicine', 10),
  ('Midnight Pincer', 'Perfume', 10),
  ('Modern Dentistry', 'Health Magazine', 10),
  ('Rocky Road', 'Dessert', 10),
  ('Long Tan and Handsome', 'Lifestyle Magazine', 10),
  ('Canned Bread', 'Energizer', 10),
  ('Fancy Living Digest', 'Magazine', 10);

-- read products (R in CRUD = Read)
 SELECT * FROM products;