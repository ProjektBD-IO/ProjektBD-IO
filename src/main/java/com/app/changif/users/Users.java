package com.app.changif.users;

import com.app.changif.roles.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class Users {
    @Id
    private Long id_user;
    private String mail;
    private String password;
    private String nickname;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private Roles id_role;
    public Users(Long id_user,String mail,String password,String nickname){
        this.id_user=id_user;
        this.mail=mail;
        this.password=password;
        this.nickname=nickname;

    }
}
