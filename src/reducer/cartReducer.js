const { CART_ADD_SUCCESS, CART_REMOVE_ITEM, CART_SAVE_ADDRESS } = require("../constants/cartConstants");


function cartReducer(state = {cartItems: []}, action) {

    switch (action.type) {
            
        case CART_ADD_SUCCESS:
            
            const item = action.payload;

            // verificar se o item já está no carrinho
            const product = state.cartItems.find( carrinho => carrinho.product === item.product)

            if(product) {
                // se o item já estiver no carrinho vai substituir pelo antigo (caso tenha mudado a qtd)
                return { loading: false,
                    cartItems: state.cartItems.map( carrinho => carrinho.product === product.product ? item : carrinho)
                }
            }
            // se o produto nao existir adicionar no carrinho
            return {cartItems: [...state.cartItems, item]}

        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter( carrinho => carrinho.product !== action.payload)}
        
        case CART_SAVE_ADDRESS:
            return {...state, addressInfo: action.payload}
        default:
            return state
    }
}



export {cartReducer}