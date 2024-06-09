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
        ingredients.add(new Ingredient(1L, "Tomato", "images/tomato.png",1.75));
        ingredients.add(new Ingredient(2L, "Cheese", "images/cheese.png",2.00));
        ingredients.add(new Ingredient(3L, "Peperoni", "images/peperoni.png",2.50));
        ingredients.add(new Ingredient(4L, "Sauce", "images/sauce.png",1.25));
        ingredients.add(new Ingredient(5L, "Ricotta", "images/ricotta.png",2.25));
        ingredients.add(new Ingredient(6L, "Olives", "images/olives.png",1.50));
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
