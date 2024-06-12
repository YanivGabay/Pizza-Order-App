package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.config.PricingConfig;
import org.example.pizzaorderapp.model.Ingredient;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    private final List<Ingredient> ingredients = new ArrayList<>();

    public IngredientService() {
        ingredients.add(new Ingredient(1L, "Tomato", "/tomato.jpg", PricingConfig.getTomato()));
        ingredients.add(new Ingredient(2L, "Cheese", "/cheese.jpg",PricingConfig.getCheese()));
        ingredients.add(new Ingredient(3L, "Peperoni", "/peperoni.jpg",PricingConfig.getPeperoni()));
        ingredients.add(new Ingredient(4L, "Sauce", "/sauce.jpg",PricingConfig.getSauce()));
        ingredients.add(new Ingredient(5L, "Ricotta", "/ricotta.jpg",PricingConfig.getRicotta()));
        ingredients.add(new Ingredient(6L, "Olives", "/olives.jpg",PricingConfig.getOlives()));
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
