import Cookies from 'js-cookie';

export function getParsedCookie(key: string | undefined) {
  const cookieValue = Cookies.get(key);
  if (!cookieValue) {
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
