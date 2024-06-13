package org.example.pizzaorderapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Abstract base controller that provides a common base route for all derived controllers.
 * This base route is "/api/v1".
 * 
 * <p>All controllers inheriting from this base controller will automatically 
 * have the base route applied to their request mappings.</p>
 * 
 * <p>Usage example:</p>
 * <pre>
 * &#64;RestController
 * public class PizzaController extends BaseController {
 *     &#64;RequestMapping("/pizzas")
 *     public List<Pizza> getPizzas() {
 *         // Handle the request
 *     }
 * }
 * </pre>
 * 
 * <p>In the example above, the final route will be "/api/v1/pizzas".</p>
 */
@RequestMapping("/api/v1")
public abstract class BaseController {
    // Classes will inherit this base route /api/v1
}
