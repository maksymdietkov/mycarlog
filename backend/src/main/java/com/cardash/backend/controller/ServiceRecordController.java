package com.cardash.backend.controller;

import com.cardash.backend.model.ServiceRecord;
import com.cardash.backend.repository.ServiceRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class ServiceRecordController {

    private final ServiceRecordRepository repo;

    public ServiceRecordController(ServiceRecordRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<ServiceRecord> getRecords(@RequestParam Long carId) {
        return repo.findByCarIdOrderByDateDesc(carId);
    }

    @PostMapping
    public ServiceRecord addRecord(@RequestBody ServiceRecord record) {
        // Дефолты
        if (record.getCurrency() == null || record.getCurrency().isEmpty()) {
            record.setCurrency("USD");
        }

        if (record.getMileageUnit() == null || record.getMileageUnit().isEmpty()) {
            record.setMileageUnit("km");
        }

        return repo.save(record);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceRecord> updateRecord(@PathVariable Long id, @RequestBody ServiceRecord data) {
        return repo.findById(id).map(rec -> {
            rec.setDate(data.getDate());
            rec.setMileage(data.getMileage());

            // ✅ фикс мили/км
            rec.setMileageUnit(
                    data.getMileageUnit() != null ? data.getMileageUnit() : "km"
            );

            rec.setCost(data.getCost());

            // ✅ фикс валюты
            rec.setCurrency(
                    data.getCurrency() != null ? data.getCurrency() : "USD"
            );

            rec.setDescription(data.getDescription());
            rec.setServiceStation(data.getServiceStation());
            rec.setNotes(data.getNotes());

            return ResponseEntity.ok(repo.save(rec));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}