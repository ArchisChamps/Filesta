package com.filesta.dto;

import java.util.Date;

import lombok.Data;

@Data
public class FileDTO {

    private Long id;

    private String filename;

    private Date uploadedDate;

    private String uniqueLink;
    
}
