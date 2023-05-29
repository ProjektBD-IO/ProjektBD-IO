package com.app.changif.folder;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
import com.app.changif.gif_in_folder.GifInFolder;
import com.app.changif.gif_in_folder.GifInFolderRepository;
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

    @Autowired
    private GifInFolderRepository gifInFolderRepository;

    @Autowired
    private BanRepository banRepository;

    public ResponseEntity<?> getFolders(Integer userId){
        User user = userRepository.getById(userId);
        List<Folder> folders = folderRepository.findByUserId(user.getId_user());
         return ResponseEntity.ok().body(folders);
    }

    public ResponseEntity<?> addFolder(String name, Integer userId){
        User user = userRepository.getById(userId);
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Folder> tempFolder = folderRepository.findByName(name,userId);
        if(tempFolder.isPresent())
            return ResponseEntity.status(500).body("Folder already exists");
        Folder folder = new Folder();
        folder.setName(name);
        folder.setId_user(user);
        folderRepository.save(folder);
        return ResponseEntity.ok().body("Folder created succesfully");
    }

    public ResponseEntity<?> editFolder(Integer folderId, String name, Integer userId){
        User user = userRepository.getById(userId);
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Folder> tempFolder = folderRepository.findByFolderId(folderId);
        if(!tempFolder.isPresent())
            return ResponseEntity.status(500).body("Folder doesn't exist");
        Folder folder = tempFolder.get();
        if(folder.getId_user().getId_user()!=user.getId_user())
            return ResponseEntity.status(500).body("This user do not own this folder");
        Optional<Folder> tempFolder2 = folderRepository.findByName(name,userId);
        if(tempFolder2.isPresent())
            return ResponseEntity.status(500).body("Folder with this name already exists");
        folder.setName(name);
        folderRepository.save(folder);
        return ResponseEntity.ok().body("Folder edited succesfully");
    }

    public ResponseEntity<?> delFolder(Integer folderId, Integer userId){
        User user = userRepository.getById(userId);
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        if(bans.size()>0)
            return ResponseEntity.status(500).body("User is banned");
        Optional<Folder> tempFolder = folderRepository.findByFolderId(folderId);
        if(!tempFolder.isPresent())
            return ResponseEntity.status(500).body("Folder doesn't exist");
        Folder folder = tempFolder.get();
        if(folder.getId_user().getId_user()!=user.getId_user())
            return ResponseEntity.status(500).body("This user do not own this folder");
        List<GifInFolder> gifInFolderList = gifInFolderRepository.getGifsInFolderByFolder(folder.getId_folder());
        for(GifInFolder gif:gifInFolderList)
            gifInFolderRepository.delete(gif);
        folderRepository.delete(folder);
        return ResponseEntity.ok().body("Folder deleted succesfully");
    }

}
