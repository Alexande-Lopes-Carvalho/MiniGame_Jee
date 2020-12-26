package net.app.main.model;

import javax.persistence.*;

@Entity
@Table(name="gamerank")
public class GameRank {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long idgamerank;
  @Column(name="playername")
  private String playername;
  @Column(name="gamename")
  private String gamename;
  @Column(name="score")
  private long score;
  @Column(name="time")
  private long time;


  public long getIdgamerank() {
    return idgamerank;
  }

  public void setIdgamerank(long idgamerank) {
    this.idgamerank = idgamerank;
  }


  public String getPlayername() {
    return playername;
  }

  public void setPlayername(String playername) {
    this.playername = playername;
  }


  public String getGamename() {
    return gamename;
  }

  public void setGamename(String gamename) {
    this.gamename = gamename;
  }


  public long getScore() {
    return score;
  }

  public void setScore(long score) {
    this.score = score;
  }


  public long getTime() {
    return time;
  }

  public void setTime(long time) {
    this.time = time;
  }

}