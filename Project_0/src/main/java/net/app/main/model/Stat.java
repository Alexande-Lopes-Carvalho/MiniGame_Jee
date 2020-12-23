package net.app.main.model;

import javax.persistence.*;

@Entity
@Table(name="stat")
public class Stat {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long idstat;
  @Column(name="playername")
  private String playername;
  @Column(name="gamename")
  private String gamename;
  @Column(name="gameplayed")
  private long gameplayed;
  @Column(name="averagescore")
  private double averagescore;


  public long getIdstat() {
    return idstat;
  }

  public void setIdstat(long idstat) {
    this.idstat = idstat;
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


  public long getGameplayed() {
    return gameplayed;
  }

  public void setGameplayed(long gameplayed) {
    this.gameplayed = gameplayed;
  }


  public double getAveragescore() {
    return averagescore;
  }

  public void setAveragescore(double averagescore) {
    this.averagescore = averagescore;
  }

}
