package com.example.taskmanager.model;

import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;

    // ✅ GETTERS
    public String getTitle() {
        return title;
    }


    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }
    public Long getId() {
        return id;
    }

    // ✅ SETTERS
    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}