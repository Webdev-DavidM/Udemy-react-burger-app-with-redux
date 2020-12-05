import * as actionTypes from "./actionTypes";
// import axios from "../../axios-orders";
import axios from "axios";
import order from "../../components/Order/Order";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  console.log(orderData);
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("http://localhost:5000/orders", orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  console.log(token, userId);
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    axios
      .get("http://localhost:5000/orders", {
        params: {
          token,
          userId,
        },
      })
      .then((res) => {
        // console.log(res);
        // const fetchedOrders = res.data.map(order => res.data

        // })
        // for (let key in res.data) {
        //   fetchedOrders.push({
        //     ...res.data[key],
        //     id: key,
        //   });
        // }
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
