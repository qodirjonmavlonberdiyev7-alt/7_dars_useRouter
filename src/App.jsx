import { useReducer } from "react";
import ParticleBackground from "./ParticleBackground";
// complex state => useReducer

function App() {
  const intialState = {
    products: [
      { id: 1, name: "Iphone 18 pro max", price: 1800, stock: 12 },
    ],
    cart: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        const product = action.payload;

        const foundedProduct = state.cart.find(
          (item) => item.id === product.id,
        );

        if (foundedProduct) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }

        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }

      case "INCREASE_QUANTITY": {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      case "DECREASE_QUANTITY": {
        return {
          ...state,
          cart: state.cart
            .map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        };
      }

      case "REMOVE_FROM_CART": {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, intialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="shop-app">
      <ParticleBackground />

      <div className="shop-shell">
        <div className="shop-header">
          <h1 className="shop-title">Product</h1>
          <div className="cart-badge">
            <span className="cart-badge-icon">🛒</span>
            <span className="cart-badge-count">{cartCount}</span>
          </div>
        </div>

        <div className="shop-grid">
          {/* Products */}
          <section className="product-list">
            {state.products.map((product) => (
              <div className="product-card" key={product.id}>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price}$</p>
                <p className="product-stock">Mavjud: {product.stock} ta</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Savatga qo'shish
                </button>
              </div>
            ))}
          </section>

          {/* Cart */}
          <section className="cart-panel">
            <h2 className="cart-title">Savat</h2>

            {state.cart.length === 0 ? (
              <p className="cart-empty">Savat bo'sh</p>
            ) : (
              <>
                <ul className="cart-list">
                  {state.cart.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">
                          {item.price}$ x {item.quantity} ={" "}
                          {item.price * item.quantity}$
                        </span>
                      </div>

                      <div className="cart-item-actions">
                        <div className="qty-control">
                          <button
                            className="qty-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            −
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn btn-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          O'chirish
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-total">
                  <span>Jami:</span>
                  <span className="cart-total-value">{total}$</span>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;