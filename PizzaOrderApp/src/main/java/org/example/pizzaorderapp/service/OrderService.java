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

/**
 * Service class responsible for managing orders.
 */
@Service
public class OrderService {

    private final Map<String, Order> orders = new ConcurrentHashMap<>();
    private final AtomicLong orderCounter = new AtomicLong();
    private final IngredientService ingredientService;

    /**
     * Constructs a new {@code OrderService} with the specified {@link IngredientService}.
     *
     * @param ingredientService the ingredient service to be used by this service
     */
    @Autowired
    public OrderService(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    /**
     * Creates a new order for the specified customer information.
     * <p>
     * Generates a unique order code and stores the order.
     * </p>
     *
     * @param customerInfo the customer information for the order
     * @return the created {@link Order}
     */
    public Order createOrder(CustomerInfo customerInfo) {
        // Generate a unique order code
        System.out.println("Received customerInfo: " + customerInfo);
        String orderCode = "ORD" + orderCounter.incrementAndGet();
        Order order = new Order(customerInfo, orderCode, orderCounter.longValue());
        // Store the order in the map
        orders.put(orderCode, order);
        return order;
    }

    /**
     * Retrieves an order by its code.
     *
     * @param orderCode the code of the order to retrieve
     * @return the {@link Order} if found, otherwise {@code null}
     */
    public Order findOrderByCode(String orderCode) {
        return orders.get(orderCode);
    }

    /**
     * Updates an order with the specified list of pizzas.
     *
     * @param orderCode the code of the order to update
     * @param pizzas the list of pizzas to update the order with
     * @return the updated {@link Order}, or {@code null} if the order is not found
     */
    public Order updateOrder(String orderCode, List<Pizza> pizzas) {
        Order order = orders.get(orderCode);
        if (order != null) {
            order.setPizzas(pizzas);
            order.setOrderTotal(orderTotalPrice(order));
            return order;
        }
        return null;
    }

    /**
     * Calculates the total price of the specified order.
     *
     * @param order the order to calculate the total price for
     * @return the total price of the order
     */
    public Double orderTotalPrice(Order order) {
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

    /**
     * Returns the price for the ingredient with the specified identifier.
     *
     * @param ingredientId the identifier of the ingredient
     * @return the price of the ingredient
     * @throws IllegalArgumentException if the ingredient is not found
     */
    public double getPriceForIngredient(long ingredientId) {
        Optional<Ingredient> ingredientOpt = ingredientService.findById(ingredientId);
        if (ingredientOpt.isPresent()) {
            return ingredientOpt.get().getPrice();
        } else {
            throw new IllegalArgumentException("Ingredient not found with ID: " + ingredientId);
        }
    }
}
