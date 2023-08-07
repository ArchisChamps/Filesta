package com.filesta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Date;

import org.hibernate.annotations.Where;

import lombok.Data;

@Data
@Entity
@Table(name = "file", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class File {
    
    @Column(name = "pk_file_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkFileId;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @JoinColumn(name = "unique_link")
    private String uniqueLink;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "file")
    private byte[] file;

    @Column(name = "size")
    private Long size;
    
    @Column(name = "uploaded_date")
    private Date uploadedDate;
    
    @Column(name = "is_deleted")
    private boolean isDeleted;
}
