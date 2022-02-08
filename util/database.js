import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';

const productsDataBase = [
  {
    id: '1',
    name: 'You Can Be Anything',
    type: 'Educational Book',

    image: '/spongebob/1.png',
    width: '550',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    id: '2',
    name: 'Drinkable Sausage',
    type: 'Refreshment',

    image: '/spongebob/2.png',
    width: '500',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    id: '3',
    name: 'Gush and Flush',
    type: 'Medicine',
    image: '/spongebob/3.png',
    width: '550',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    id: '4',
    name: 'Midnight Pincer',
    type: 'Perfume',

    image: '/spongebob/4.png',
    width: '400',
    height: '400',
    imageType: '.png',
    price: '10',
  },
  {
    id: '5',
    name: 'Modern Dentistry',
    type: 'Health Magazine',

    image: '/spongebob/5.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10/Month',
  },
  {
    id: '6',
    name: 'Rocky Road',
    type: 'Dessert',

    image: '/spongebob/6.png',
    width: '500',
    height: '300',
    imageType: '.png',
    price: '10',
  },
  {
    id: '7',
    name: 'Long Tan and Handsome',
    type: 'Lifestyle Magazine',

    image: '/spongebob/7.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10/Month',
  },

  {
    id: '8',
    name: 'Canned Bread',
    type: 'Energizer',

    image: '/spongebob/8.jpg',
    width: '550',
    height: '400',
    imageType: '.jpg',
    price: '10',
  },
  {
    id: '9',
    name: 'Fancy Living Digest',
    type: 'Magazine',

    image: '/spongebob/9.png',
    width: '550',
    height: '400',
    imageType: '.png',
    price: '10/Month',
  },
];

export default productsDataBase;
