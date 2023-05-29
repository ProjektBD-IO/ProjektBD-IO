package com.app.changif.like;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private  GifRepository gifRepository;
    @Autowired
    private BanRepository  banRepository;

    public void save(Likes like) {
        likeRepository.save(like);
    }
    public void daleteLike(Likes like) {
        likeRepository.delete(like);
    }
    @Transactional
    public ResponseEntity<?> likeGif(Integer gifId, Integer userId) {
        List<Ban> bans = banRepository.getBansByUser(userId);
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists");
        if (likeRepository.findByIds(gifId, userId).isPresent())
            return ResponseEntity.status(500).body("Like already exists");
        User user = new User();
        user.setId_user(userId);
        Likes like = new Likes();
        like.setGif(gif);
        like.setUser(user);
        save(like);
        return ResponseEntity.ok().body(like.getId_like());
    }

    public ResponseEntity<?> dislikeGif(Integer gifId, Integer userId) {
        List<Ban> bans = banRepository.getBansByUser(userId);
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        Optional<Likes> optionalLike;
        Likes like;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists");
        optionalLike=likeRepository.findByIds(gifId,userId);
        if (optionalLike.isPresent())
            like=optionalLike.get();
        else
            return ResponseEntity.status(500).body("Like doesn't exists");
        daleteLike(like);
        return ResponseEntity.ok().body(like.getId_like());
    }

}

