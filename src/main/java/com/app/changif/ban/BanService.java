package com.app.changif.ban;

import com.app.changif.ban.BanRepository;
import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import com.app.changif.report.Report;
import com.app.changif.report.ReportRepository;
import com.app.changif.role.Role;
import com.app.changif.role.RoleRepository;
import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BanService {

    @Autowired
    private BanRepository banRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private GifRepository gifRepository;

    public ResponseEntity<?> banUser(Integer gifId, String banNote, String expirationDate,Integer userId){
        User admin=userRepository.getById(userId);
        Role adminRole=admin.getId_role();
        if(!adminRole.getRoleName().equals("Admin"))
            throw new RuntimeException("No admin privilage. Access denied.");
        List<Report> reports = reportRepository.getListById(gifId);
        if(reports.size()<=0)
            throw new IllegalArgumentException("report doesn't exists");
        Gif gif = gifRepository.findById(gifId).get();
        User user = userRepository.getById(gif.getCreator().getId_user());
        LocalDateTime localDateTime = LocalDateTime.parse(expirationDate);
        Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Ban ban = new Ban();
        ban.setApplicant(user);
        ban.setExpirationDate(date);
        ban.setBanNote(banNote);
        banRepository.save(ban);
        gif.setIfBanned(true);
        gifRepository.save(gif);
        for(Report report:reports){
            report.setBan(ban);
            report.setChecked(true);
            reportRepository.save(report);
        }
        return ResponseEntity.ok().body("User banned");
    }

}