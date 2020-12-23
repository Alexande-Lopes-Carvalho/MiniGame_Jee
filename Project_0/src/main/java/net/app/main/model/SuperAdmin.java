package net.app.main.model;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="superadmin")
public class SuperAdmin {
  @Id
  private String superadminname;


  public String getSuperadminname() {
    return superadminname;
  }

  public void setSuperadminname(String superadminname) {
    this.superadminname = superadminname;
  }

}
