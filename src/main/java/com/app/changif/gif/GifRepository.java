package com.app.changif.gif;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GifRepository extends JpaRepository<Gif,Long> {

    @Query("select g from Gif g where g.tags like %:tag% and gifType=true and ifBanned=false")
    Page<Gif> findByTag(@Param("tag")String tag, Pageable pageable);

    @Query("select g from Gif g where g.id_gif = :id")
    Optional<Gif> findById(@Param("id")Integer id);
    @Query("select g  from Gif g where gifType=true and ifBanned=false")
    Page<Gif> getAll(Pageable pageable);

    //    @Query("select g, c.category_name from Gif g JOIN FETCH Category c on g.category=c.id_category where gifType=true order by addDate desc")
//    List<Gif> findAllWithCategory();
    @Query("select g from Gif g JOIN FETCH Category c on g.category=c.id_category where c.category_name = :cat and gifType=true and ifBanned=false")
    Page<Gif> findByCategory(@Param("cat")String cat, Pageable pageable);
}

