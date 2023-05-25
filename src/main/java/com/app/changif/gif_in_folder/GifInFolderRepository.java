package com.app.changif.gif_in_folder;

import com.app.changif.ban.Ban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GifInFolderRepository extends JpaRepository<GifInFolder, Integer> {

}
