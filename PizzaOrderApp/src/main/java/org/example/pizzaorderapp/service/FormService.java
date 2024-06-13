package org.example.pizzaorderapp.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class responsible for providing form fields.
 */
@Service
public class FormService {

    /**
     * Returns a list of form fields required for the customer information form.
     *
     * @return a list of {@link FormField} objects
     */
    public List<FormField> getFormFields() {
        List<FormField> fields = new ArrayList<>();
        fields.add(new FormField("firstName", "text", true));
        fields.add(new FormField("lastName", "text", true));
        fields.add(new FormField("address", "text", true));
        fields.add(new FormField("phoneNumber", "phoneNumber", true));

        return fields;
    }
}
