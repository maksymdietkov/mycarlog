package com.mycarlog.backend.controller;

import com.mycarlog.backend.model.User;
import com.mycarlog.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Получить всех пользователей (для теста)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Создать пользователя (временно, пока нет OAuth)
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Получить пользователя по ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}