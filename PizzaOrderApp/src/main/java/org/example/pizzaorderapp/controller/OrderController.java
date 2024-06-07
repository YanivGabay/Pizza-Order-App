package org.example.pizzaorderapp.controller;

import jakarta.validation.Valid;
import org.example.pizzaorderapp.model.Order;
import org.example.pizzaorderapp.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
public class OrderController extends BaseController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
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
}
