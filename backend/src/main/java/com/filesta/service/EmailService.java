package com.filesta.service;

import com.filesta.dto.ShareLinkDTO;

public interface EmailService {

    public String sendEmail(ShareLinkDTO request);
    
}
