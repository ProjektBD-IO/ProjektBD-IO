package com.app.changif.gif;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GifRepository extends JpaRepository<Gif,Long> {
    @Query("select g from Gif g where g.tags like %:tag% and gif_type=true order by add_date desc")
    List<Gif> findByTag(@Param("tag")String tag);
    @Query("select g from Gif g where gif_type=true order by add_date desc")
    List<Gif> getAll();
    //@Query("select g, c.category_name from Gif g JOIN FETCH Categories c on g.id_category=c.id_category where gif_type=true order by add_date desc")
    //List<Gif> findAllWithCategory();
    @Query("select g, c.category_name from Gif g JOIN FETCH Categories c on g.id_category=c.id_category where c.category_name = :cat and gif_type=true order by add_date desc")
    List<Gif> findByCategory(@Param("cat")String cat);
}

