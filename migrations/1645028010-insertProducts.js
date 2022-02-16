const productsDataBase = [
  {
    name: 'You Can Be Anything',
    type: 'Educational Book',
    image: '/spongebob/1.png',
    width: '550',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Drinkable Sausage',
    type: 'Refreshment',
    image: '/spongebob/2.png',
    width: '500',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Gush and Flush',
    type: 'Medicine',
    image: '/spongebob/3.png',
    width: '550',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Midnight Pincer',
    type: 'Perfume',
    image: '/spongebob/4.png',
    width: '400',
    height: '400',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Modern Dentistry',
    type: 'Health Magazine',
    image: '/spongebob/5.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Rocky Road',
    type: 'Dessert',
    image: '/spongebob/6.png',
    width: '500',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    name: 'Long Tan and Handsome',
    type: 'Lifestyle Magazine',
    image: '/spongebob/7.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10',
  },

  {
    name: 'Canned Bread',
    type: 'Energizer',
    image: '/spongebob/8.jpg',
    width: '550',
    height: '400',
    imageType: '.jpg',
    price: '10',
  },
  {
    name: 'Fancy Living Digest',
    type: 'Magazine',
    image: '/spongebob/9.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10',
  },
];
exports.up = async (sql) => {
  await sql`
	INSERT INTO products ${sql(productsDataBase, 'name', 'type', 'image', 'price')}
	`;
};

exports.down = async (sql) => {
  for (const product of productsDataBase) {
    await sql`
			DELETE FROM
				products
			WHERE
				name = ${product.name} AND
				type = ${product.type} AND
				image = ${product.image} AND
				price = ${product.price}
		`;
  }
};
