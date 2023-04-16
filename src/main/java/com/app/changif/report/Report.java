package com.app.changif.report;

import com.app.changif.gif.Gif;
import com.app.changif.user.User;
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

    @ManyToOne(fetch = FetchType.LAZY)
    private User applicant;

    @ManyToOne(fetch = FetchType.LAZY)
    private Gif gif;

    private boolean checked;

    // getters and setters
}