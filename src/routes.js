// Login

// 處理 index 問題
import Login from "./pages/Login/index";
// Guests
import Guest from "./pageLayouts/GuestLayout";
import Home from "./pages/Home/index";
import ProductList from "./pages/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductOrder from "./components/ProductOrder";
import AboutUs from "./pages/AboutUs";
import Promotion from "./pages/Promotion";
// Admin
import Admin from "./pageLayouts/AdminLayout";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Coupons from "./components/Coupons";

const allRoutes = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/guest",
    component: Guest,
    routes: [
      {
        path: "/guest/home",
        exact: true,
        component: Home,
      },
      {
        path: "/guest/productlist/:brand/:type",
        exact: true,
        component: ProductList,
      },
      {
        path: "/guest/productdetail/:id",
        exact: true,
        component: ProductDetail,
      },
      {
        path: "/guest/productorder/:step",
        exact: true,
        component: ProductOrder,
      },
      {
        path: "/guest/aboutus",
        exact: true,
        component: AboutUs,
      },
      {
        path: "/guest/promotion",
        exact: true,
        component: Promotion,
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    routes: [
      {
        path: "/admin/products",
        exact: true,
        component: Products,
      },
      {
        path: "/admin/orders",
        exact: true,
        component: Orders,
      },
      {
        path: "/admin/coupons",
        exact: true,
        component: Coupons,
      },
    ],
  },
];

export default allRoutes;
