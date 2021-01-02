package net.app.main.dao;

import net.app.main.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameDao extends JpaRepository<Game, String> {
    default boolean scoringMode(String name){
        return getOne(name).getUnitscore().equals("p"); // true => les meilleurs score sont les plus grand
    }
}
