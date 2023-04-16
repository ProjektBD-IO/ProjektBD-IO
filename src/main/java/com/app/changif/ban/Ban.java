package com.app.changif.ban;

import com.app.changif.report.Report;
import com.app.changif.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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

    @ManyToOne(fetch = FetchType.LAZY)
    private Report report;

    @ManyToOne(fetch = FetchType.LAZY)
    private User applicant;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "ban_note")
    private String banNote;

    // getters and setters
}