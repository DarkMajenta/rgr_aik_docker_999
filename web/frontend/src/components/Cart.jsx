function Cart({ cart, removeFromCart, createOrder }) {
  const totalPrice = cart.reduce((sum, item) => sum + 20.0 * item.quantity, 0); // Mock price

  return (
    <div className="border rounded-lg p-4 bg-white shadow mt-4">
      <h2 className="text-xl font-bold">Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span>{item.name} x {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={() => createOrder(cart, totalPrice)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;