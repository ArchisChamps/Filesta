package com.filesta.dto;

import java.util.List;

import lombok.Data;

@Data
public class ShareFileDTO {

    private Long fileId;

    private Long userId;

    private String receiverEmail;

    private List<String> shareType;
}
