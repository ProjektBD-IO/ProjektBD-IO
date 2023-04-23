package com.app.changif.user;

import com.app.changif.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/services/controller/user")
    public Integer register(@RequestBody User user){
        return userService.register(user);
    }
}