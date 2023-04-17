package com.app.changif.like;

import com.app.changif.gif.Gif;
import com.app.changif.user.User;
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
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_like;

    @ManyToOne(fetch = FetchType.LAZY)
    private Gif gif;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    // getters and setters
}