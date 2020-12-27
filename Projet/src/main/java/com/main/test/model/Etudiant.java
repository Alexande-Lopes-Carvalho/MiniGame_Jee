package com.main.test.model;

import javax.persistence.*;

@Entity
@Table(name = "etudiant")
public class Etudiant {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long idEtudiant;
  @Column(name = "nom")
  private String nom;
  @Column(name= "prenom")
  private String prenom;
  @Column(name = "classe")
  private String classe;
  @Column(name = "age")
  private long age;


  public long getIdEtudiant() {
    return idEtudiant;
  }

  public void setIdEtudiant(long idEtudiant) {
    this.idEtudiant = idEtudiant;
  }


  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }


  public String getPrenom() {
    return prenom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }


  public String getClasse() {
    return classe;
  }

  public void setClasse(String classe) {
    this.classe = classe;
  }


  public long getAge() {
    return age;
  }

  public void setAge(long age) {
    this.age = age;
  }

}
