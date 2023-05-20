package com.app.changif.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @GetMapping("/mail/{token}")
    public void emailConfirmation(@PathVariable String token) throws AccessDeniedException {
        emailService.confirmEmail(token);
    }
}
