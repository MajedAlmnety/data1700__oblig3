package com.example.billetter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public class BilletterRepository {
    private JdbcTemplate db;

    @Autowired
    public BilletterRepository(JdbcTemplate jdbcTemplate) {
        this.db = jdbcTemplate;
    }

    public void saveBillett(Billeter innBillett) {
        String sql = "INSERT INTO Billeter (film, antall, fornavn, etternavn, tlf, epost) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTlf(), innBillett.getEpost());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Billeter> listAlleBilletter() {

        String sql = "SELECT * FROM Billeter";
        return db.query(sql, (rs, rowNum) -> new Billeter(
                rs.getString("film"),
                rs.getInt("antall"),
                rs.getString("fornavn"),
                rs.getString("etternavn"),
                rs.getString("tlf"),
                rs.getString("epost")
        ));
    }


    public void deleteAllBilletter() {
        String sql = "DELETE FROM Billeter";
        try {
            db.update(sql);

        }catch (Exception e){
            System.out.println(e);
        }
    }


}
