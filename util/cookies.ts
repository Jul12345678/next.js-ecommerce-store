import Cookies from 'js-cookie';

export function getParsedCookie(key: string | undefined) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}
export type CartProduct = {
  name: string;
  id: number;
};

export type ShoppingCart = CartProduct[];

export function setParsedCookie(key: string, value: ShoppingCart) {
  Cookies.set(key, JSON.stringify(value));
}
