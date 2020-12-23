package net.app.main.dao;

import net.app.main.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameDao extends JpaRepository<Game, String> {
}
