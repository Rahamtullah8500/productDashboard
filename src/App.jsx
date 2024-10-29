// src/App.js
import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Slider, Typography } from "@mui/material";
import "./App.css";
import ProductCard from "./components/commonComponents/productCard/ProductCard";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [products, setProducts] = useState([]); // Products from API
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  const categories = [
    "All",
    "Electronics",
    "Jewelery",
    "Men's clothing",
    "Women's clothing",
  ];

  // Fetch data from the API on component mount
  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleFetchProducts = async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const prices = data.map((item) => item.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "" || product.category === category.toLowerCase();
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="app">
      <Navbar />
      <div className=" app-body">
        <div className="header-container">
          <h2>Product Dashboard</h2>
          <div className="filter-container">
            <TextField
              label="Search by name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>

            <div className="slider-container">
              <Typography variant="body1" gutterBottom>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                min={0}
                max={200}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
        </div>

        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
