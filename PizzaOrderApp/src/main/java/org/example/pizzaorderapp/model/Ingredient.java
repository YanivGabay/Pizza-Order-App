package org.example.pizzaorderapp.model;
import jakarta.validation.constraints.*;



public class Ingredient {
    private Long id;

    @NotBlank(message = "Ingredient name cannot be empty")
    private String name;
    
    private String imagePath;

    @Min(value = 0, message = "Price must be greater than 0")
    @NotBlank(message = "Price cannot be empty")
    private Double price;

    public Ingredient(Long id, String name, String imagePath, Double price) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
