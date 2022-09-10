import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  products: null,
  sidebarShow: false,
  dataModal: null,
  modalShow: false,
  cartShow: false,
  cartItems: cartInfo,
  temporaryParam: "",
  headerColor: false,
};
