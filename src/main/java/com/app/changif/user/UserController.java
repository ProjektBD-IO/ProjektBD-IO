package com.app.changif.user;

import com.app.changif.email.EmailService;
import com.app.changif.email.GenerateToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private GenerateToken generateToken;
    @Autowired
    private EmailService emailService;

    @PostMapping("/services/controller/user")
    public Integer register(@RequestBody User user){
        String token = generateToken.createToken();
        String confirmationUrl = "http://localhost:8888/mail/" + token;
        user.setMail_token(token);
        emailService.sendEmail(user.getMail(),"IO potwierdzenie mailowe","By potwierdzic maila kliknij: " + confirmationUrl);
        return userService.register(user);
    }
}