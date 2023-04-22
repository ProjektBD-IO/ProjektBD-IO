package com.app.changif.controller;

import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class HomeController {

    private GifRepository gifRepository;

    @Autowired
    public HomeController(GifRepository gifService) {
        this.gifRepository = gifService;
    }

    @GetMapping("/")
    public List<Gif> home() {
        return gifRepository.getAll();
    }

    @GetMapping("/search/tag/{tag}")
    public List<Gif> tagsearch(@PathVariable String tag) {
        return gifRepository.findByTag(tag);
    }

    @GetMapping("/search/category/{cat}")
    public List<Gif> categorysearch(@PathVariable String cat) {
        return gifRepository.findByCategory(cat);
    }
}
