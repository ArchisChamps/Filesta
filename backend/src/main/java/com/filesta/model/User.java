package com.filesta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.Data;

@Data
@Entity
@Table(name = "user", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class User { 
    
    @Column(name = "pk_user_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkUserId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "hash")
    private String hash;

    @Column(name = "salt")
    private String salt;
    
    @Column(name = "country")
    private String country;

    @Column(name = "company")
    private String company;

    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "avatar")
    private String avatar;

    @Column(name = "is_deleted")
    private boolean isDeleted;

}
