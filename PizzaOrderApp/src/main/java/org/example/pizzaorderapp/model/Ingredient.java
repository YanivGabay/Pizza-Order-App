package org.example.pizzaorderapp.model;

import jakarta.validation.constraints.*;

/**
 * Model class representing an ingredient.
 * <p>
 * This class includes validation constraints to ensure that ingredient details are provided correctly.
 * </p>
 */
public class Ingredient {
    private Long id;

    @NotBlank(message = "Ingredient name cannot be empty")
    private String name;
    
    private String imagePath;

    @Min(value = 0, message = "Price must be greater than 0")
    @NotNull(message = "Price cannot be empty")
    private Double price;

    /**
     * Constructs a new {@code Ingredient} with the specified details.
     *
     * @param id the unique identifier of the ingredient
     * @param name the name of the ingredient
     * @param imagePath the image path of the ingredient
     * @param price the price of the ingredient
     */
    public Ingredient(Long id, String name, String imagePath, Double price) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.price = price;
    }

    /**
     * Returns the unique identifier of the ingredient.
     *
     * @return the unique identifier of the ingredient
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the ingredient.
     *
     * @param id the unique identifier of the ingredient
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the name of the ingredient.
     *
     * @return the name of the ingredient
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the ingredient.
     *
     * @param name the name of the ingredient
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the image path of the ingredient.
     *
     * @return the image path of the ingredient
     */
    public String getImagePath() {
        return imagePath;
    }

    /**
     * Sets the image path of the ingredient.
     *
     * @param imagePath the image path of the ingredient
     */
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    /**
     * Returns the price of the ingredient.
     *
     * @return the price of the ingredient
     */
    public Double getPrice() {
        return price;
    }

    /**
     * Sets the price of the ingredient.
     *
     * @param price the price of the ingredient
     */
    public void setPrice(Double price) {
        this.price = price;
    }
}
