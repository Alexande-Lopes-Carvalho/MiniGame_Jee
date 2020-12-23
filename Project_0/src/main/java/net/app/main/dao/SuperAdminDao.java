package net.app.main.dao;

import net.app.main.model.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperAdminDao extends JpaRepository<SuperAdmin, String> {
}
