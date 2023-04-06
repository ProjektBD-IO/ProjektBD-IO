package com.app.changif.roles;

import com.app.changif.users.Users;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="roles")
public class Roles {
    @Id
    private Long id_role;
    @OneToMany(mappedBy = "id_role")
    private Set<Users> users=new HashSet<>();
    private String role_name;

    public Roles(Long id_role,String role_name){
        this.id_role=id_role;
        this.role_name=role_name;
    }
}
