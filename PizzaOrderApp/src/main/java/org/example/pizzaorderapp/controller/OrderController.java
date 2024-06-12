package org.example.pizzaorderapp.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.example.pizzaorderapp.model.Order;
import org.example.pizzaorderapp.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.pizzaorderapp.model.Pizza;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.example.pizzaorderapp.model.CustomerInfo;
@RestController
public class OrderController extends BaseController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody CustomerInfo customerInfo, HttpServletResponse response) throws UnsupportedEncodingException {
        Order createdOrder = orderService.createOrder(customerInfo);
        if (createdOrder != null) {
            try{
            // Setting cookies with security enhancements
            Cookie[] cookies = getCookies(customerInfo);
            for (Cookie cookie : cookies) {
                cookie.setHttpOnly(false); // Protects cookie from being accessed by JavaScript
                cookie.setSecure(false);   // Ensures cookie is sent over HTTPS only
                cookie.setPath("/");      // Sets path to ensure cookie is sent for all requests within domain
                cookie.setMaxAge(60 * 60 * 24); // Set expiration time (e.g., 24 hours)
                response.addCookie(cookie);
            }

            return ResponseEntity.created(URI.create("/api/v1/orders/" + createdOrder.getId())).body(createdOrder);
        } catch (Exception e) {
            // Log and handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } else {
        return ResponseEntity.badRequest().build();
    }
}

    private static Cookie[] getCookies(CustomerInfo customerInfo) throws UnsupportedEncodingException {
        Cookie fNameCookie = new Cookie("firstName", URLEncoder.encode(customerInfo.getFirstName(), StandardCharsets.UTF_8));
        Cookie lNameCookie = new Cookie("lastName", URLEncoder.encode(customerInfo.getLastName(), StandardCharsets.UTF_8));
        Cookie addrCookie = new Cookie("address", URLEncoder.encode(customerInfo.getAddress(), StandardCharsets.UTF_8));
        Cookie phoneCookie = new Cookie("phoneNumber", URLEncoder.encode(customerInfo.getPhoneNumber(), StandardCharsets.UTF_8));

        return new Cookie[]{fNameCookie, lNameCookie, addrCookie, phoneCookie};
    }

    @GetMapping("/orders/{orderCode}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderCode) {
        Order order = orderService.findOrderByCode(orderCode);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PutMapping("/orders/{orderCode}")
    public ResponseEntity<Order> updateOrder(@PathVariable String orderCode, @Valid @RequestBody List<Pizza> pizzas) {
        Order order = orderService.updateOrder(orderCode, pizzas);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
