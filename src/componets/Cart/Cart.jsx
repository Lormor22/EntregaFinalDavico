import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { TrashWidget } from "../TrashWidget/TrashWidget";
import "./Cart.css"
import { Button } from "../Button/Button";


export const Cart = () => {
    const { cart, total, discountStock , clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        codigoPostal: "",
        email: "",
        numeroTarjeta: "",
        cvv: "",
        });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const finCompra = ()=>{
        discountStock(cart, formData);
        clearCart();
        Toastify({
            text: "¡Gracias por su compra! se envió un mail con el recibo",
            duration: 3000,
            gravity:"buttom",
            style:{
            fontSize:"15px",
            fontFamily:"Verdana",
            color:"white",
            background: "black",
            position: "absolute",
            right: "6%",
            zIndex: 1000,
            }
        }).showToast();
    }
    return (
        <>
        <div>
            <div className="container d-flex flex-sm-wrap justify-content-center  ">
            {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between w-75 border border-3 p-3">
                    <div>
                        <h2>Nombre: {item.name} </h2>
                        <h3>Precio Unitario: {item.price} </h3>
                        <h4>Cantidad: {item.quantity} </h4>
                        <h5>Subtotal: {item.subTotal} </h5>
                    </div>
                    <div className="d-flex align-items-start justify-content-end">
                        <img src={item.img} alt={item.name} className="img_libro" />
                        <button className="boton_transparente" onClick={()=> removeProduct(item.id)}><TrashWidget/></button>
                    </div>
                </div>
            ))}
            </div>
            <div className="d-flex justify-content-center">
                <div className=" d-inline-flex flex-column m-5 ">
                    <h1>Total: $ {total}</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className=" d-inline-flex flex-column m-5 ">
                <h4>Ingresa tus datos para poder pagar</h4>
                <div>
                    <input type="text" name="nombre" placeholder="Nombre" className="w-50" onChange={handleInputChange} />
                    <input type="text" name="apellido" placeholder="Apellido" className="w-50" onChange={handleInputChange} />
                </div>
                <input type="text" name="telefono" placeholder="Telefono" onChange={handleInputChange} />
                <div>
                    <input type="text" name="direccion" placeholder="Direccion" className="w-75" onChange={handleInputChange} />
                    <input type="text" name="codigoPostal" placeholder="Codigo Postal" className="w-25" onChange={handleInputChange} />
                </div>
                <input type="text" name="email" placeholder="E-Mail" onChange={handleInputChange} />
                <div>
                    <input type="text" name="numeroTarjeta" placeholder="N° de tarjeta" className="w-75" onChange={handleInputChange} />
                    <input type="text" name="cvv" placeholder="CVV" className="w-25" onChange={handleInputChange} />
                </div>
                <Button variant="btn-success" text="Pagar" functionClick={()=> finCompra()} />
            </div>
            </div>
        </div>
        </>

    );
};
