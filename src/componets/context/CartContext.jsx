import { doc , updateDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react'
import { db } from '../../config/firebaseConfig';

export const  CartContext = createContext(null);

export const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const addProductCart = (product, quantity) => {
        const index = cart.findIndex((item) => item.id === product.id);
        if (index == -1) {
            const newProduct = {
                ...product,
                quantity,
                subTotal: product.price * quantity,
                img: product.img
            };
            setCart([...cart, newProduct]);
            } else {
            const cartCopy = [...cart];
            cartCopy[index].quantity += quantity;
            if( cartCopy[index].quantity > cartCopy[index].stock){
                cartCopy[index].quantity = cartCopy[index].stock;
            }
            cartCopy[index].subTotal = cartCopy[index].price * cartCopy[index].quantity;
            setCart(cartCopy);
            }
        };

        const handleTotal = () => { 
            const totalItems = cart.reduce( (acum, item) => acum + item.subTotal, 0);
            setTotal(totalItems);
        };
        const handleTotalProducts = () => { 
            const items = cart.reduce((acum, item) => acum + item.quantity, 0);
            setTotalProducts(items);
        };
        const removeProduct  = (id) => { 
            const productFilter = cart.filter(product => product.id !== id);
            setCart(productFilter);
        };
        const discountStock = async (cart) => {
            const updatePromises = cart.map(async (product) => {
            const productRef = doc(db, "products", product.id);
            const newStock = product.stock - product.quantity;
            await updateDoc(productRef, { stock: newStock });
            });
            await Promise.all(updatePromises);
        };
        const clearCart = () => {
            setCart([]);
        };
        useEffect(() => {
            handleTotal()
            handleTotalProducts()
        }, [cart])
            
    const objectValue  = {
        cart,
        total,
        totalProducts,
        addProductCart,
        removeProduct,
        discountStock,
        clearCart,
    }

    return <CartContext.Provider value={objectValue}> { children } </CartContext.Provider>;
};
