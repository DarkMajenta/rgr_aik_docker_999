function DishCard({ dish, addToCart }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-lg font-semibold">{dish.name}</h3>
      <p className="text-gray-600">{dish.portion_size}</p>
      <p className="text-gray-600">{dish.preparation_time} min</p>
      <button
        onClick={() => addToCart(dish)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default DishCard;