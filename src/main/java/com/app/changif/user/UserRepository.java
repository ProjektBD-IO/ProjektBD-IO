package com.app.changif.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where nickname=:username")
    User findByUsername(@Param("username")String username);

    @Query("select u from User u where mail=:usermail")
    User findByMail(@Param("usermail")String usermail);

    @Query("select u from User u where u.id_user=:id")
    User getById(@Param("id")Integer id);
}
