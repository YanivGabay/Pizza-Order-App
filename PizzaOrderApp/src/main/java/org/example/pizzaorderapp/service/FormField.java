package org.example.pizzaorderapp.service;

public class FormField {
    private final String fieldName;
    private final String fieldType;
    private final boolean required;

    public FormField(String fieldName, String fieldType, boolean required) {
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.required = required;
    }

    public String getFieldName() {
        return fieldName;
    }
    public String getFieldType() {
        return fieldType;
    }
    public boolean isRequired() {
        return required;
    }
}
