package com.app.changif.like;

import com.app.changif.gif.GifService;
import com.app.changif.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/like")
    public Integer like_gif(@RequestParam Integer id_gif, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return likeService.likeGif(id_gif, userId);
    }
    @PostMapping("/dislike")
    public Integer dislike_gif(@RequestParam Integer id_gif, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return likeService.dislikeGif(id_gif, userId);
    }
}