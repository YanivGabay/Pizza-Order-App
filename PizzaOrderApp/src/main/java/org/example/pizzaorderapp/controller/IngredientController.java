package org.example.pizzaorderapp.controller;

import org.example.pizzaorderapp.model.Ingredient;
import org.example.pizzaorderapp.service.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class IngredientController extends BaseController {

    private final IngredientService ingredientService;

    // Constructor for dependency injection
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    // Retrieve all ingredients
    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        List<Ingredient> ingredients = ingredientService.getAllIngredients();
        return ResponseEntity.ok(ingredients);  // 200 OK with list of ingredients
    }

    // Retrieve a specific ingredient by ID
    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        Optional<Ingredient> ingredient = ingredientService.findById(id);
        return ingredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());  // 200 OK or 404 Not Found
    }

    // Add a new ingredient
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Ingredient ingredient) {
        Ingredient createdIngredient = ingredientService.save(ingredient);
        return ResponseEntity.created(URI.create("/api/v1/ingredients/" + createdIngredient.getId())).body(createdIngredient);  // 201 Created
    }

    // Update an existing ingredient
    @PutMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredientDetails) {
        Optional<Ingredient> updatedIngredient = ingredientService.update(id, ingredientDetails);
        return updatedIngredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());  // 200 OK or 404 Not Found
    }

    // Delete an ingredient
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) {
        boolean isDeleted = ingredientService.delete(id);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();  // 200 OK or 404 Not Found
    }
}
