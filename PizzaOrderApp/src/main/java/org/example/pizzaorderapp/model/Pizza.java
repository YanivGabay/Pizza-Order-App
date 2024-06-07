package org.example.pizzaorderapp.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class Pizza {
    private Long id;


    @NotNull(message = "Ingredients cannot be null or empty")
    @Valid
    private List<Ingredient> ingredients;

    public Pizza(Long id, List<Ingredient> ingredients) {
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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
