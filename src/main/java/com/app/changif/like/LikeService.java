package com.app.changif.like;

import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private  GifRepository gifRepository;

    public void save(Likes like) {
        likeRepository.save(like);
    }
    @Transactional
    public void likeGif(Integer gifId, Integer userId) {

        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            throw new IllegalArgumentException("gif with specified id doesn't exists");
        if (likeRepository.findByIds(gifId, userId).isPresent())
            throw new IllegalArgumentException("Like already exists");
        User user = new User();
        user.setId_user(userId);
        Likes like = new Likes();
        like.setGif(gif);
        like.setUser(user);
        save(like);
    }

}

