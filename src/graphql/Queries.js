import {gql} from '@apollo/client'

export const getCategories = gql`
{
    categories{
        name,
        products{
          prices{
            currency{
              label
              symbol
            },
            amount
          },
          category,
          description,
          gallery,
          attributes{
            id,
            items{
              displayValue,
              value
              id
            }
            type
          },
          inStock,
          brand,
          id
        }
      }
}
`



export const getProduct = gql`
    query($id: String!){
        product(id: $id){
            id
            name
            brand
            inStock
            category
            gallery
            description
            attributes{
              items{
                displayValue
                id
                value
              }
            }
            prices{
              amount
              currency{
                label
                symbol
              }
            }
            brand
        }
    }
`;