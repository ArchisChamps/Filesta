package com.filesta.dto;

import lombok.Data;

@Data
public class CommentDTO {

    private Long id;

    private String username;

    private String commentBody;
}
