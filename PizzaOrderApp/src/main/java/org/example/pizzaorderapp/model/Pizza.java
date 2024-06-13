package org.example.pizzaorderapp.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Model class representing a pizza.
 * <p>
 * This class includes validation constraints to ensure that the pizza details are provided correctly.
 * </p>
 */
public class Pizza {
    private Long id;

    @NotNull(message = "Ingredients cannot be null or empty")
    @Valid
    private List<IngredientSelection> ingredients;  // Only IDs and quantities

    private Double price;

    /**
     * Constructs a new {@code Pizza} with the specified identifier and list of ingredient selections.
     *
     * @param id the unique identifier of the pizza
     * @param ingredients the list of ingredient selections for the pizza
     */
    public Pizza(Long id, List<IngredientSelection> ingredients) {
        this.id = id;
        this.ingredients = ingredients;
    }

    /**
     * Returns the unique identifier of the pizza.
     *
     * @return the unique identifier of the pizza
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the pizza.
     *
     * @param id the unique identifier of the pizza
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the list of ingredient selections for the pizza.
     *
     * @return the list of ingredient selections for the pizza
     */
    public List<IngredientSelection> getIngredients() {
        return ingredients;
    }

    /**
     * Sets the list of ingredient selections for the pizza.
     *
     * @param ingredients the list of ingredient selections for the pizza
     */
    public void setIngredients(List<IngredientSelection> ingredients) {
        this.ingredients = ingredients;
    }

    /**
     * Returns the price of the pizza.
     *
     * @return the price of the pizza
     */
    public Double getPrice() {
        return price;
    }

    /**
     * Sets the price of the pizza.
     *
     * @param price the price of the pizza
     */
    public void setPrice(Double price) {
        this.price = price;
    }
}
