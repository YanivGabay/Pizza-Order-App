package org.example.pizzaorderapp.model;

import java.util.List;

public class Order {
    private Long id;
    private List<Pizza> pizzas;
    private CustomerInfo customerInfo;
    private String orderCode;

    public Order(Long id, List<Pizza> pizzas, CustomerInfo customerInfo, String orderCode) {
        this.id = id;
        this.pizzas = pizzas;
        this.customerInfo = customerInfo;
        this.orderCode = orderCode;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Pizza> getPizzas() {
        return pizzas;
    }

    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }

    public CustomerInfo getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(CustomerInfo customerInfo) {
        this.customerInfo = customerInfo;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }
}
