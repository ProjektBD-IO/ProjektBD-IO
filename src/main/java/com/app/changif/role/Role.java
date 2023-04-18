package com.app.changif.role;

import com.app.changif.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_role;

    @JsonIgnore
    @OneToMany(mappedBy = "id_role")
    private Set<User> users=new HashSet<>();

    @Column(name = "role_name")
    private String roleName;

    // getters and setters
}