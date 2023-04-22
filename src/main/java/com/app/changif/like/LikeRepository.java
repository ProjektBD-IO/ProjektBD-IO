package com.app.changif.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Integer> {
    @Query("select l from Likes l JOIN FETCH Gif g on g.id_gif=l.gif JOIN FETCH User u on u.id_user=l.user where g.id_gif = :idGif and u.id_user=:idUser")
    Optional<Likes> findByIds(@Param("idGif")Integer idGif, @Param("idUser")Integer idUser);

}
