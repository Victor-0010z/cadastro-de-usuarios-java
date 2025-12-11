package com.victor.megadata_users.service;

import org.springframework.stereotype.Service;
import com.victor.megadata_users.repository.UserRepository;
import com.victor.megadata_users.model.User;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo){
        this.repo = repo;
    }

    public User save(User user){
        return repo.save(user);
    }

    public List<User> findAll(){
        return repo.findAll();
    }

    public User findById(Long id){
        return repo.findById(id).orElse(null);
    }

    public User update(Long id, User newData) {
        User user = repo.findById(id).orElse(null);

        if (user == null)
            return null;

        user.setName(newData.getName());
        user.setEmail(newData.getEmail());
        if (newData.getPassword() != null && !newData.getPassword().isBlank()) {
            user.setPassword(newData.getPassword());
        }

        return repo.save(user);
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id))
            return false;

        repo.deleteById(id);
        return true;
    }
}
