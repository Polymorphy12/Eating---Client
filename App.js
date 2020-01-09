import {createAppContainer} from "react-navigation"
import {createStackNavigator} from 'react-navigation-stack'
import MainActivity from "./main/mainActivity";
import LogIn from "./login/login";
import SelectRestaurant from "./order/selectRestaurant";
import Menu from "./order/menu";
import MenuDetails from "./order/menuDetails";
import ShoppingCart from "./order/shoppingCart";
import LocationSet from "./order/locationSet";
import SetPurchase from "./order/setPurchase";
import Purchase from "./order/purchase";
import OrderHistory from "./order/orderHistory";
import OrderHistoryDetails from "./order/orderHistoryDetails";
import HaktalNews from "./news/haktalNews";
import MyPage from "./mypage/mypage";
import SignUp3 from "./signup/SignUp3";
import SignUp6 from "./signup/SignUp6";
import EventDetail from "./news/EventDetail";
import CustomerSatisfaction from "./mypage/CustomerSatisfaction";
import Announcement from "./mypage/Announcement";

const App = createStackNavigator(
  {
    Home: { screen: MainActivity},
    LogIn: {screen: LogIn},
    SelectRestaurant: {screen: SelectRestaurant},
    menu: {screen: Menu},
    menuDetails: {screen: MenuDetails},
    shoppingCart: {screen: ShoppingCart},
    locationSet: {screen: LocationSet},
    setPurchase : {screen: SetPurchase},
    purchase: {screen: Purchase},
    orderHistory:{screen: OrderHistory},
    orderHistoryDetails: {screen: OrderHistoryDetails},
    haktalNews: {screen: HaktalNews},
    EventDetail: {screen: EventDetail},
    mypage: {screen: MyPage},
    signUp3: {screen: SignUp3},
    signUp6: {screen: SignUp6},
    CustomerSatisfaction : {screen: CustomerSatisfaction},
    Announcement: {screen: Announcement}
  },
  {initialRouteName: "Home", headerMode: "none"}
);

export default createAppContainer(App)