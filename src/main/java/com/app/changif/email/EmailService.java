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

    public void confirmEmail(String token) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.getById(parseInt(authentication.getName()));
        String currentUserToken = user.getMail_token();
        if(Objects.equals(currentUserToken, token) && !user.is_mail_confirmed()){
            user.set_mail_confirmed(true);
            userRepository.save(user);
            return;
        }
        throw new AccessDeniedException("Cos poszlo nie tak, twoj token jest nieprawidlowy lub zostal juz potwierdzony");
    }
}
