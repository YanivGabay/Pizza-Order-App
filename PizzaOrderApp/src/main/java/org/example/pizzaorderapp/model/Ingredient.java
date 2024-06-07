package org.example.pizzaorderapp.model;
import jakarta.validation.constraints.*;



public class Ingredient {
    private Long id;

    @NotBlank(message = "Ingredient name cannot be empty")
    private String name;
    
    private String imagePath;

    public Ingredient(Long id, String name, String imagePath) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }

    // Getters and Setters
    public Long getId() {
        return id;
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
