// Simplified CartItem component for build compatibility

const CartItem: React.FC<any> = ({ item }) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded">
      <div>
        <h3>{item?.title || 'Product'}</h3>
        <p>Simple cart item placeholder</p>
      </div>
    </div>
  );
};

export default CartItem;