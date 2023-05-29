package com.app.changif.gif_in_folder;

import com.app.changif.ban.Ban;
import com.app.changif.gif.Gif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GifInFolderRepository extends JpaRepository<GifInFolder, Integer> {
    @Query("select g.id_gif from GifInFolder g JOIN FETCH Folder f on g.id_folder=f.id_folder join Gif gif on g.id_gif=gif.id_gif where f.id_folder=:folder and gif.ifBanned=false")
    List<Gif> getGifsByFolder(@Param("folder") Integer folder);

    @Query("select g from GifInFolder g JOIN FETCH Folder f on g.id_folder=f.id_folder JOIN FETCH Gif gif on g.id_gif=gif.id_gif where f.id_folder=:folder and gif.id_gif=:gifid")
    Optional<GifInFolder> getGifInFolder(@Param("folder") Integer folder, @Param("gifid") Integer gifid);

    @Query("select g from GifInFolder g JOIN FETCH Folder f on g.id_folder=f.id_folder where f.id_folder=:folder")
    List<GifInFolder> getGifsInFolderByFolder(@Param("folder") Integer folder);
}
