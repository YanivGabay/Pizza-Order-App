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

/**
 * Controller that handles requests related to orders.
 * <p>
 * This controller extends {@link BaseController}, inheriting the base route "/api/v1".
 * </p>
 */
@RestController
public class OrderController extends BaseController {

    private final OrderService orderService;

    /**
     * Constructs a new {@code OrderController} with the specified {@link OrderService}.
     *
     * @param orderService the order service to be used by this controller
     */
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Endpoint to create a new order.
     * <p>
     * This method handles POST requests to "/api/v1/orders" and creates a new order based on the provided customer information.
     * It also sets cookies with customer details in the response.
     * </p>
     *
     * @param customerInfo the customer information for creating the order
     * @param response the HTTP servlet response to set cookies
     * @return a {@code ResponseEntity} containing the created order
     * @throws UnsupportedEncodingException if encoding the customer information fails
     */
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@Valid @RequestBody CustomerInfo customerInfo, HttpServletResponse response) throws UnsupportedEncodingException {
        Order createdOrder = orderService.createOrder(customerInfo);
        if (createdOrder != null) {
            try {
                // Setting cookies with security enhancements
                Cookie[] cookies = getCookies(customerInfo);
                for (Cookie cookie : cookies) {
                    cookie.setHttpOnly(true); // Protects cookie from being accessed by JavaScript
                    cookie.setSecure(true);   // Ensures cookie is sent over HTTPS only
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

    /**
     * Sets cookies with customer information.
     *
     * @param customerInfo the customer information
     * @return an array of cookies
     * @throws UnsupportedEncodingException if encoding the customer information fails
     */
    private static Cookie[] getCookies(CustomerInfo customerInfo) throws UnsupportedEncodingException {
        Cookie fNameCookie = new Cookie("firstName", URLEncoder.encode(customerInfo.getFirstName(), StandardCharsets.UTF_8));
        Cookie lNameCookie = new Cookie("lastName", URLEncoder.encode(customerInfo.getLastName(), StandardCharsets.UTF_8));
        Cookie addrCookie = new Cookie("address", URLEncoder.encode(customerInfo.getAddress(), StandardCharsets.UTF_8));
        Cookie phoneCookie = new Cookie("phoneNumber", URLEncoder.encode(customerInfo.getPhoneNumber(), StandardCharsets.UTF_8));

        return new Cookie[]{fNameCookie, lNameCookie, addrCookie, phoneCookie};
    }

    /**
     * Endpoint to retrieve an order by its code.
     * <p>
     * This method handles GET requests to "/api/v1/orders/{orderCode}" and returns the order with the specified code.
     * If the order is not found, it returns a 404 Not Found response.
     * </p>
     *
     * @param orderCode the code of the order to retrieve
     * @return a {@code ResponseEntity} containing the order or a 404 Not Found response
     */
    @GetMapping("/orders/{orderCode}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderCode) {
        Order order = orderService.findOrderByCode(orderCode);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    /**
     * Endpoint to update an order with a list of pizzas.
     * <p>
     * This method handles PUT requests to "/api/v1/orders/{orderCode}" and updates the order with the specified code.
     * </p>
     *
     * @param orderCode the code of the order to update
     * @param pizzas the list of pizzas to update the order with
     * @return a {@code ResponseEntity} containing the updated order or a 404 Not Found response
     */
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
