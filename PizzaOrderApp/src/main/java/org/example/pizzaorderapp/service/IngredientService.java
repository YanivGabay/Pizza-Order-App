package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.model.Ingredient;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class IngredientService {
    private final List<Ingredient> ingredients = new ArrayList<>();

    public IngredientService() {
        ingredients.add(new Ingredient(1L, "Tomato", "images/tomato.png"));
        ingredients.add(new Ingredient(2L, "Cheese", "images/cheese.png"));
        ingredients.add(new Ingredient(3L, "Peperoni", "images/peperoni.png"));
        ingredients.add(new Ingredient(4L, "Sauce", "images/sauce.png"));
        ingredients.add(new Ingredient(5L, "Ricotta", "images/ricotta.png"));
        ingredients.add(new Ingredient(6L, "Olives", "images/olives.png"));
    }

    public List<Ingredient> getAllIngredients() {
        return ingredients;
    }
}
