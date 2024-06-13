package org.example.pizzaorderapp.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * Model class representing an order.
 * <p>
 * This class includes validation constraints to ensure that the order details are provided correctly.
 * </p>
 */
public class Order {
    private Long id;

    @Valid
    private List<Pizza> pizzas;

    @Valid
    @NotNull(message = "Customer info cannot be null")
    private CustomerInfo customerInfo;

    private Double orderTotal;
    private String orderCode;

    /**
     * Constructs a new {@code Order} with the specified customer information, order code, and identifier.
     *
     * @param customerInfo the customer information
     * @param orderCode the order code
     * @param id the unique identifier of the order
     */
    public Order(CustomerInfo customerInfo, String orderCode, Long id) {
        this.id = id;
        this.customerInfo = customerInfo;
        this.orderCode = orderCode;
    }

    /**
     * Constructs a new {@code Order} with the specified details.
     *
     * @param id the unique identifier of the order
     * @param pizzas the list of pizzas in the order
     * @param customerInfo the customer information
     * @param orderCode the order code
     */
    public Order(Long id, List<Pizza> pizzas, CustomerInfo customerInfo, String orderCode) {
        this.id = id;
        this.pizzas = pizzas;
        this.customerInfo = customerInfo;
        this.orderCode = orderCode;
    }

    /**
     * Returns the unique identifier of the order.
     *
     * @return the unique identifier of the order
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the order.
     *
     * @param id the unique identifier of the order
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the list of pizzas in the order.
     *
     * @return the list of pizzas in the order
     */
    public List<Pizza> getPizzas() {
        return pizzas;
    }

    /**
     * Sets the list of pizzas in the order.
     *
     * @param pizzas the list of pizzas in the order
     */
    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }

    /**
     * Returns the customer information of the order.
     *
     * @return the customer information of the order
     */
    public CustomerInfo getCustomerInfo() {
        return customerInfo;
    }

    /**
     * Sets the customer information of the order.
     *
     * @param customerInfo the customer information of the order
     */
    public void setCustomerInfo(CustomerInfo customerInfo) {
        this.customerInfo = customerInfo;
    }

    /**
     * Returns the total price of the order.
     *
     * @return the total price of the order
     */
    public Double getOrderTotal() {
        return orderTotal;
    }

    /**
     * Sets the total price of the order.
     *
     * @param orderTotal the total price of the order
     */
    public void setOrderTotal(Double orderTotal) {
        this.orderTotal = orderTotal;
    }

    /**
     * Returns the order code.
     *
     * @return the order code
     */
    public String getOrderCode() {
        return orderCode;
    }

    /**
     * Sets the order code.
     *
     * @param orderCode the order code
     */
    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }
}
