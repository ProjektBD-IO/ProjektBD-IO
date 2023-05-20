package com.app.changif.email;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GenerateToken {

    public String createToken(){
        return UUID.randomUUID().toString();
    }
}

