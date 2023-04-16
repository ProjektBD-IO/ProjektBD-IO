package com.app.changif.category;

import com.app.changif.ban.Ban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Ban, Integer> {
}
