package com.cardash.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.cardash.backend.repository.CarRepository;
import com.cardash.backend.repository.UserRepository;
import com.cardash.backend.model.Car;
import com.cardash.backend.model.User;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    // Получить все машины пользователя
    @GetMapping
    public List<Car> getCars(@RequestParam Long userId) {
        return carRepository.findByUser_Id(userId);
    }

    // Добавить новую машину
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        User user = userRepository.findById(car.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        car.setUser(user);
        return carRepository.save(car);
    }

    // Обновить машину
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carData) {
        return carRepository.findById(id).map(car -> {
            car.setName(carData.getName());
            car.setBrand(carData.getBrand());
            car.setModel(carData.getModel());
            car.setLicensePlate(carData.getLicensePlate());
            car.setVin(carData.getVin());
            return ResponseEntity.ok(carRepository.save(car));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Удалить машину
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        if (!carRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        carRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}