import React, { Component } from 'react'
import { HeaderContainer } from '../styles/HeaderStyles'
import LogoIcon from '../assets/svgs/13'
import Logos from '../assets/svgs/12'
import Icon11 from '../assets/svgs/11'
import Icon3 from '../assets/svgs/3'
import Icon14 from '../assets/svgs/14'
import Icon1 from '../assets/svgs/1'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ClickOutside from './ClickOutside'
import { setCurrency } from '../redux/actions/categoryActions'
import { findCurrency, detectAttributes, COLORS } from '../assets/definitions'

class Header extends Component {
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


  render() {
    console.log(this.props.cart, this.props.totalCartQty, this.props)
    return (
      <HeaderContainer>
        <ul className='left-nav'>
          <li>
            <Link to="/all">
              all
            </Link>
          </li>
          <li>
            <Link to="/clothes">
              clothes
            </Link>
          </li>
          <li>
            <Link to="/tech">
              tech
            </Link>
          </li>
        </ul>
        <div className='logo'>
          <LogoIcon />
          <Logos className='arrow' />
          <div className='arrow-point'> <Icon14 /></div>
        </div>
        <ul className='right-nav'>
          <li className='right-nav-list'>{this.props.currency.symbol}
            <div>
              {
                this.state.showDropdown ?
                  <span onClick={this.handleClick}><Icon3 className='dropdown-show' /></span> :
                  <span onClick={this.handleClick}><Icon1 className='dropdown-hide' /></span>
              }

              {this.state.showDropdown &&
                <ClickOutside className='currency-pane' handleClick={this.handleClick} >
                  <>
                    <p onClick={() => this.handleCurrencyChange({ symbol: '$', label: 'USD' })}>$ USD</p>
                    {/* <p onClick={() => this.handleCurrencyChange({symbol: '€', label: 'EUR'})}>€ EUR</p> */}
                    <p onClick={() => this.handleCurrencyChange({ symbol: '¥', label: 'JPY' })}>¥ JPY</p>
                    <p onClick={() => this.handleCurrencyChange({ symbol: '£', label: 'GBP' })}>£ GBP</p>
                    <p onClick={() => this.handleCurrencyChange({ symbol: 'A$', label: 'AUD' })}>A$ AUD</p>
                    <p onClick={() => this.handleCurrencyChange({ symbol: '₽', label: 'RUB' })}>₽ RUB</p>
                  </>
                </ClickOutside>
              }
            </div>
          </li>

          <li className='cart'><Icon11 handleClick={this.handleClick} />
            {
              this.props.totalCartQty ?
                <div className='cart-qty'>
                  {this.props.totalCartQty}
                </div>
                : null
            }
          </li>
          {
            true ?
              <ClickOutside className='cart-pane'>
                <h3>My Bag: {this.props.totalCartQty} items</h3>

                <>
                  {
                    this.props.cart?.map((item, index) => <div key={index} className='cart-item'>
                      <div className='item-attributes'>
                        <div className='item-details'>
                          <hr />
                          <h5>{item.product.name}</h5>
                          <span>{this.productCurrency(item)?.currency?.symbol}{this.productCurrency(item)?.amount}</span>
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

                        <div className='item-num'>
                          <button onClick={() => { }}>+</button>
                          <span>{this.state.qty}</span>
                          <button>-</button>
                        </div>
                      </div>
                      <div className='item-image'>
                        <img src={item.product.gallery[0]} alt={item.product.name} />
                      </div>

                    </div>

                    )
                  }
                  <span>Total:</span>
                  <br />
                  <div className='cart-btn'>

                    <Link to="/cart">
                      <button className='vew-bag'> VIEW BAG</button>
                    </Link>

                    <Link to="/checkout">
                      <button className='checkout' > CHECK OUT</button>
                    </Link>

                  </div>
                </>
              </ClickOutside>
              :
              null
          }
        </ul>

      </HeaderContainer>
    )
  }
}

const mapStateToProps = state => ({
  currency: state.categoryItems.currency,
  cart: state.categoryItems.cart,
  totalCartQty: state.categoryItems.totalCartQty,
  totalCartAmount: state.categoryItems.totalCartAmount
})

export default connect(mapStateToProps, { setCurrency })(Header);
