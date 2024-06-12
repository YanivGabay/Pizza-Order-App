package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.config.PricingConfig;
import org.example.pizzaorderapp.model.IngredientSelection;
import org.example.pizzaorderapp.model.Order;
import org.example.pizzaorderapp.model.Pizza;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.pizzaorderapp.model.CustomerInfo;
import org.example.pizzaorderapp.model.Ingredient;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class OrderService {

    private final Map<String, Order> orders = new ConcurrentHashMap<>();
    private final AtomicLong orderCounter = new AtomicLong();
    private final IngredientService ingredientService;


    @Autowired
    public OrderService(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }
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
            order.setOrderTotal(orderTotalPrice(order));
            return order;
        }
        return null;
    }

    public Double orderTotalPrice(Order order)
    {
        List<Pizza> pizzas = order.getPizzas();
        double orderTotal = 0;
        for (Pizza pizza : pizzas) {
            double pizzaPrice = PricingConfig.getBasePizzaPrice();
            for (IngredientSelection ingredient : pizza.getIngredients()) {
                double ingredientPrice = getPriceForIngredient(ingredient.getId());
                pizzaPrice += ingredientPrice * ingredient.getQuantity();
            }
            pizza.setPrice(pizzaPrice); // Assuming you have a setPrice method in Pizza
            orderTotal += pizzaPrice;
        }
        return orderTotal;
    }

    public double getPriceForIngredient(long ingredientId) {
        Optional<Ingredient> ingredientOpt = ingredientService.findById(ingredientId);
        if (ingredientOpt.isPresent()) {
            return ingredientOpt.get().getPrice();
        } else {
            throw new IllegalArgumentException("Ingredient not found with ID: " + ingredientId);
        }
    }

}
