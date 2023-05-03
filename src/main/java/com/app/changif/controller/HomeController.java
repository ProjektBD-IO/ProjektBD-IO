package com.app.changif.controller;

import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public Page<Gif> home(Principal principal, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 16);
        Page<Gif> gify=gifRepository.getAll(pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }

    @GetMapping("/search/tag/{tag}")
    public Page<Gif> tagsearch(@PathVariable String tag, Principal principal, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 16);
        Page<Gif> gify=gifRepository.findByTag(tag, pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }

    @GetMapping("/search/category/{cat}")
    public Page<Gif> categorysearch(@PathVariable String cat, Principal principal, @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, 16);
        Page<Gif> gify=gifRepository.findByCategory(cat, pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }
}
