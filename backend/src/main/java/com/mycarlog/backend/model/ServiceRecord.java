package com.mycarlog.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "service_records")
public class ServiceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private LocalDate date;
    private Integer mileage;
    private Double cost;
    private String description;
    private String serviceStation;
    private String notes;

    @Column(nullable = false)
    private String currency = "USD";

    @Column(nullable = false)
    private String mileageUnit = "km";
}