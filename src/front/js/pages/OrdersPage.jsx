import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { OrderList } from "../component/Orders/OrderList";
import { OrderForm } from "../component/Orders/OrderForm";

const OrdersPage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadOrders();
    }, []);

    return (
        <div>
            <h2>Pedidos</h2>
            <OrderForm onSubmit={actions.createOrder} />
            <OrderList orders={store.orders} onDelete={actions.updateOrderStatus} />
        </div>
    );
};

export default OrdersPage;