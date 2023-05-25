package com.app.changif.report;

import com.app.changif.gif.Gif;
import com.app.changif.like.LikeService;
import com.app.changif.role.Role;
import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private UserRepository userRepository;
    @PostMapping
    public ResponseEntity<?> report(@RequestParam Integer id_gif, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return reportService.addReport(id_gif, userId);
    }
    @GetMapping("/get")
    public List<Gif> getReport(Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        User user=userRepository.getById(userId);
        Role user_role=user.getId_role();
        if(!user_role.getRoleName().equals("Admin"))
            throw new IllegalArgumentException("only admin allowed");
        List<Object[]> results=reportRepository.getAll();
        List<Gif> gifs= new ArrayList<>();
        for (Object[] result : results) {
            Gif gif = (Gif) result[0];
            if(!gif.isIfBanned()&&gif.isGifType()) {
                int reportCount = ((Number) result[1]).intValue();
                gif.setReportCount(reportCount);
                gifs.add(gif);
            }
        }
        gifs.sort((g1, g2) -> Integer.compare(g2.getReportCount(), g1.getReportCount()));
        return gifs;
    }
}