package com.app.changif.report;

import com.app.changif.gif.Gif;
import com.app.changif.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_report;

    @ManyToOne
    @JoinColumn(name="id_aplicant")
    @JsonIdentityReference(alwaysAsId = true)
    private User applicant;

    @ManyToOne
    @JoinColumn(name="id_gif")
    @JsonIdentityReference(alwaysAsId = true)
    private Gif gif;

    private boolean checked;

    // getters and setters
}