package com.app.changif.gif;

import com.app.changif.category.Category;
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
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Objects;

@Service
public class GifService {

    @Autowired
    private GifRepository gifRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public ResponseEntity<?> addGif(MultipartFile file, String category, String tags, String title, String gifType) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            byte[] bytes = file.getBytes();
            Path currentWorkingDir = Paths.get("").toAbsolutePath();

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyyyyHHmmssSSS");
            String formattedDate = now.format(formatter);

            String filePath=formattedDate+file.getOriginalFilename();
            Path path = Paths.get("src/main/resources/static/images/" + filePath);
            Files.write(path, bytes);

            Gif gif = new Gif();
            gif.setReflink("/images/"+filePath);
            User user = new User();
            user.setId_user(Integer.parseInt(authentication.getPrincipal().toString()));
            gif.setCreator(user);
            gif.setTags(tags);
            gif.setTitle(title);
            if(gifType.equals("true"))
                gif.setGifType(true);
            else
                gif.setGifType(false);
            gif.setIfBanned(false);
            gif.setAddDate(new Date());
            Category cat=new Category();
            cat.setId_category(categoryRepository.findByName(category).getId_category());
            gif.setCategory(cat);
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
