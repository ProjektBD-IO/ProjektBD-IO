package com.app.changif.folder;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/folder")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping("/add")
    public ResponseEntity<?> addFolder(@RequestParam("name") String name,Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return folderService.addFolder(name,userId);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editFolder(@RequestParam("folderId") Integer folderId,@RequestParam("name") String name, Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return folderService.editFolder(folderId,name,userId);
    }

    @DeleteMapping("/del")
    public ResponseEntity<?> delFolder(@RequestParam("folderId") Integer folderId, Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return folderService.delFolder(folderId,userId);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getFolders(Principal principal){
        Integer userId = Integer.parseInt(principal.getName());
        return folderService.getFolders(userId);
    }
}
