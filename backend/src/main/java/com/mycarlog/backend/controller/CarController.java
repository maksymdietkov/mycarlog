package com.mycarlog.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.mycarlog.backend.repository.CarRepository;
import com.mycarlog.backend.repository.UserRepository;
import com.mycarlog.backend.model.Car;
import com.mycarlog.backend.model.User;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository; // Для загрузки существующего пользователя

    // Получить все машины пользователя
    @GetMapping
    public List<Car> getCars(@RequestParam Long userId) {
        return carRepository.findByUser_Id(userId);
    }

    // Добавить новую машину
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        // Подгружаем пользователя из базы
        User user = userRepository.findById(car.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        car.setUser(user);

        // Сохраняем машину
        return carRepository.save(car);
    }
}