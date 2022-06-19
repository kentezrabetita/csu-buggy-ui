import ItemDetailLayout from '../../components/item-details';
import axios from 'axios';

const Item = ({ item }) => {
  return <ItemDetailLayout id={item.id} />;
};

export default Item;

export async function getServerSideProps({ params }) {
  const result = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${params.itemId}`
  );
  return {
    props: {
      item: JSON.parse(JSON.stringify(result.data)),
    },
  };
}

export async function getServerSidePaths() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );
  const items = response.data;
  return {
    paths: items.map((item) => {
      return {
        params: {
          itemId: item.id.toString(),
        },
      };
    }),
    fallback: false,
  };
}
