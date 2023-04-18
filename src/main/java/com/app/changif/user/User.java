package com.app.changif.user;

import com.app.changif.gif.Gif;
import com.app.changif.role.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;

    @JsonIgnore
    @OneToMany(mappedBy = "creator")
    private Set<Gif> gifs=new HashSet<>();
    @JsonIgnore
    private String mail;
    @JsonIgnore
    private String password;

    private String nickname;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role id_role;

    // getters and setters
}