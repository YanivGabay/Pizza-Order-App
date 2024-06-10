package org.example.pizzaorderapp.controller;

import jakarta.validation.Valid;
import org.example.pizzaorderapp.model.Order;
import org.example.pizzaorderapp.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.pizzaorderapp.model.Pizza;

import java.net.URI;
import java.util.List;

import org.example.pizzaorderapp.model.CustomerInfo;
@RestController
public class OrderController extends BaseController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody CustomerInfo customerInfo) {
        Order createdOrder = orderService.createOrder(customerInfo);
        if (createdOrder != null) {
            return ResponseEntity.created(URI.create("/api/v1/orders/" + createdOrder.getId())).body(createdOrder);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/orders/{orderCode}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderCode) {
        Order order = orderService.findOrderByCode(orderCode);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PutMapping("/orders/{orderCode}")
    public ResponseEntity<Order> updateOrder(@PathVariable String orderCode, @Valid @RequestBody List<Pizza> pizzas) {
        System.out.println("Received update request for orderCode " + orderCode + " with pizzas: " + pizzas);
        Order order = orderService.updateOrder(orderCode, pizzas);
        if (order != null) {
            System.out.println("Updating order was successful: " + order);
            return ResponseEntity.ok(order);
        } else {
            System.out.println("Order not found for orderCode: " + orderCode);
            return ResponseEntity.notFound().build();
        }
    }


}
