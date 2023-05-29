package com.app.changif.report;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
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

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private GifRepository gifRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BanRepository banRepository;

    public ResponseEntity<?> addReport(Integer gifId, Integer userId) {
        List<Ban> bans = banRepository.getBansByUser(userId);
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Gif> optionalGif =  gifRepository.findById(gifId);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists");
        if (reportRepository.findByIds(gifId, userId).isPresent())
            return ResponseEntity.status(500).body("Report already exists");
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
