package com.app.changif.category;

import com.app.changif.ban.Ban;
import com.app.changif.gif.Gif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("select c from Category c")
    List<Category> getAll();

    Category findByName(String name);

}
