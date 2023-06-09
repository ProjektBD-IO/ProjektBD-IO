package com.app.changif.security;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
import com.app.changif.user.MyUserPrincipal;
import com.app.changif.user.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.app.changif.security.SecurityConstants.EXPIRATION_TIME;
import static com.app.changif.security.SecurityConstants.SECRET;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;

        setFilterProcessesUrl("/api/services/controller/user/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException{
        try{
            User creds = new ObjectMapper().readValue(req.getInputStream(),User.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getNickname(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        }
        catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res,
                                                   FilterChain chain, Authentication authentication) throws IOException{
        String token = JWT.create()
                .withSubject(((MyUserPrincipal) authentication.getPrincipal()).getUserId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET.getBytes()));

        String username = ((MyUserPrincipal) authentication.getPrincipal()).getUsername();
        String userrole = ((MyUserPrincipal) authentication.getPrincipal()).getUserRoleName();
        Integer userId = ((MyUserPrincipal) authentication.getPrincipal()).getUserId();
        Boolean ifBanned = ((MyUserPrincipal) authentication.getPrincipal()).isBanned();
        Date banExpiration = ((MyUserPrincipal) authentication.getPrincipal()).banExpiration();
        Boolean isMailConfirmed = ((MyUserPrincipal) authentication.getPrincipal()).isMailConfirmed();

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("username", username);
        jsonResponse.put("user_id", userId);
        jsonResponse.put("user_role", userrole);
        jsonResponse.put("ifBanned",ifBanned);
        jsonResponse.put("banExpiration",banExpiration);
        jsonResponse.put("isMailConfirmed",isMailConfirmed);
        jsonResponse.put("token", token);

        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.getWriter().write(jsonResponse.toString());
        res.getWriter().flush();
    }
}
