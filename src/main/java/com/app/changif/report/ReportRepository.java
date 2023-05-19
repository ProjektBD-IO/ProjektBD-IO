package com.app.changif.report;

import com.app.changif.ban.Ban;
import com.app.changif.gif.Gif;
import com.app.changif.like.Likes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Query("select r from Report r JOIN FETCH Gif g on g.id_gif=r.gif JOIN FETCH User u on u.id_user=r.applicant where g.id_gif = :idGif and u.id_user=:idUser")
    Optional<Report> findByIds(@Param("idGif")Integer idGif, @Param("idUser")Integer idUser);

    @Query("SELECT g, COUNT(r.id_report) as report_count FROM Report r JOIN r.gif g WHERE r.checked = false GROUP BY g")
    List<Object[]> getAll();
}
