package com.mycarlog.backend.controller;

import com.mycarlog.backend.model.ServiceRecord;
import com.mycarlog.backend.repository.ServiceRecordRepository;
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
}