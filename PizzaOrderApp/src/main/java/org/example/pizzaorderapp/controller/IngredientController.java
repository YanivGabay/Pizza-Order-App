package org.example.pizzaorderapp.controller;

import org.example.pizzaorderapp.model.Ingredient;
import org.example.pizzaorderapp.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

/**
 * Controller that handles requests related to ingredients.
 * <p>
 * This controller extends {@link BaseController}, inheriting the base route "/api/v1".
 * </p>
 */
@RestController
public class IngredientController extends BaseController {

    private final IngredientService ingredientService;

    /**
     * Constructs a new {@code IngredientController} with the specified {@link IngredientService}.
     *
     * @param ingredientService the ingredient service to be used by this controller
     */
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    /**
     * Endpoint to retrieve all ingredients.
     * <p>
     * This method handles GET requests to "/api/v1/ingredients" and returns a list of all ingredients.
     * </p>
     *
     * @return a {@code ResponseEntity} containing the list of ingredients
     */
    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        return ResponseEntity.ok(ingredients);
    }

    /**
     * Endpoint to retrieve an ingredient by its ID.
     * <p>
     * This method handles GET requests to "/api/v1/ingredients/{id}" and returns the ingredient with the specified ID.
     * If the ingredient is not found, it returns a 404 Not Found response.
     * </p>
     *
     * @param id the ID of the ingredient to retrieve
     * @return a {@code ResponseEntity} containing the ingredient or a 404 Not Found response
     */
    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        Optional<Ingredient> ingredient = ingredientService.findById(id);
        return ingredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
