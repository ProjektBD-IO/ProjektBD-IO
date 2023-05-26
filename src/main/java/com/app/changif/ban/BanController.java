package com.app.changif.ban;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class BanController {

    @Autowired
    private BanService banService;

    @PostMapping("/ban")
    public ResponseEntity<?> banUser(@RequestParam("gifId") Integer gifId,
                                     @RequestParam(value = "banNote", required = false, defaultValue = "Naruszenie regulaminu.") String banNote,
                                     @RequestParam("expirationDate") String expirationDate,
                                     Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return banService.banUser(gifId,banNote,expirationDate,userId);
    }
    @PostMapping("/ban/admin")
    public ResponseEntity<?> banUserWithoutReport(@RequestParam("gifId") Integer gifId,
                                     @RequestParam(value = "banNote", required = false, defaultValue = "Naruszenie regulaminu.") String banNote,
                                     @RequestParam("expirationDate") String expirationDate,
                                     Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return banService.banUserWithoutReport(gifId,banNote,expirationDate,userId);
    }
    @PostMapping("/ban/ignore")
    public ResponseEntity<?> ignoreReports(@RequestParam("gifId") Integer gifId,
                                     Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return banService.ignoreReports(gifId,userId);
    }
}