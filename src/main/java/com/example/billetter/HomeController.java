package com.example.billetter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private BilletterRepository rep;

    @PostMapping("/save_data")
    public void lagreKunde(Billeter innBillett){
        rep.saveBillett(innBillett);
    }

    @GetMapping("/list_data")

    public List<Billeter> hentAlle(){
        return rep.listAlleBilletter();
    }

    @GetMapping("/delete_data")
    public void slettAlle(){
        rep.deleteAllBilletter();
    }


}
