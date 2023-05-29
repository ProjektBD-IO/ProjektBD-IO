package com.app.changif.gif_in_folder;

import com.app.changif.folder.Folder;
import com.app.changif.folder.FolderRepository;
import com.app.changif.gif.Gif;
import com.app.changif.gif.GifRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class GifInFolderService {
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private GifInFolderRepository gifInFolderRepository;
    @Autowired
    private GifRepository gifRepository;
    public ResponseEntity<?> getGfisFromFolder(Integer userid, Integer folderid){
        Optional<Folder> optional_folder=folderRepository.findByFolderId(folderid);
        Folder folder;
        if(optional_folder.isPresent())
            folder=optional_folder.get();
        else
            return ResponseEntity.status(500).body("Folder doesn't exist") ;
        if(folder.getId_user().getId_user()!=userid)
            return ResponseEntity.status(500).body("this user doesn't own this folder") ;
        return ResponseEntity.ok().body(gifInFolderRepository.getGifsByFolder(folderid));
    }
    public ResponseEntity<?> addGifToFolder(Integer userid, Integer folderid, Integer gifid){
        Optional<Gif> optionalGif =  gifRepository.findById(gifid);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists") ;
        Optional<Folder> optional_folder=folderRepository.findByFolderId(folderid);
        Folder folder;
        if(optional_folder.isPresent())
            folder=optional_folder.get();
        else
            return ResponseEntity.status(500).body("Folder doesn't exist") ;
        if(folder.getId_user().getId_user()!=userid)
            return ResponseEntity.status(500).body("this user doesn't own this folder");
        if(gif.getCreator().getId_user()!=userid)
            return ResponseEntity.status(500).body("this user doesn't own this gif");
        if(gifInFolderRepository.getGifInFolder(folderid,gifid).isPresent())
            return ResponseEntity.status(500).body("this gif already exists in this folder");
        GifInFolder gifinfolder=new GifInFolder();
        gifinfolder.setId_gif(gif);
        gifinfolder.setId_folder(folder);
        gifInFolderRepository.save(gifinfolder);
        return ResponseEntity.ok().body("gif added successfully");
    }
    public ResponseEntity<?> deleteGifFromFolder(Integer userid, Integer folderid, Integer gifid) {
        Optional<Gif> optionalGif =  gifRepository.findById(gifid);
        Gif gif;
        if (optionalGif.isPresent())
            gif = optionalGif.get();
        else
            return ResponseEntity.status(500).body("gif with specified id doesn't exists") ;
        Optional<Folder> optional_folder=folderRepository.findByFolderId(folderid);
        Folder folder;
        if(optional_folder.isPresent())
            folder=optional_folder.get();
        else
            return ResponseEntity.status(500).body("Folder doesn't exist") ;
        if(folder.getId_user().getId_user()!=userid)
            return ResponseEntity.status(500).body("this user doesn't own this folder");
        if(gif.getCreator().getId_user()!=userid)
            return ResponseEntity.status(500).body("this user doesn't own this gif");
        if(!gifInFolderRepository.getGifInFolder(folderid,gifid).isPresent())
            return ResponseEntity.status(500).body("this gif is not present in this folder");
        gifInFolderRepository.delete(gifInFolderRepository.getGifInFolder(folderid,gifid).get());
        return ResponseEntity.ok().body("gif deleted from folder successfully");
    }
}
