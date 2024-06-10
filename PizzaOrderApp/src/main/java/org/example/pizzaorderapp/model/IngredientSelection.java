package org.example.pizzaorderapp.model;

public class IngredientSelection {
    private Long id;
    private int quantity;  // Quantity of each ingredient

    IngredientSelection(Long id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
