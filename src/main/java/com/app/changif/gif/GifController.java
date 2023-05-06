package com.app.changif.gif;

import com.app.changif.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/gif")
public class GifController {

    @Autowired
    private GifService gifService;

    @PostMapping
    public ResponseEntity<?> addGif(@RequestParam("file") MultipartFile file,
                                    @RequestParam("category") String category,
                                    @RequestParam("tags") String tags,
                                    @RequestParam("title") String title,
                                    @RequestParam("gif_type") Boolean gifType) {
        return gifService.addGif(file, category, tags, title, gifType);
    }

    @GetMapping("/{gifId}/**")
    public Gif getGif(@PathVariable Integer gifId) throws AccessDeniedException {
        return gifService.getGif(gifId);
    }
}