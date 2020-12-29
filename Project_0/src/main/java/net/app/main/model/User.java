package net.app.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name="user")
public class User {
  @Id
  private String name;
  @Column(name="mail")
  private String mail;
  @Column(name="password")
  private String password;


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getMail() {
    return mail;
  }

  public void setMail(String mail) {
    this.mail = mail;
  }


  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
