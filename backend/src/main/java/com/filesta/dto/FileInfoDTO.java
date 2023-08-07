package com.filesta.dto;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@Data
@XmlRootElement(name = "request")
public class FileInfoDTO {
    
    private String fileName;

    private String description;

    private Long userId;

}
