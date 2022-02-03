// [fileName] = kind of like a variable / description of information after slash in URL

export default function SingleProduct(props) {
  return `single product route (dynamic route), id: ${props.productId}`;
}

export function getServerSideProps(context) {
  const productId = context.query.productId;

  return {
    props: {
      productId: productId,
    },
  };
}
