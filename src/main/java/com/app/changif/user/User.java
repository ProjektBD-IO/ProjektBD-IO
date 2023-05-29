package com.app.changif.user;

import com.app.changif.ban.Ban;
import com.app.changif.folder.Folder;
import com.app.changif.gif.Gif;
import com.app.changif.like.Likes;
import com.app.changif.report.Report;
import com.app.changif.role.Role;
import com.fasterxml.jackson.annotation.*;
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
    @JsonIgnore
    private Set<Gif> gifs=new HashSet<>();

    private String mail;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String nickname;

    @Column(name="token_mail")
    private String mail_token;
    private boolean is_mail_confirmed;
    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role id_role;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Likes> likes = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "applicant")
    private Set<Report> reports = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "id_user")
    private Set<Folder> folders = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "applicant")
    private Set<Ban> bans = new HashSet<>();
}