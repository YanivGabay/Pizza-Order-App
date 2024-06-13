package org.example.pizzaorderapp.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for handling validation errors across the entire application.
 * <p>
 * This class uses {@link ControllerAdvice} to provide centralized exception handling for all controllers.
 * </p>
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation exceptions thrown when method arguments are not valid.
     * <p>
     * This method captures {@link MethodArgumentNotValidException} and extracts the validation error messages.
     * The errors are returned in a map with field names as keys and error messages as values.
     * </p>
     *
     * @param ex the exception thrown when method arguments are not valid
     * @return a {@code ResponseEntity} containing a map of field names and error messages
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
