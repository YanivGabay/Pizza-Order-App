package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.model.Order;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final Map<String, Order> orders = new ConcurrentHashMap<>();
    private final AtomicLong orderCounter = new AtomicLong();

    // Create a new order
    public Order createOrder(Order order) {
        // Generate a unique order code
        String orderCode = "ORD" + orderCounter.incrementAndGet();
        order.setOrderCode(orderCode);
        // Store the order in the map
        orders.put(orderCode, order);
        return order;
    }

    // Retrieve an order by code
    public Order findOrderByCode(String orderCode) {
        return orders.get(orderCode);
    }
}
