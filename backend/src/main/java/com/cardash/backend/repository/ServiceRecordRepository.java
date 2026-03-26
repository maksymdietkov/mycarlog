package com.cardash.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cardash.backend.model.ServiceRecord;
import java.util.List;

public interface ServiceRecordRepository extends JpaRepository<ServiceRecord, Long> {
    List<ServiceRecord> findByCarIdOrderByDateDesc(Long carId);
}