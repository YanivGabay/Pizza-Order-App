package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.model.Ingredient;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    private final List<Ingredient> ingredients = new ArrayList<>();

    public IngredientService() {
        ingredients.add(new Ingredient(1L, "Tomato", "/tomato.jpg",1.75));
        ingredients.add(new Ingredient(2L, "Cheese", "/cheese.jpg",2.00));
        ingredients.add(new Ingredient(3L, "Peperoni", "/peperoni.jpg",2.50));
        ingredients.add(new Ingredient(4L, "Sauce", "/sauce.jpg",1.25));
        ingredients.add(new Ingredient(5L, "Ricotta", "/ricotta.jpg",2.25));
        ingredients.add(new Ingredient(6L, "Olives", "/olives.jpg",1.50));
    }

    public List<Ingredient> getAllIngredients() {
        return ingredients;
    }

    public Optional<Ingredient> findById(long id) {
        return ingredients.stream()
                .filter(e -> e.getId() == id)
                .findFirst();
    }

    public boolean delete(long id) {
        return ingredients.removeIf(ingredient -> ingredient.getId() == id);

    }

}
