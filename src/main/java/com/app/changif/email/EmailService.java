package com.app.changif.email;

import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.Objects;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    @Autowired
    UserRepository userRepository;


    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String receiver, String title, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(receiver);
        message.setSubject(title);
        message.setText(text);
        javaMailSender.send(message);
    }

    public Integer confirmEmail(String token) throws AccessDeniedException {
        Optional<User> tempUser = userRepository.getByToken(token);
        User user;
        if(tempUser.isPresent())
            user=tempUser.get();
        else
            return -1;
        if (!user.is_mail_confirmed()){
            user.set_mail_confirmed(true);
            userRepository.save(user);
            return 0;
        }
        return -1;
    }
}
