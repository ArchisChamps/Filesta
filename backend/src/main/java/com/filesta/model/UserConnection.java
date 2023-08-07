package com.filesta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.Data;

@Data
@Entity
@Table(name = "user_connection", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class UserConnection {
    
    @Column(name = "pk_user_connection_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkUserConnectionId;
    
    @ManyToOne
    @JoinColumn(name = "fk_user_id_one")
    private User userOne;

    @ManyToOne
    @JoinColumn(name = "fk_user_id_two")
    private User userTwo;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
