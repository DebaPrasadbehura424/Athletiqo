import React, { useState } from "react";
import { FaShoppingCart, FaEye, FaCheckCircle } from "react-icons/fa";

const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Latest model with 128GB storage and 5G support.",
  },
  {
    id: 3,
    name: "Laptop",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a0a6",
    description: "Powerful laptop with 16GB RAM and 512GB SSD.",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    description: "Fitness tracker with heart rate monitor and GPS.",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Portable speaker with deep bass and 10-hour battery.",
  },
  {
    id: 6,
    name: "Gaming Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "Next-gen console with 4K gaming support.",
  },
  {
    id: 7,
    name: "Camera",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1519638399536-1b0366030c1a",
    description: "Mirrorless camera with 24MP sensor and 4K video.",
  },
  {
    id: 8,
    name: "Tablet",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
    description: "10-inch tablet with 64GB storage and stylus support.",
  },
  {
    id: 9,
    name: "Wireless Mouse",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1615663245857-ac93a3a1e4c7",
    description: "Ergonomic mouse with adjustable DPI settings.",
  },
  {
    id: 10,
    name: "Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Durable backpack with laptop compartment.",
  },
];

const Marketplace = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState("products");

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const buyNow = (product) => {
    const order = {
      id: Date.now(),
      product,
      quantity: 1,
      total: product.price,
      date: new Date().toLocaleDateString(),
    };
    setOrders([...orders, order]);
    setView("orders");
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setView("details");
  };

  const totalCartAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-blue-600 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4 sm:mb-0">
            Cosmic Marketplace
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setView("products")}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Shop
            </button>
            <button
              onClick={() => setView("cart")}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md relative"
            >
              <FaShoppingCart className="inline mr-1 sm:mr-2" />
              Cart ({cart.length})
            </button>
            <button
              onClick={() => setView("orders")}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Orders
            </button>
          </div>
        </nav>

        {view === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productsData.map((product, index) => (
              <div
                key={product.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 transition duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => buyNow(product)}
                      className="flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => viewProductDetails(product)}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "cart" && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Your Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">
                Your cart is empty.
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center border-b py-3 sm:py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mb-2 sm:mb-0"
                    />
                    <div className="flex-1 sm:ml-4">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs sm:text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs sm:text-sm bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
                    Total: ${totalCartAmount.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      if (cart.length > 0) {
                        const order = {
                          id: Date.now(),
                          items: cart,
                          total: totalCartAmount,
                          date: new Date().toLocaleDateString(),
                        };
                        setOrders([...orders, order]);
                        setCart([]);
                        setView("orders");
                      }
                    }}
                    className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {view === "orders" && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              My Orders
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">
                No orders yet.
              </p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border-b py-3 sm:py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm sm:text-lg font-semibold text-gray-800">
                        Order #{order.id}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Date: {order.date}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Total: $
                        {order.total?.toFixed(2) ||
                          order.product.price.toFixed(2)}
                      </p>
                    </div>
                    <FaCheckCircle className="text-green-500 text-xl sm:text-2xl" />
                  </div>
                  {order.items ? (
                    order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center mt-3 sm:mt-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="ml-3 sm:ml-4">
                          <p className="text-gray-800 font-medium text-xs sm:text-sm">
                            {item.name}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center mt-3 sm:mt-4">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="ml-3 sm:ml-4">
                        <p className="text-gray-800 font-medium text-xs sm:text-sm">
                          {order.product.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          ${order.product.price.toFixed(2)} x {order.quantity}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {view === "details" && selectedProduct && (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Product Details
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-base sm:text-xl font-semibold text-gray-800">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              ${selectedProduct.price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {selectedProduct.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={() => buyNow(selectedProduct)}
                className="flex-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
              >
                Buy Now
              </button>
              <button
                onClick={() => setView("products")}
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
