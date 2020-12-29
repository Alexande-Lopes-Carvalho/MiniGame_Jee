package net.app.main.dao;

import net.app.main.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, String> {
    User findOneByMail(String mail);
    boolean existsByMail(String mail);
}
