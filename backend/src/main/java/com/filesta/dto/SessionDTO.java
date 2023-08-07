package com.filesta.dto;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@Data
@XmlRootElement(name = "user")
public class SessionDTO {
    
    private String token;

    private String message;

    private Long id;

    private String userName;
    
}