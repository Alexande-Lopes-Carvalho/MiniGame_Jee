package net.app.main.dao;

import net.app.main.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerDao extends JpaRepository<Player, String> {
}
