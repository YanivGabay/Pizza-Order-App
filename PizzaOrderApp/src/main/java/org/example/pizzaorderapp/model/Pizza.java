package org.example.pizzaorderapp.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class Pizza {
    private Long id;
    @NotNull(message = "Ingredients cannot be null or empty")
    @Valid
    private List<IngredientSelection> ingredients;  // Only IDs and quantities

    public Pizza(Long id, List<IngredientSelection> ingredients) {
        this.id = id;
        this.ingredients = ingredients;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<IngredientSelection> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientSelection> ingredients) {
        this.ingredients = ingredients;
    }
}

