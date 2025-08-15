import { useCart } from "../contexts/CartContext";
// import CartItem from "./ui/CartItem";
import Link from "next/link";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const uniqueItemsIds = new Set();

  if (cart.items.length === 0) {return (<div className=" flex flex-col items-center justify-center text-center w-auto">
    <h1 className="text-3xl font-semibold">It seems like your cart it's empty, let's change that!</h1>
    <Link
          href="/shop"
          className="w-[50%]  mt-6 bg-main flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Shop
        </Link>
  </div>)}

  return (
    <div className="flex flex-col gap-6 mt-10 min-h-screen">
      {cart.items.map((item) => {
        if (!uniqueItemsIds.has(item.product.idProduct)) {
          uniqueItemsIds.add(item.product.idProduct);
          return (
            <ul key={item.product.idProduct} className="flex flex-col gap-6 px-4 lg:px-24">
              <div className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3>{item.product.nameProduct}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.idProduct)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
              <hr className="h-2" />
            </ul>
          );
        }
        return null;
      })}
      <div className="bg-secondary px-4 lg:px-24 mt-auto">
        <div className="my-6 mx-4 lg:mx-24 font-semibold">
          <div className="flex gap-4 justify-between">
            <h1>Subtotal</h1>
            <h1>${cart.totalAmount.toFixed(2)}</h1>
          </div>
          <div className="flex gap-4 justify-between">
            <h1>Shipping</h1>
            <h1>FREE</h1>
          </div>
        </div>

        <div className="flex gap-4 justify-between mx-4 lg:mx-24 mb-6 font-bold">
          <h1>Grand Total</h1>
          <h1>${cart.totalAmount.toFixed(2)}</h1>
        </div>
        <hr className="h-2" />
        <Link
          onClick={() => {
            uniqueItemsIds.forEach((id) => {
              removeFromCart(String(id));
            });
          }}
          href="/order-success"
          className="w-full  mt-6 bg-main flex items-center justify-center text-lg text-white px-10 py-3 gap-3 font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
