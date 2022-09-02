export const COLORS = {
    backgroundOverlay: '#393748',
    backgroundColor: '#ffffff',
    buttonColor: "#5ECE7B",
    textColor: '#1D1F22',
    backgroundOverLayLight: '#393748AA',
    hoverBackground: '#EEE'
}

export const pagePadding = '3rem'

export const attributes = {
    "extra small": 'XS',
    "small": "S",
    "medium": 'M',
    "large": 'L',
    "extra large": 'XL'
}

const attributeColors = ['#44FF03', '#03FFF7', '#030BFF', '#000000', '#FFFFFF']
const capacity = ['512G', 'IT', '256GB', '512GB']

export const detectAttributes = (attributes) => {
   for(let attribute of attributes){
        if(attributeColors.includes(attribute.value)){
            return "Color"
        }else if(capacity.includes(attribute.value)){
            return "Capacity"
        }else{
            return "Size"
        }
    }
}

export const findCurrency = (prices, currency) => {
    const currencyLabel = currency.label
    const price = prices.find(_price => _price.currency.label === currencyLabel)
    return price
  }

 export const handleCartItems = (cart) => {
    let totalQty = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        totalQty += item.qty
    })

}