import styled from 'styled-components'
import { COLORS, pagePadding } from '../assets/definitions'
import { useQuery } from '@apollo/client';
import { getCategories } from '../graphql/Queries';
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategory } from '../redux/actions/categoryActions'
import { findCurrency } from '../assets/definitions'


export const CartContainer = styled.div`
padding: 0 ${pagePadding};

.cart-page{
    background-color: ${COLORS.backgroundColor};
    height: fit-content;
    z-index: 5;
    border-radius: 3px;
    padding: 20px 0 ;
    padding-right: 400px
   
    .cart-page-title{
        font-family: Raleway;
        font-size: 32px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
    }

    .cart-item{
        display: flex;
        padding-right: 400px;
        justify-content: space-between;

        .item-attributes{
            position: relative;
            display: flex;
            padding-bottom: 15px;

            .horizontal-line{
                position: absolute;
                width: 62vw;   
            } 
            h5{
                font-family: Raleway;
                font-size: 30px;
                font-weight: 600;
                line-height: 27px;
                letter-spacing: 0em;
                text-align: left;
                padding: 15px 0;

            }
            .cart-item-price{
                font-family: Raleway;
                font-size: 24px;
                font-weight: 700;
                line-height: 24px;
                letter-spacing: 0em;
                text-align: left;
               
            }
            
        }
        .cart-image{
            display: flex;
            padding: 15px 0;
            align-items: center;

            .item-num{
                display: flex;
                flex-direction: column;
                 height: 100%;
                justify-content: space-between;    
                width: 30px;
                text-align: center;
                margin-right: 15px;
                button{
                    padding: 5px;
                }

            }
            .item-image{
                width: 200px;
                img{
                    width: 100%;
                }
            }
           

        }
        
    }

    .attributess{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows:  40px;
        width:  50%;
        font-family: Roboto Condensed;
        font-size: 18px;
        font-weight: 700;
        
        letter-spacing: 0em;
        padding-top: 15px;
       
    }
     li {
        list-style-type: none;
        margin-bottom: 15px ;
        border: 1px solid gray;
        color: ${COLORS.textColor};
        cursor: pointer;  
        text-align: center;
        padding: 15px;
        margin-right: 10px;     
     }
    
    h2{
        grid-column: span 6;
    }
    .task-qty-total{
display: flex;
flex-direction: column;
    }
    .cart-btn{
        display: flex;
        justify-content: flex-start;
           a{
            padding-top: 10px;
            .checkout{ 
                padding: 10px 40px;
                background-color: ${COLORS.buttonColor};
                border: 2px solid ${COLORS.buttonColor};
                color: ${COLORS.backgroundColor};
                box-sizing: border-box;
            }
        }
    }
    
}


`



