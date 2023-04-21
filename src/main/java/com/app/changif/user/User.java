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

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;
    @OneToMany(mappedBy = "creator")
    private Set<Gif> gifs=new HashSet<>();
    private String mail;
    private String password;
    private String nickname;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role id_role;
}