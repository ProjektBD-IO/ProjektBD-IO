package com.app.changif.folder;

import com.app.changif.gif_in_folder.GifInFolder;
import com.app.changif.user.User;
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
@Table(name="folders")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_folder;

    private String name;

    @ManyToOne
    private User id_user;

    @OneToMany(mappedBy = "id_folder")
    private Set<GifInFolder> gifInFolder = new HashSet<>();
}
