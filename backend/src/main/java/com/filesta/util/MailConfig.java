// package com.spotdraft.filesta.util;

// import java.util.Properties;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.JavaMailSenderImpl;

// @Configuration
// public class MailConfig {

//     @Bean
//     public JavaMailSender javaMailSender() {
//         JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//         mailSender.setHost("smtp.gmail.com");
//         mailSender.setPort(587);
//         mailSender.setUsername("archischamps@gmail.com");
//         mailSender.setPassword("ntyxartaslmqhiwo");
//         Properties props = mailSender.getJavaMailProperties();
//         props.put("mail.smtp.starttls.enable", "true");
//         return mailSender;
//     }
// }
