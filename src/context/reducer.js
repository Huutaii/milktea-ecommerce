export const actionType = {
  SET_USER: "SET_USER",
  SET_PRODUCT_ITEMS: "SET_PRODUCT_ITEMS",
  SET_SIDEBAR_SHOW: "SET_SIDEBAR_SHOW",
  SET_MODAL_ITEM: "SET_MODAL_ITEM",
  SET_MODAL_SHOW: "SET_MODAL_SHOW",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_TEMPORARY_PARAM: "SET_TEMPORARY_PARAM",
  SET_HEADERCOLOR: "SET_HEADERCOLOR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_PRODUCT_ITEMS:
      return {
        ...state,
        products: action.products,
      };

    case actionType.SET_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      };

    case actionType.SET_MODAL_ITEM:
      return {
        ...state,
        dataModal: action.dataModal,
      };

    case actionType.SET_MODAL_SHOW:
      return {
        ...state,
        modalShow: action.modalShow,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    case actionType.SET_TEMPORARY_PARAM:
      return {
        ...state,
        temporaryParam: action.temporaryParam,
      };

    case actionType.SET_HEADERCOLOR:
      return {
        ...state,
        headerColor: action.headerColor,
      };

    default:
      return state;
  }
};

export default reducer;
