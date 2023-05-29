package com.app.changif.folder;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Integer> {

    @Query("select f from Folder f where f.id_folder=:folderId")
    Optional<Folder> findById(@Param("folderId") Integer folderId);

    @Query("select f from Folder f join fetch User u on f.id_user=u.id_user where u.id_user=:userId")
    List<Folder> findByUserId(@Param("userId") Integer userId);

    @Query("select f from Folder f join fetch User u on u.id_user=f.id_user where u.id_user=:userId and f.name=:name")
    Optional<Folder> findByName(@Param("name") String name, @Param("userId") Integer userId);
}
