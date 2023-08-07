package com.filesta.service;

import com.filesta.dto.LoginDTO;
import com.filesta.dto.SessionDTO;
import com.filesta.dto.SignupDTO;
import com.filesta.dto.UserDTO;

public interface UserService {
    
    public SessionDTO login(LoginDTO loginDTO);

    public void logout(String username, String password);

    public String signUp(SignupDTO signUpDTO);

    public UserDTO getUserById(Long id);

    public String uploadAvatar(String avatar, Long id);

    public String updateUser(UserDTO userDTO);
}