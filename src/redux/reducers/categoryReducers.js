import { CATEGORY, CATEGORY_LOADING, CURRENCY, ADD_TO_CART } from "../constants";
import {findCurrency} from '../../assets/definitions'

const initialState = {
    items: [],
    currency: {
        symbol: '$',
        label: 'USD'
    },
    cart:[],
    totalCartQty: 0,
    totalCartAmount: 0,
}

export const categoryItemsReducers = (state = initialState, action) => {
    switch(action.type){
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORY:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        case CURRENCY:
            let cartArr = [...state.cart]
            let totalCartQtyCurr = 0;
            let totalCartAmountCurr = 0;

            cartArr.forEach(item => {
                totalCartQtyCurr += item.qty
                const requiredPrice = findCurrency(item.product.prices, action.payload)
                totalCartAmountCurr += item.qty * requiredPrice.amount       
            })
            return {
                ...state,
                currency: action.payload,
                totalCartAmount: totalCartAmountCurr,
                totalCartQty: totalCartQtyCurr
            }
        case ADD_TO_CART:
            let totalCartQty = 0;
            let totalCartAmount = 0;
            let cart = [...state.cart]
            const itemExists = cart.find(item => item.product.id === action.payload.id)
            
            if(itemExists){
                 cart = state.cart.map(item => {
                    if(item.product.id === action.payload.id){
                        return {
                            ...item,
                            qty: item.qty + 1
                        }
                    }
                    return item
                })
               
                cart.forEach(item => {
                    totalCartQty += item.qty
                    const requiredPrice = findCurrency(item.product.prices, state.currency)
                    totalCartAmount += item.qty * requiredPrice.amount    
                })
            }else{
                cart = [...state.cart, {product: action.payload, qty: 1}]

                cart.forEach(item => {
                    totalCartQty += item.qty
                    const requiredPrice = findCurrency(item.product.prices, state.currency)
                    totalCartAmount += item.qty * requiredPrice.amount      
                })
            }

            
            
            return {
                ...state,
                cart,
                totalCartAmount,
                totalCartQty
            }   
        
        default:
            return state
            
    }
}