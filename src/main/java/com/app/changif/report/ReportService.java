package com.app.changif.report;

import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.like.LikeRepository;
import com.app.changif.like.Likes;
import com.app.changif.role.Role;
import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private GifRepository gifRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> addReport(Integer gifId, Integer userId) {

        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            throw new IllegalArgumentException("gif with specified id doesn't exists");
        if (reportRepository.findByIds(gifId, userId).isPresent())
            throw new IllegalArgumentException("Report already exists");
        User user = new User();
        user.setId_user(userId);
        Report report=new Report();
        report.setGif(gif);
        report.setApplicant(user);
        report.setChecked(false);
        reportRepository.save(report);
        return ResponseEntity.ok().body("report uploaded successfully");
    }
}
