package com.app.changif.like;

import com.app.changif.gif.Gif;
import com.app.changif.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import  lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "likes")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_like;

    @ManyToOne
    @JoinColumn(name="id_gif")
    @JsonIdentityReference(alwaysAsId = true)
    private Gif gif;

    @ManyToOne
    @JoinColumn(name="id_user")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;


    // getters and setters
}