package com.app.changif.like;

import com.app.changif.gif.GifService;
import com.app.changif.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("")
    public void like_gif(@RequestParam Integer id_gif, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        likeService.likeGif(id_gif, userId);
    }
}