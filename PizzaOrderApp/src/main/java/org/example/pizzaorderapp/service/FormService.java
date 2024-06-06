package org.example.pizzaorderapp.service;

import org.example.pizzaorderapp.model.CustomerInfo;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


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

@Service
public class FormService {
    public List<FormField> getFormFields() {
        List<FormField> fields = new ArrayList<>();
        fields.add(new FormField("firstName", "text", true));
        fields.add(new FormField("lastName", "text", true));
        fields.add(new FormField("address", "text", true));
        fields.add(new FormField("phoneNumber", "text", true));
        return fields;
    }
}
