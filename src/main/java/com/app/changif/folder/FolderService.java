package com.app.changif.folder;

import com.app.changif.user.User;
import com.app.changif.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class FolderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FolderRepository folderRepository;

    public ResponseEntity<?> addFolder(String name, Integer userId){
        User user = userRepository.getById(userId);
        Optional<Folder> tempFolder = folderRepository.findByName(name,userId);
        if(tempFolder.isPresent())
            throw new RuntimeException("Folder already exists");
        Folder folder = new Folder();
        folder.setName(name);
        folder.setId_user(user);
        folderRepository.save(folder);
        return ResponseEntity.ok().body("Folder created succesfully");
    }

    public ResponseEntity<?> editFolder(Integer folderId, String name, Integer userId){
        User user = userRepository.getById(userId);
        Optional<Folder> tempFolder = folderRepository.findById(folderId);
        if(!tempFolder.isPresent())
            return ResponseEntity.status(500).body("Folder doesn't exist");
        Folder folder = tempFolder.get();
        if(folder.getId_user().getId_user()!=user.getId_user())
            return ResponseEntity.status(500).body("This user do not own this folder");
        folder.setName(name);
        //TODO
        folderRepository.save(folder);
        return ResponseEntity.ok().body("Folder edited succesfully");
    }

    public ResponseEntity<?> delFolder(Integer folderId, Integer userId){
        User user = userRepository.getById(userId);
        Optional<Folder> tempFolder = folderRepository.findById(folderId);
        if(!tempFolder.isPresent())
            return ResponseEntity.status(500).body("Folder doesn't exist");
        Folder folder = tempFolder.get();
        if(folder.getId_user().getId_user()!=user.getId_user())
            return ResponseEntity.status(500).body("This user do not own this folder");
        //TODO

        return ResponseEntity.ok().body("Folder deleted succesfully");
    }

}
