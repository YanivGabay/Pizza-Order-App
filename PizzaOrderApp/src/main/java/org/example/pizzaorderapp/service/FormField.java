package org.example.pizzaorderapp.service;

/**
 * Class representing a form field.
 */
public class FormField {
    private final String fieldName;
    private final String fieldType;
    private final boolean required;

    /**
     * Constructs a new {@code FormField} with the specified details.
     *
     * @param fieldName the name of the form field
     * @param fieldType the type of the form field
     * @param required whether the form field is required
     */
    public FormField(String fieldName, String fieldType, boolean required) {
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.required = required;
    }

    /**
     * Returns the name of the form field.
     *
     * @return the name of the form field
     */
    public String getFieldName() {
        return fieldName;
    }

    /**
     * Returns the type of the form field.
     *
     * @return the type of the form field
     */
    public String getFieldType() {
        return fieldType;
    }

    /**
     * Returns whether the form field is required.
     *
     * @return {@code true} if the form field is required, {@code false} otherwise
     */
    public boolean isRequired() {
        return required;
    }
}
