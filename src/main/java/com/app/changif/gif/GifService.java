package com.app.changif.gif;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
import com.app.changif.category.Category;
import com.app.changif.category.CategoryController;
import com.app.changif.category.CategoryRepository;
import com.app.changif.like.Likes;
import com.app.changif.role.Role;
import com.app.changif.role.RoleRepository;
import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
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
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
public class GifService {

    @Autowired
    private GifRepository gifRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BanRepository banRepository;

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
            user.setId_user(parseInt(authentication.getPrincipal().toString()));
            List<Ban> bans = banRepository.getBansByUser(user.getId_user());
            if(bans.size()>0)
                return ResponseEntity.status(500).body("User is banned");
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
    public ResponseEntity<?> editGif(String category, String tags, String title, String gifType,Integer gifId, Integer userId) {
            Optional<Gif> optionalGif =  gifRepository.findById(gifId);
            Gif gif;
            if (optionalGif.isPresent())
                gif = optionalGif.get();
            else
                throw new IllegalArgumentException("gif with specified id doesn't exists");
            User user=userRepository.getById(userId);
            if(gif.getCreator().getId_user()!=userId)
                throw new IllegalArgumentException("no permission to delete someone's gif");

            List<Ban> bans = banRepository.getBansByUser(user.getId_user());
            if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");

            gif.setTags(tags);
            gif.setTitle(title);
            if(gifType.equals("true"))
                gif.setGifType(true);
            else
                gif.setGifType(false);
            Category cat=new Category();
            cat.setId_category(categoryRepository.findByName(category).getId_category());
            gif.setCategory(cat);
            gifRepository.save(gif);

            return ResponseEntity.ok().body("gif updated successfully");
    }

    public Gif getGif(Integer gifId) throws AccessDeniedException {
        Gif gif = Option.ofOptional(gifRepository.findById(gifId))
                .getOrElseThrow(() -> new RuntimeException("Gif not found"));

        if (!gif.isGifType()) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Integer currentId = parseInt(authentication.getName());

            Integer gifOwnerId = gif.getCreator().getId_user();

            if (Objects.equals(currentId, gifOwnerId)) {
                return gif;
            }
            throw new AccessDeniedException("Dostep zablokowany: nie jestes wlascicielem gifa");
        }
        return gif;
    }
    public ResponseEntity<?> deleteGif(Integer gifId, Integer userId) {

        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists");
        User user=userRepository.getById(userId);
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Role user_role=user.getId_role();
        if(gif.getCreator().getId_user()!=userId&&!user_role.getRoleName().equals("Admin"))
            return ResponseEntity.status(500).body("no permission to delete someone's gif");
        gif.setIfBanned(true);
        gifRepository.save(gif);
        return ResponseEntity.ok().body(gif.getId_gif());
    }

    public ResponseEntity<?> getUserGifs(Integer userId){
        List<Gif> gifs = gifRepository.getByUser(userId);
        return ResponseEntity.ok().body(gifs);
    }
}
