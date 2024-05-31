package org.example.pizzaorderapp.controller;

import org.example.pizzaorderapp.model.Ingredient;
import org.example.pizzaorderapp.service.IngredientService;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class IngredientController extends BaseController {

    private final IngredientService ingredientService;

    // Constructor for dependency injection
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/ingredients")
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }
}
