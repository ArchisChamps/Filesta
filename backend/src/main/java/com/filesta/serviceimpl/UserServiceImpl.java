package com.filesta.serviceimpl;

import java.util.List;
import java.util.Objects;

import com.filesta.dto.LoginDTO;
import com.filesta.dto.SessionDTO;
import com.filesta.dto.SignupDTO;
import com.filesta.dto.UserDTO;
import com.filesta.model.User;
import com.filesta.repo.UserDao;
import com.filesta.service.UserService;
import com.filesta.util.PasswordHelper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private static Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    private PasswordHelper passwordHelper;

    @Autowired
    private UserDao userDao;

    @Override
    public SessionDTO login(LoginDTO loginDTO) {
        LOGGER.debug("Inside login method: " + loginDTO.toString());
        SessionDTO sessionDTO = new SessionDTO();
        try {
            List<User> userList = userDao.getUserByEmail(loginDTO.getEmail());
            if (userList.isEmpty()) {
                sessionDTO.setMessage("Invalid email address");
                return sessionDTO;
            }
            User user = userList.get(0);
            String existingHash = user.getHash();
            String existingSalt = user.getSalt();

            byte[] newHash = passwordHelper.getHashWithSalt(loginDTO.getPassword(),
                    passwordHelper.stringToByte(existingSalt));
            String newHashStr = passwordHelper.byteToString(newHash);

            if (existingHash.equals(newHashStr)) {
                sessionDTO.setId(user.getPkUserId());
                sessionDTO.setToken(passwordHelper.byteToString(passwordHelper.generateSalt()));
                sessionDTO.setUserName(user.getName());
                sessionDTO.setMessage("Logged in Successfully");
            } else {
                sessionDTO.setMessage("Please check your password");
            }

        } catch (Exception e) {
            LOGGER.error("Exception from login method: ", e);
            sessionDTO.setMessage("Unexpected error occured!");
        }
        return sessionDTO;
    }

    @Override
    public void logout(String username, String password) {

    }

    @Override
    public String signUp(SignupDTO signUpDTO) {
        LOGGER.info("Inside signup method: " + signUpDTO);
        try {
            User user = new User();
            user.setName(signUpDTO.getName());
            user.setEmail(signUpDTO.getEmail());
            byte[] saltArr = passwordHelper.generateSalt();
            String salt = passwordHelper.byteToString(saltArr);
            user.setSalt(salt);
            byte[] hashArr = passwordHelper.getHashWithSalt(signUpDTO.getPassword(), saltArr);
            String hash = passwordHelper.byteToString(hashArr);
            user.setHash(hash);
            userDao.saveUser(user);
            return "Success";
        } catch (Exception e) {
            LOGGER.error("Exception from signup method: ", e);
        }
        return "Error";
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userDao.getUserById(id);
        if (Objects.isNull(user)) {
            LOGGER.error("User not found: " + id);
            return null;
        }

        UserDTO userDto = new UserDTO();
        BeanUtils.copyProperties(user, userDto);
        userDto.setUserId(id);

        return userDto;
    }

    @Override
    public String uploadAvatar(String avatar, Long id) {
        try {
            User user = userDao.getUserById(id);
            if (Objects.isNull(user)) {
                LOGGER.error("User not found: " + id);
                return "User not found";
            }
            user.setAvatar(avatar);
            userDao.saveUser(user);
        } catch (Exception e) {
            return "Failed to upload avatar";
        }
        return "Success";
    }

    @Override
    public String updateUser(UserDTO userDTO) {
        User user = userDao.getUserById(userDTO.getUserId());
        user.setCompany(userDTO.getCompany());
        user.setCountry(userDTO.getCountry());
        user.setName(userDTO.getName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        userDao.saveUser(user);
        return "Success";
    }

}