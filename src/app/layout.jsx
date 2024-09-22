
// import Header from '@/components/Header';
// import NavBar from '@/components/NavBar';
// import Footer from '@/components/Footer';
import { AuthContextProvider } from "./Context/AuthContext";
import { Poppins } from "next/font/google";
import "./globals.css";

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
      <AuthContextProvider>
          <body suppressHydrationWarning={true} className={poppins.className}>{children}</body>
      </AuthContextProvider>
      <script
        async
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        async
        nomodule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </html>
  );
}
