import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { CartContainer } from '../styles/CartStyles';
import ClickOutside from './ClickOutside';
import { setCurrency } from '../redux/actions/categoryActions';
import { findCurrency, detectAttributes, COLORS } from '../assets/definitions';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: false, qty: this.props.totalCartQty || 0 }
  }


  handleClick = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  handleCurrencyChange = (currency) => {
    this.props.setCurrency(currency)
  }

  productCurrency = (item) => {
    const price = item?.product?.prices
    if (!price) return
    const currency = findCurrency(price, this.props.currency)
    return currency
  }


  // componentDidMount() {
  //   const { data, id } = this.props.params || {}
  //   this.props.fetchCategory(data, id)
  // }

  render() {
    return (
      <CartContainer>
        <h3 className='cart-page-title'>CART</h3>

        {
          true ?
            <ClickOutside className='cart-page'>

              <>
                {

                  this.props.cart?.map((item, index) => <div key={index} className='cart-item'>
                    <div className='item-attributes'>
                      <div className='item-details'>
                        <div className='horizontal-line'><hr /></div>
                        <h5>{item.product.name}</h5>
                        <span className='cart-item-price'>{this.productCurrency(item)?.currency?.symbol}{this.productCurrency(item)?.amount}</span>
                        <div>
                          {item.product.attributes?.length ?
                            item.product.attributes?.map((attributes, index) => {
                              const attributeType = detectAttributes(attributes.items)
                              return <div className='attributess' key={index}>
                                <h2>{attributeType}:</h2>
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

                      </div>
                    </div>
                    <div className='cart-image'>

                      <div className='item-num'>
                        <button onClick={() => { }}>+</button>
                        <span>{this.state.qty}</span>
                        <button>-</button>
                      </div>

                      <div className='item-image'>
                        <img src={item.product.gallery[0]} alt={item.product.name} />
                      </div>

                    </div>
                  </div>

                  )
                }
                <div className='task-qty-total'>
                  <span>Tax:</span>
                  <span>Quantity:</span>
                  <span>Total:</span>
                </div>

                <div className='cart-btn'>
                  <Link to="/cart">
                    <button className='checkout'> ORDER</button>
                  </Link>

                </div>
              </>
            </ClickOutside>
            :
            null
        }

      </CartContainer>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.categoryItems.currency,
  cart: state.categoryItems.cart,
  totalCartQty: state.categoryItems.totalCartQty,
  totalCartAmount: state.categoryItems.totalCartAmount
})

export default connect(mapStateToProps, { setCurrency })(CartPage)