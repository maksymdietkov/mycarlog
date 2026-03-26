package com.cardash.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cardash.backend.model.Car;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByUser_Id(Long userId);
}