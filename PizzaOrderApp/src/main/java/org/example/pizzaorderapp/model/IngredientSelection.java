package org.example.pizzaorderapp.model;

/**
 * Model class representing the selection of an ingredient with its quantity.
 */
public class IngredientSelection {
    private Long id;
    private int quantity;  // Quantity of each ingredient

    /**
     * Constructs a new {@code IngredientSelection} with the specified details.
     *
     * @param id the unique identifier of the ingredient
     * @param quantity the quantity of the ingredient
     */
    public IngredientSelection(Long id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    /**
     * Returns the unique identifier of the ingredient.
     *
     * @return the unique identifier of the ingredient
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the ingredient.
     *
     * @param id the unique identifier of the ingredient
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the quantity of the ingredient.
     *
     * @return the quantity of the ingredient
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the quantity of the ingredient.
     *
     * @param quantity the quantity of the ingredient
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
