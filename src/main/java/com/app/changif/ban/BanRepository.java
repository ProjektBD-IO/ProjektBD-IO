package com.app.changif.ban;

import com.app.changif.like.LikeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BanRepository extends JpaRepository<Ban, Integer> {

    @Query("select b from Ban b join User u on u.id_user=b.applicant where b.expirationDate>CURRENT_TIMESTAMP and u.id_user=:userId order by b.expirationDate desc")
    List<Ban> getBansByUser(@Param("userId") Integer userId);
}
