import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsListing from "@/components/ProductsListing";

const HomePage = () => {
  return (
    <>
      <ul>
        <li>Clothes</li>
        <li>Electronics</li>
        <li>Furniture</li>
        <li>Shoes</li>
      </ul>
      <Header />
      <ProductsListing />
      <Footer />
    </>
  );
};

export default HomePage;
