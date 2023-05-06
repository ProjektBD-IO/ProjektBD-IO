package com.app.changif.gif;

import com.app.changif.category.CategoryController;
import com.app.changif.category.CategoryRepository;
import com.app.changif.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import io.vavr.control.Option;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Objects;

@Service
public class GifService {

    @Autowired
    private GifRepository gifRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public ResponseEntity<?> addGif(MultipartFile file, String category, String tags, String title, Boolean gifType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get("uploads/" + file.getOriginalFilename());
            Files.write(path, bytes);

            Gif gif = new Gif();
            gif.setReflink(file.getOriginalFilename());
            gif.setCreator((User) authentication.getPrincipal());
            gif.setTags(tags);
            gif.setTitle(title);
            gif.setGifType(gifType);
            gif.setIfBanned(false);
            gif.setAddDate(new Date());
            gif.setCategory(categoryRepository.findByName(category));
            gifRepository.save(gif);

            return ResponseEntity.ok().body("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public Gif getGif(Integer gifId) throws AccessDeniedException {
        Gif gif = Option.ofOptional(gifRepository.findById(gifId))
                .getOrElseThrow(() -> new RuntimeException("Gif not found"));

        if (!gif.isGifType()) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentNickname = authentication.getName();

            String gifOwnerNickname = gif.getCreator().getNickname();

            if (Objects.equals(currentNickname, gifOwnerNickname)) {
                return gif;
            }
            throw new AccessDeniedException("Dostep zablokowany: nie jestes wlascicielem gifa");
        }
        return gif;
    }
}
