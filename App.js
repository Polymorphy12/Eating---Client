import {createAppContainer} from "react-navigation"
import {createStackNavigator} from 'react-navigation-stack'
import MainActivity from "./main/mainActivity";
import LogIn from "./login/login";
import FindEmail from "./login/findEmail";
import FindEmailResult from "./login/findEmailResult";
import FindPassword from "./login/findPassword";
import SelectRestaurant from "./order/selectRestaurant";
import Menu from "./order/menu";
import MenuDetails from "./order/menuDetails";
import ShoppingCart from "./order/shoppingCart";
import LocationSet from "./order/locationSet";
import SetPurchase from "./order/setPurchase";
import Purchase from "./order/purchase";
import PurchaseFinalCheck from './order/purchaseFinalCheck';
import OrderHistory from "./order/orderHistory";
import OrderHistoryDetails from "./order/orderHistoryDetails";
import HaktalNews from "./news/haktalNews";
import EventDetail from "./news/EventDetail";
import MyPage from "./mypage/mypage";
import CustomerSatisfaction from "./mypage/CustomerSatisfaction";
import Announcement from "./mypage/Announcement";
import personalInfo from "./mypage/personalInfo";
import withdrawal from "./mypage/withdrawal";
import SignUp1 from "./signup/SignUp1";
import SignUp2 from "./signup/SignUp2";
import SignUp3 from "./signup/SignUp3";
import SignUp4 from "./signup/SignUp4";
import SignUp5 from "./signup/SignUp5";
import SignUp6 from "./signup/SignUp6";

const App = createStackNavigator(
  {
    Home: { screen: MainActivity},
    LogIn: {screen: LogIn},
    findEmail: {screen: FindEmail},
    findEmailResult: {screen: FindEmailResult},
    findPassword: {screen: FindPassword},
    SelectRestaurant: {screen: SelectRestaurant},
    menu: {screen: Menu},
    menuDetails: {screen: MenuDetails},
    shoppingCart: {screen: ShoppingCart},
    locationSet: {screen: LocationSet},
    setPurchase : {screen: SetPurchase},
    purchase: {screen: Purchase},
    purchaseFinalCheck: {screen: PurchaseFinalCheck},
    orderHistory:{screen: OrderHistory},
    orderHistoryDetails: {screen: OrderHistoryDetails},
    haktalNews: {screen: HaktalNews},
    EventDetail: {screen: EventDetail},
    mypage: {screen: MyPage},
    personalInfo: {screen: personalInfo},
    withdrawal: {screen: withdrawal},
    signUp1: {screen: SignUp1},
    signUp2: {screen: SignUp2},
    signUp3: {screen: SignUp3},
    signUp4: {screen: SignUp4},
    signUp5: {screen: SignUp5},
    signUp6: {screen: SignUp6},
    CustomerSatisfaction : {screen: CustomerSatisfaction},
    Announcement: {screen: Announcement}
  },
  {initialRouteName: "Home", headerMode: "none"}
);

export default createAppContainer(App)