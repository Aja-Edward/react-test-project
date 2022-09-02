import styled from 'styled-components'
import { COLORS, pagePadding } from '../assets/definitions'

export const HeaderContainer = styled.header`
    width: 100%;
    height: 80px;
    background-color: ${COLORS.backgroundColor};
    display: flex;
    justify-content: space-between;
   
    padding: 0 ${pagePadding};
        .logo{
        display: flex;
        align-items: center;
        cursor: pointer;
       .arrow{
       margin-left: -1.7rem;
       
       }
       .arrow-point{
        margin-top: -1.2rem;
               margin-left: -0.3rem;
       }
    }
   
    ul{
        display: flex;
        list-style: none;

        &.left-nav li{
            text-transform: uppercase;
        }
        li{
            margin: 0 5px;
            padding: 0 10px;
            color: ${COLORS.textColor};
            cursor: pointer;
            display: flex;
            align-items: center;
            a{
                text-decoration: none;
                color: ${COLORS.textColor};
            }
        }
        &.left-nav li:hover{
            color: ${COLORS.buttonColor};
            border-bottom: 2px solid ${COLORS.buttonColor};
           
        }
    }
    .right-nav-list > div{
        height: 30px;
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly; 
        position: relative;

       .currency-pane{
        position: absolute;
        top: 27px;
        left: 2px;
        box-shadow: 0 0 2px 0 ${COLORS.backgroundOverLayLight};
        padding: 7px 0;
        width: 80px;
        border-radius: 3px;
        z-index: 5;
        background-color: ${COLORS.backgroundColor};
        p{
            padding: 5px 0;
            text-align: center;
            &:active, &:hover{
                background-color: ${COLORS.hoverBackground};
            }
        }
       }
    }

    .cart{
        position: relative;
         .cart-qty{
            border-radius: 50%;
            background-color: black;
            color: white;
            width: 15px;
            height: 15px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 30%;
            right: 0;
        }
        
    }
    .cart-pane{
        box-shadow: 0 0 2px 0 ${COLORS.backgroundOverLayLight};
        background-color: ${COLORS.backgroundColor};
        height: fit-content;
        z-index: 5;
        border-radius: 3px;
        padding: 15px;
       
        
        .cart-item{
            display: flex;
            .item-attributes{
                display: flex;
                .item-num{
                    display: flex;
                    flex-direction: column;
                }
            }
            .item-image{
                width: 100px;
                img{
                    width: 100%;
                }
                
            }
            
        }

        .attributess{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows:  40px;
            width:  50%;
        }
         li {
            list-style-type: none;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid gray;
            color: ${COLORS.textColor};
            cursor: pointer;        }
        
        h2{
            grid-column: span 6;
        }
        .cart-btn{
            display: flex;
            justify-content: center;
            width:   100%;
               a{
                text-align: center;
                text-decoration: none;
                color: ${COLORS.textColor};
                padding: 10px 0;
                 
                .vew-bag{
                    width:   100%;
                    margin-right: 15px;
                    padding: 10px 40px;
                    backgrounColor: transparent;
                    border: 2px solid ${COLORS.backgroundOverLayLight};
                    box-sizing: border-box;
                }
                .checkout{
                  
                    margin-left: 15px;
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