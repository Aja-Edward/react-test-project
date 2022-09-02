import React, { Component } from 'react'
import { CategoryContainer } from '../styles/CategoryStyles'
import { useQuery } from '@apollo/client';
import { getCategories } from '../graphql/Queries';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategory } from '../redux/actions/categoryActions'
import { findCurrency } from '../assets/definitions'

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const { data, id } = this.props.params || {}
    this.props.fetchCategory(data, id)
  }

  componentDidUpdate(previousProps, previousState) {
    const { data, id } = this.props.params || {}
    if (previousProps.items === this.props.items) {
      this.props.fetchCategory(data, id)
    }

  }
  capitalizeFirstWord = (word) => {
    const firstLetter = word.slice(0, 1)
    const otherLetters = word.slice(1, word.length)
    return `${firstLetter.toUpperCase()}${otherLetters}`
  }


  render() {
    const { items, params: { loading, data, id, } } = this.props
    console.log({ items })
    return (
      <CategoryContainer>
        <h2>Category: {id ? this.capitalizeFirstWord(id) : 'All'} </h2>
        <main>
          {
            loading || this.props.isLoading ? <div>Please wait...</div>
              :
              items?.map(
                product => {
                  const productCurrency = findCurrency(product.prices, this.props.currency)
                  return (
                    <Link to={`/product/${product.id}`} key={product.id} className='product'>
                      <img src={product.gallery[0]}
                        alt={product.brand}
                      />
                      <p className='product-name'>{product.id.replaceAll("-", ' ')}</p>
                      <p className='product-price'>

                        {productCurrency?.currency.symbol}{productCurrency.amount}
                      </p>
                    </Link>
                  )
                }

              )

          }
        </main>
      </CategoryContainer>
    )
  }
}
const WithQuery = (Child) => {
  return function WithQuery(props) {
    const queryParams = useQuery(getCategories)
    const otherParams = useParams()
    const params = { ...queryParams, ...otherParams }
    return <Child {...props} params={params} />;
  }
}
const mapStateToProps = state => ({
  items: state.categoryItems.items,
  isLoading: state.categoryItems.isLoading,
  currency: state.categoryItems.currency,
  cart: state.categoryItems.cart
})

export default connect(mapStateToProps, { fetchCategory })(WithQuery(CategoryPage))

// categoryItemsReducers
// export default connect(mapStateToProps, { setLoading, fetchMovie })(WithRouter(Movie))
