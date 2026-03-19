package com.mycarlog.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // nickname (ВАЖНО для UX)

    private String brand;

    private String model;

    private String licensePlate;

    private String vin;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}