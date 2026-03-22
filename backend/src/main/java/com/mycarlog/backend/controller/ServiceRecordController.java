package com.mycarlog.backend.controller;

import com.mycarlog.backend.model.ServiceRecord;
import com.mycarlog.backend.repository.ServiceRecordRepository;
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
        return repo.save(record);
    }

    // Обновить запись
    @PutMapping("/{id}")
    public ResponseEntity<ServiceRecord> updateRecord(@PathVariable Long id, @RequestBody ServiceRecord data) {
        return repo.findById(id).map(rec -> {
            rec.setDate(data.getDate());
            rec.setMileage(data.getMileage());
            rec.setCost(data.getCost());
            rec.setDescription(data.getDescription());
            rec.setServiceStation(data.getServiceStation());
            rec.setNotes(data.getNotes());
            return ResponseEntity.ok(repo.save(rec));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Удалить запись
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}