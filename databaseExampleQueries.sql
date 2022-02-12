-- Node js
CREATE TABLE products (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 name varchar (40) NOT NULL,
 type varchar (50) NOT NULL,
 price integer NOT NULL,
 image varchar (70) NOT NULL
 );
-- insert a product (C in CRUD = Creaqte)
  INSERT INTO products
 (name, type, price, image)
 VALUES
 ('You Can Be Anything', 'Educational Book', 10, '/spongebob/1.png'),
  ('Drinkable Sausage', 'Refreshment', 10, '/spongebob/2.png'),
  ('Gush and Flush', 'Medicine', 10, '/spongebob/3.png'),
  ('Midnight Pincer', 'Perfume', 10, '/spongebob/4.png'),
  ('Modern Dentistry', 'Health Magazine', 10, '/spongebob/5.png'),
  ('Rocky Road', 'Dessert', 10, '/spongebob/6.png'),
  ('Long Tan and Handsome', 'Lifestyle Magazine', 10, '/spongebob/7.png'),
  ('Canned Bread', 'Energizer', 10, '/spongebob/8.png'),
  ('Fancy Living Digest', 'Magazine', 10, '/spongebob/9.png');


  INSERT INTO products (
    width integer NOT NULL,
    height integer NOT NULL
  )

  INSERT INTO products
  (width, height)
  VALUES
  ('550', '300'),

-- read products (R in CRUD = Read)
 SELECT * FROM products;