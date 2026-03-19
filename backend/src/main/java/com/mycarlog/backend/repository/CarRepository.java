package com.mycarlog.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mycarlog.backend.model.Car;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByUserId(Long userId);
}