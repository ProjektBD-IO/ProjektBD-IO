package com.app.changif.ban;

import com.app.changif.report.Report;
import com.app.changif.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bans")
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_ban;


    @ManyToOne
    @JoinColumn(name = "id_aplicant")
    private User applicant;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "ban_note")
    private String banNote;

    @JsonIgnore
    @OneToMany(mappedBy = "ban")
    private Set<Report> reports = new HashSet<>();

    // getters and setters
}