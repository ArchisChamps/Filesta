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
@Table(name = "view_access", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class ViewAccess {
    
    @Column(name = "pk_view_access_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkUserConnectionId;
    
    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "fk_file_id")
    private File file;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
