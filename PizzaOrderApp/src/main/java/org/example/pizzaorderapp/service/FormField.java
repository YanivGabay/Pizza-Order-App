package org.example.pizzaorderapp.service;

public class FormField {
    private String fieldName;
    private String fieldType;
    private boolean required;

    public FormField(String fieldName, String fieldType, boolean required) {
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.required = required;
    }

    
}
