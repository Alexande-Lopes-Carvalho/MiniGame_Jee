package net.app.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="game")
public class Game {
  @Id
  private String name;
  @Column(name="unitscore")
  private String unitscore;


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getUnitscore() {
    return unitscore;
  }

  public void setUnitscore(String unitscore) {
    this.unitscore = unitscore;
  }

}
