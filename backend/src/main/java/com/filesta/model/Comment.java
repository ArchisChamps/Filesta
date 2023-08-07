package com.filesta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.Date;

import org.hibernate.annotations.Where;

import lombok.Data;

@Data
@Entity
@Table(name = "comment", schema = "filesta")
@Where(clause = "is_deleted = 0")
public class Comment {
    
    @Column(name = "pk_comment_id")
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long pkCommentId;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @Column(name = "comment_body")
    private String commentBody;

    @Column(name = "comment_date")
    private Date commentDate;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
