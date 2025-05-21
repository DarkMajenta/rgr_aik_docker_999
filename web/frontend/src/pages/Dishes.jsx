import { useState } from 'react';
import DishList from '../components/DishList';
import OrderForm from '../components/OrderForm';

function Dishes() {
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleSelectDish = (dish) => {
    setSelectedDishes([...selectedDishes, dish]);
  };

  const clearSelectedDishes = () => {
    setSelectedDishes([]);
  };

  return (
    <div>
      <DishList onSelectDish={handleSelectDish} />
      <OrderForm selectedDishes={selectedDishes} clearSelectedDishes={clearSelectedDishes} />
    </div>
  );
}

export default Dishes;