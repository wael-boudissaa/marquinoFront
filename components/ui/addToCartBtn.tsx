// Simplified AddToCartBtn component for build compatibility

function AddToCartBtn({
  minimized = false,
  product,
}: {
  minimized?: boolean;
  product?: any;
}) {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Add to Cart
    </button>
  );
}

export default AddToCartBtn;