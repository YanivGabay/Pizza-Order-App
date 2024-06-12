package org.example.pizzaorderapp.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class PricingConfig {
    public static final double BASE_PIZZA_PRICE = 2.00;

    public static final double TOMATO = 1.75;
    public static final double CHEESE = 2.00;
    public static final double PEPERONI = 2.50;
    public static final double SAUCE = 1.25;
    public static final double RICOTTA = 2.25;
    public static final double OLIVES = 1.50;

    public static double getBasePizzaPrice() {
        return BASE_PIZZA_PRICE;
    }
    public static double getTomato() {
        return TOMATO;
    }
    public static double getCheese() {
        return CHEESE;
    }
    public static double getPeperoni() {
        return PEPERONI;
    }
    public static double getSauce() {
        return SAUCE;
    }
    public static double getRicotta() {
        return RICOTTA;
    }
    public static double getOlives() {
        return OLIVES;
    }

}
