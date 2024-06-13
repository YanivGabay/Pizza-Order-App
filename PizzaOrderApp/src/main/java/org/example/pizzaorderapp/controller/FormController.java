package org.example.pizzaorderapp.controller;

import org.example.pizzaorderapp.service.FormService;
import org.example.pizzaorderapp.service.FormField;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller that handles requests related to the form structure.
 * <p>
 * This controller extends {@link BaseController}, inheriting the base route "/api/v1".
 * </p>
 */
@RestController
public class FormController extends BaseController {

    private final FormService formService;

    /**
     * Constructs a new {@code FormController} with the specified {@link FormService}.
     *
     * @param formService the form service to be used by this controller
     */
    public FormController(FormService formService) {
        this.formService = formService;
    }

    /**
     * Endpoint to retrieve the structure of the form.
     * <p>
     * This method handles GET requests to "/api/v1/form-structure" and returns a list of form fields.
     * </p>
     *
     * @return a {@code ResponseEntity} containing the list of form fields
     */
    @GetMapping("/form-structure")
    public ResponseEntity<List<FormField>> getFormStructure() {
        List<FormField> fields = formService.getFormFields();
        return ResponseEntity.ok(fields);
    }
}
