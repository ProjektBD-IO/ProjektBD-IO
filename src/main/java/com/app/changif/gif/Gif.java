package com.app.changif.gif;

import com.app.changif.category.Categories;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Gifs")
public class Gif {
    @Id
    private Long id_gif;
    private String reflink;
    private Long id_creator;
    private String tags;
    @ManyToOne
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_category")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "id_category")
    private Categories id_category;
    private Date add_date;
    private String title;
    private Boolean gif_type;
    private Boolean if_banned;
    public Gif(Long id,String reflink, String tags, Long id_creator, Date data, String title, Boolean type,Boolean if_banned) {
        this.id_gif=id;
        this.reflink = reflink;
        this.tags = tags;
        this.id_creator = id_creator;
        this.add_date = data;
        this.title = title;
        this.gif_type = type;
        this.if_banned=if_banned;
    }
}
