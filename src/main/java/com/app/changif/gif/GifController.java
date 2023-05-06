package com.app.changif.gif;

import com.app.changif.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api")
public class GifController {

    @Autowired
    private GifService gifService;

    @GetMapping("/gif/{gifId}/**")
    public Gif getGif(@PathVariable Integer gifId) throws AccessDeniedException {
        return gifService.getGif(gifId);
    }
}