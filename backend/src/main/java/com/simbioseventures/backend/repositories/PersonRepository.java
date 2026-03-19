package com.simbioseventures.backend.repositories;

import com.simbioseventures.backend.entities.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PersonRepository extends JpaRepository<PersonEntity, Long> {
    boolean existsByEmail(String email);

    boolean existsByName(String name);
}
