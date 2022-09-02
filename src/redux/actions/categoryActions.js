import { CATEGORY, CATEGORY_LOADING, CURRENCY, ADD_TO_CART } from "../constants"

export const fetchCategory = (data, id = 'all') => dispatch => {
    if(!data) {
        return dispatch({
            type: CATEGORY_LOADING,
        })
    }
    let selectedData = data?.categories?.find(d => {
          return d.name === id
    })
  
    dispatch({
        type: CATEGORY,
        payload: selectedData?.products || data[0]?.products
    })
}

export const setCurrency = (currency) => dispatch => {
    dispatch({
        type: CURRENCY,
        payload: currency
    })
}

export const addToCart = (product) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: product
    })
}