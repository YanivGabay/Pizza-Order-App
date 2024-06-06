package org.example.pizzaorderapp.controller;

import org.example.pizzaorderapp.model.CustomerInfo;
import org.example.pizzaorderapp.service.FormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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
