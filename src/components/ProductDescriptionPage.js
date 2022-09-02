import React, { Component } from 'react'
import { useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../graphql/Queries'
import { ProductContainer } from '../styles/ProductStyles'
import { attributes, detectAttributes, findCurrency } from '../assets/definitions'
import { addToCart } from '../redux/actions/categoryActions'

class ProductDescriptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), mainImage: this.props.params.data?.product?.gallery[0] };
  }

  productCurrency = () => {
    const price = this.props.params.data?.product?.prices
    if (!price) return
    const currency = findCurrency(this.props.params.data?.product?.prices, this.props.currency)
    return currency
  }


  render() {
    const { loading, data, type } = this.props.params
    console.log({ data })
    return (
      <ProductContainer>

        {
          loading ? <div>please wait...</div>
            :
            data?.product ?
              <div className='product-wrapper'>
                <div className='product-image-container'>

                  <div className='product-images-container'>
                    {data.product.gallery.map((gallery, index) => (
                      <img key={index} className='image'
                        onClick={() => this.setState({ mainImage: gallery })}
                        src={gallery} alt='bestgallery' />
                    ))}
                  </div>
                  <img className='image-zoom' src={
                    this.state.mainImage || this.props.params.data?.product?.gallery[0]} alt="" />
                </div>

                <div className='product-attributes'>
                  <h3>{data?.product.name}</h3>
                  <p>Brand: {data?.product.brand}</p>
                  <p>Category: {data?.product.category}</p>
                  <p>Instock: {data?.product?.category.inStock}</p>

                  <div >
                    {data?.product?.attributes?.length ?
                      data?.product?.attributes?.map((attributes, index) => {
                        const attributeType = detectAttributes(attributes.items)
                        return <div className='item-attributes' key={index}>
                          <h2>{attributeType}: </h2>

                          {

                            attributes.items.map((item, index) => <div key={index}>

                              <ul>
                                <li style={{ backgroundColor: attributeType === 'Color' && item.value }}>
                                  {attributeType !== 'Color' && item.value}
                                </li>
                              </ul>

                            </div>
                            )
                          }
                        </div>
                      }

                      ) :
                      null
                    }
                  </div>
                  <div>

                  </div>
                  <p className='product-price'>
                    PRICE:
                    <span>
                      {this.productCurrency()?.currency?.symbol}{this.productCurrency()?.amount}
                    </span>
                  </p>
                  <button onClick={() => this.props.addToCart(data.product)}>ADD TO CART</button>
                  <div className='discription' dangerouslySetInnerHTML={{ __html: data?.product.description }}>
                    {/* {data?.product.description.replaceAll(/<\/?[^>]+(>|$)/g, '')} */}
                    {/* {data?.product.description} */}
                  </div>

                </div>
              </div>
              : null
        }

      </ProductContainer>

    )
  }
}

const mapStateToProps = state => ({
  items: state.categoryItems.items,
  isLoading: state.categoryItems.isLoading,
  currency: state.categoryItems.currency,
  cart: state.categoryItems.cart
})

export const WithQuery = (Child) => {
  return function WithQuery(props) {
    const reactRouterParams = useParams()

    const params = useQuery(getProduct, { variables: { id: reactRouterParams.productId } })
    const allParams = { ...params, ...reactRouterParams }
    return <Child {...props} params={allParams} />;
  }
}


export default connect(mapStateToProps, { addToCart })(WithQuery(ProductDescriptionPage))
