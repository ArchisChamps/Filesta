package com.filesta.repo;

import com.filesta.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

    @PersistenceContext
    EntityManager entityManager;
    
    @Transactional
    public void saveUser(User user) {
        entityManager.merge(user);
    }

    public List<User> getUserByEmail(String email) {
        return entityManager.createQuery("FROM User WHERE email=:email", User.class)
        .setParameter("email", email)
        .getResultList();
    }

    public User getUserById(Long userId) {
        return entityManager.find(User.class, userId);
    }
}