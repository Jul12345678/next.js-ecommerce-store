import Cookies from 'js-cookie';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key);
  if (!cookieValue) {
    return undefined;
  }
  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}
export type CartProduct = {
  name: string;
  id: number;
  items: number;
};

export type Cart = CartProduct[];

export function setParsedCookie(key: string, value: Cart) {
  Cookies.set(key, JSON.stringify(value));
}
