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
@Table(name = "map_comment_file", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class MapCommentFile {
    
    @Column(name = "pk_map_file_comment_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkMapFileCommentId;
    
    @ManyToOne
    @JoinColumn(name = "fk_file_id")
    private File file;

    @ManyToOne
    @JoinColumn(name = "fk_comment_id")
    private Comment comment;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
