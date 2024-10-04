import "./globals.css";
import { Poppins } from "next/font/google";
import { CartProvider } from "./Context/CartContext";
import { AuthContextProvider } from "./Context/AuthContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Commerce",
  description: "Buy all goods at cheaper rate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <AuthContextProvider>
          <CartProvider>{children}</CartProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
