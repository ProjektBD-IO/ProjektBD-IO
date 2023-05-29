package com.app.changif.gif_in_folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/gifs_in_folder")
public class GifInFolderController {
    @Autowired
    private  GifInFolderService gifInFolderService;

    @GetMapping("/search/{folderid}")
    public ResponseEntity<?> foldersearch(@PathVariable Integer folderid, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return gifInFolderService.getGfisFromFolder(userId, folderid);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addtofolder(@RequestParam("id_folder") Integer folder_id, @RequestParam("id_gif") Integer gif_id, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return gifInFolderService.addGifToFolder(userId, folder_id, gif_id);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deletegiffromfolder(@RequestParam("id_folder") Integer folder_id, @RequestParam("id_gif") Integer gif_id, Principal principal) {
        Integer userId=Integer.parseInt(principal.getName());
        return gifInFolderService.deleteGifFromFolder(userId,folder_id,gif_id);
    }
}
