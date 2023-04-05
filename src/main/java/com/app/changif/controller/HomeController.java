package com.app.changif.controller;

import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

    private GifRepository gifRepository;
    @Autowired
    public HomeController(GifRepository gifService) {
        this.gifRepository = gifService;
    }

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("dane",gifRepository.findAllWithCategory());
        return "index";
    }
    @GetMapping("/search/tag/{tag}")
    public String tagsearch(@PathVariable String tag, Model model){
        model.addAttribute("dane",gifRepository.findByTag(tag));
        return "index";
    }
    @GetMapping("/search/category/{cat}")
    public String categorysearch(@PathVariable String cat, Model model){
        model.addAttribute("dane",gifRepository.findByCategory(cat));
        return "index";
    }
}
