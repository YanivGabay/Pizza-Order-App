package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.config.PricingConfig;
import org.example.pizzaorderapp.model.Ingredient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service class responsible for managing ingredients.
 */
@Service
public class IngredientService {
    private final List<Ingredient> ingredients = new ArrayList<>();

    /**
     * Constructs a new {@code IngredientService} and initializes the list of ingredients.
     */
    public IngredientService() {
        ingredients.add(new Ingredient(1L, "Tomato", "/tomato.jpg", PricingConfig.getTomato()));
        ingredients.add(new Ingredient(2L, "Cheese", "/cheese.jpg", PricingConfig.getCheese()));
        ingredients.add(new Ingredient(3L, "Pepperoni", "/peperoni.jpg", PricingConfig.getPeperoni()));
        ingredients.add(new Ingredient(4L, "Sauce", "/sauce.jpg", PricingConfig.getSauce()));
        ingredients.add(new Ingredient(5L, "Ricotta", "/ricotta.jpg", PricingConfig.getRicotta()));
        ingredients.add(new Ingredient(6L, "Olives", "/olives.jpg", PricingConfig.getOlives()));
    }

    /**
     * Returns a list of all ingredients.
     *
     * @return a list of {@link Ingredient} objects
     */
    public List<Ingredient> getAllIngredients() {
        return ingredients;
    }

    /**
     * Finds an ingredient by its identifier.
     *
     * @param id the identifier of the ingredient to find
     * @return an {@link Optional} containing the found ingredient, or empty if no ingredient is found
     */
    public Optional<Ingredient> findById(long id) {
        return ingredients.stream()
                .filter(e -> e.getId() == id)
                .findFirst();
    }

    /**
     * Deletes an ingredient by its identifier.
     *
     * @param id the identifier of the ingredient to delete
     * @return {@code true} if the ingredient was deleted, {@code false} otherwise
     */
    public boolean delete(long id) {
        return ingredients.removeIf(ingredient -> ingredient.getId() == id);
    }
}
