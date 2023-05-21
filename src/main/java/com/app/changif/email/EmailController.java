package com.app.changif.email;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;
import java.nio.file.AccessDeniedException;

@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @GetMapping("/mail/{token}")
    public ResponseEntity<String> emailConfirmation(@PathVariable String token) throws AccessDeniedException {
        String url="http://localhost:3000/?redirect=1";
        if(emailService.confirmEmail(token)==0) {
            return ResponseEntity.status(HttpStatus.FOUND).header("Location",url).body("przekierowanie");
        }
        else{
            url+="&error=1";
            return ResponseEntity.status(HttpStatus.FOUND).header("Location",url).body("przekierowanie");
        }

    }
}
