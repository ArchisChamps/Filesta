package com.filesta.serviceimpl;

import com.filesta.dto.ShareLinkDTO;
import com.filesta.service.EmailService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceImpl implements EmailService {

    private static Logger LOGGER = LogManager.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public String sendEmail(ShareLinkDTO shareLinkDTO) {
        LOGGER.debug("Sending email to " + shareLinkDTO.getReceiver());
        try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(shareLinkDTO.getReceiver());
        message.setSubject("File shared with you");
        message.setText(shareLinkDTO.getSender() + " has shared a file with you. \n\nClick on the link to open the file " + shareLinkDTO.getLink());
        javaMailSender.send(message);
        return "Success";
        } catch (Exception e) {
            LOGGER.error("Exception while sending email:: ", e);
        }
        return "Failed";
    }
}