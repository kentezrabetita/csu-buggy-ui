import { gql } from '@apollo/client';

const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      item_name
      item_description
      item_status
    }
  }
`;

export { GET_ITEMS };
