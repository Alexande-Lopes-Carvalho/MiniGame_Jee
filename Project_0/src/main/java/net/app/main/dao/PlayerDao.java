package net.app.main.dao;

import net.app.main.model.Player;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerDao extends JpaRepository<Player, String> {
    List<Player> findAllByOrderByPlayernameAsc(Pageable pageable);
}
