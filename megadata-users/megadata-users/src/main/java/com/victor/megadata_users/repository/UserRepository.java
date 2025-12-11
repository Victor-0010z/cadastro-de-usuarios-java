package com.victor.megadata_users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.victor.megadata_users.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}

