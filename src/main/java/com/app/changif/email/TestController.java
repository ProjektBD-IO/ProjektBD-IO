package com.app.changif.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final JavaMailSender javaMailSender;

    public TestController(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @GetMapping("/mailtest")
    public String sendTestMail(){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("oskarspamowanie@gmail.com");
        message.setSubject("test mail");
        message.setText("tekst");
        javaMailSender.send(message);
        return "sent";

    }
}
