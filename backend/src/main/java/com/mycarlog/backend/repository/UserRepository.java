package com.mycarlog.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mycarlog.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {}