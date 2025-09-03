import { useState } from "react";
import PropTypes from "prop-types";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice.jsx";

function ProductList({ onHomeClick }) {
  // States
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // دوال التحكم
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
    
    // إعادة تعيين الزر بعد ثانيتين
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [plant.name]: false }));
    }, 2000);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // مصفوفة النباتات مع إضافة خصائص التخفيض
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
          sale: true,
          originalCost: "$20"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
          sale: true,
          originalCost: "$16"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
          sale: true,
          originalCost: "$24"
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
          sale: false
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18",
          sale: true,
          originalCost: "$22"
        },
      ],
    },
  ];

  // حساب عدد العناصر في السلة
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery Logo"
              width={50}
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div className="nav-links">
          <a href="#" onClick={handlePlantsClick}>
            Plants
          </a>
          <a href="#" onClick={handleCartClick} className="cart-link">
            🛒 <span className="cart-count">{cartItemsCount}</span>
          </a>
        </div>
      </div>

      {/* عرض المنتجات أو Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>
              <div className="plants-category">
                {category.plants.map((plant) => (
                  <div key={plant.name} className="plant-card">
                    {plant.sale && <div className="sale-badge">SALE</div>}
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    {plant.sale && plant.originalCost && (
                      <p className="original-price">{plant.originalCost}</p>
                    )}
                    <p className="current-price">{plant.cost}</p>
                    <p className="description">{plant.description}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      className={addedToCart[plant.name] ? "added" : ""}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

// ✅ إضافة PropTypes
ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};

export default ProductList;