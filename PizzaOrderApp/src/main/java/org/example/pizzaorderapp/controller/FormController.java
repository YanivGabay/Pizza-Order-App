package org.example.pizzaorderapp.controller;


import org.example.pizzaorderapp.service.FormService;
import org.springframework.http.ResponseEntity;

import org.example.pizzaorderapp.service.FormField;     // Ensure this is correctly imported

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;  // Import for using List



@RestController
public class FormController {

    private final FormService formService;

    public FormController(FormService formService) {
        this.formService = formService;
    }

    @GetMapping("/form-structure")
    public ResponseEntity<List<FormField>> getFormStructure() {
        List<FormField> fields = formService.getFormFields();
        return ResponseEntity.ok(fields);
    }
}
