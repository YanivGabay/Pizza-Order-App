package org.example.pizzaorderapp.config;

import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for pricing details of pizza ingredients.
 */
@Configuration
public class PricingConfig {
    public static final double BASE_PIZZA_PRICE = 2.00;

    public static final double TOMATO = 1.75;
    public static final double CHEESE = 2.00;
    public static final double PEPERONI = 2.50;
    public static final double SAUCE = 1.25;
    public static final double RICOTTA = 2.25;
    public static final double OLIVES = 1.50;

    /**
     * Returns the base price of a pizza.
     *
     * @return the base price of a pizza
     */
    public static double getBasePizzaPrice() {
        return BASE_PIZZA_PRICE;
    }

    /**
     * Returns the price of tomato.
     *
     * @return the price of tomato
     */
    public static double getTomato() {
        return TOMATO;
    }

    /**
     * Returns the price of cheese.
     *
     * @return the price of cheese
     */
    public static double getCheese() {
        return CHEESE;
    }

    /**
     * Returns the price of pepperoni.
     *
     * @return the price of pepperoni
     */
    public static double getPeperoni() {
        return PEPERONI;
    }

    /**
     * Returns the price of sauce.
     *
     * @return the price of sauce
     */
    public static double getSauce() {
        return SAUCE;
    }

    /**
     * Returns the price of ricotta.
     *
     * @return the price of ricotta
     */
    public static double getRicotta() {
        return RICOTTA;
    }

    /**
     * Returns the price of olives.
     *
     * @return the price of olives
     */
    public static double getOlives() {
        return OLIVES;
    }
}
