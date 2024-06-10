package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.model.Order;
import org.example.pizzaorderapp.model.Pizza;
import org.springframework.stereotype.Service;
import org.example.pizzaorderapp.model.CustomerInfo;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final Map<String, Order> orders = new ConcurrentHashMap<>();
    private final AtomicLong orderCounter = new AtomicLong();

    // Create a new order
    public Order createOrder(CustomerInfo customerInfo) {
        // Generate a unique order code
        System.out.println("Received customerInfo: " + customerInfo);
        String orderCode = "ORD" + orderCounter.incrementAndGet();
        Order order = new Order(customerInfo, orderCode,orderCounter.longValue());
        // Store the order in the map
        orders.put(orderCode, order);
        return order;
    }

    // Retrieve an order by code
    public Order findOrderByCode(String orderCode) {
        return orders.get(orderCode);
    }

    public Order updateOrder(String orderCode, List<Pizza> pizzas) {
        Order order = orders.get(orderCode);
        if (order != null) {
            order.setPizzas(pizzas);
            return order;
        }
        return null;
    }

}
