package com.filesta.dto;

import javax.xml.bind.annotation.XmlRootElement;

import lombok.Data;

@Data
@XmlRootElement(name = "request")
public class LoginDTO {
    
    private String email;

    private String password;

}