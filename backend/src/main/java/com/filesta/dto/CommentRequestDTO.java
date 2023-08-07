package com.filesta.dto;

import lombok.Data;

@Data
public class CommentRequestDTO {

    private Long userId;

    private String commentBody;

    private String fileLink;
}
