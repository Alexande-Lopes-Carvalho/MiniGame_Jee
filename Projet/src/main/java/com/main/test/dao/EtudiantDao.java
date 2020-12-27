package com.main.test.dao;


import com.main.test.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.bind.Element;

public interface EtudiantDao extends JpaRepository<Etudiant, Long> {
}


