package com.app.changif.gif;

import com.app.changif.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.AccessDeniedException;
import java.security.Principal;

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
                                    @RequestParam("gifType") String gifType) {
        return gifService.addGif(file, category, tags, title, gifType);
    }
    @DeleteMapping("/delete/{gifId}")
    public Integer deleteGif(@PathVariable Integer gifId, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return gifService.deleteGif(gifId,userId);
    }
    @PutMapping("/edit/{gifId}")
    public ResponseEntity<?> editGif(@PathVariable Integer gifId,
                                     @RequestParam("category") String category,
                                    @RequestParam("tags") String tags,
                                    @RequestParam("title") String title,
                                    @RequestParam("gifType") String gifType,
                                     Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return gifService.editGif(category, tags, title, gifType,gifId, userId);
    }

    @GetMapping("/{gifId}/**")
    public Gif getGif(@PathVariable Integer gifId) throws AccessDeniedException {
        return gifService.getGif(gifId);
    }
}