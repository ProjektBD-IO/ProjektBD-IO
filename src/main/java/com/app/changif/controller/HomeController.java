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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

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
    public Page<Gif> home(Principal principal, @RequestParam("page") int page, @RequestParam(name="sort", required = false, defaultValue = "addDate desc")String sort) {
        Pageable pageable;
        switch (sort) {
            case "title asc" : pageable= PageRequest.of(page, 16, Sort.by("title").ascending());break;
            case "title desc" : pageable= PageRequest.of(page, 16, Sort.by("title").descending());break;
            case "addDate asc" : pageable= PageRequest.of(page, 16, Sort.by("addDate").ascending());break;
            default : pageable= PageRequest.of(page, 16, Sort.by("addDate").descending());
        };
        Page<Gif> gify=gifRepository.getAll(pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }

    @GetMapping("/search/tag/{tag}")
    public Page<Gif> tagsearch(@PathVariable String tag, Principal principal, @RequestParam("page") int page, @RequestParam(name="sort", required = false, defaultValue = "addDate desc")String sort) {
        Pageable pageable;
        switch (sort) {
            case "title asc" : pageable= PageRequest.of(page, 16, Sort.by("title").ascending());break;
            case "title desc" : pageable= PageRequest.of(page, 16, Sort.by("title").descending());break;
            case "addDate asc" : pageable= PageRequest.of(page, 16, Sort.by("addDate").ascending());break;
            default : pageable= PageRequest.of(page, 16, Sort.by("addDate").descending());
        };
        Page<Gif> gify=gifRepository.findByTag(tag, pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }

    @GetMapping("/search/category/{cat}")
    public Page<Gif> categorysearch(@PathVariable String cat, Principal principal, @RequestParam("page") int page, @RequestParam(name="sort", required = false, defaultValue = "addDate desc")String sort) {
        Pageable pageable;
        switch (sort) {
            case "title asc" : pageable= PageRequest.of(page, 16, Sort.by("title").ascending());break;
            case "title desc" : pageable= PageRequest.of(page, 16, Sort.by("title").descending());break;
            case "addDate asc" : pageable= PageRequest.of(page, 16, Sort.by("addDate").ascending());break;
            default : pageable= PageRequest.of(page, 16, Sort.by("addDate").descending());
        };
        Page<Gif> gify=gifRepository.findByCategory(cat, pageable);
        if(principal!=null)
            for (Gif gif : gify)
                gif.setLikedByCurrentUser(Integer.parseInt(principal.getName()));
        return gify;
    }
}
