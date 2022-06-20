import { gql } from '@apollo/client';

const DELETE_ITEM = gql`
  mutation DeleteItem($deleteItemId: ID!) {
    deleteItem(id: $deleteItemId) {
      id
      item_name
      item_description
      item_status
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem(
    $itemName: String!
    $itemStatus: String!
    $itemDescription: String!
  ) {
    addItem(
      item_name: $itemName
      item_status: $itemStatus
      item_description: $itemDescription
    ) {
      item_description
      item_name
      item_status
    }
  }
`;

const EDIT_ITEM = gql`
  mutation EditItem(
    $editItemId: ID!
    $itemName: String!
    $itemDescription: String!
    $itemStatus: String!
  ) {
    editItem(
      id: $editItemId
      item_name: $itemName
      item_description: $itemDescription
      item_status: $itemStatus
    ) {
      id
      item_name
      item_description
      item_status
    }
  }
`;

export { DELETE_ITEM, ADD_ITEM, EDIT_ITEM };
