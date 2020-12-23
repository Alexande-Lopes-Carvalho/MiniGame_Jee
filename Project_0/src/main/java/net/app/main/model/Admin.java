package net.app.main.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="admin")
public class Admin {
  @Id
  private String adminname;


  public String getAdminname() {
    return adminname;
  }

  public void setAdminname(String adminname) {
    this.adminname = adminname;
  }

}
