package com.app.changif.gif_in_folder;

import com.app.changif.folder.Folder;
import com.app.changif.gif.Gif;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="gifs_in_folder")
public class GifInFolder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_gif_in_folder;

    @ManyToOne
    private Gif id_gif;

    @ManyToOne
    private Folder id_folder;
}
