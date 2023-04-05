package com.app.changif.gif;

import com.app.changif.category.Categories;
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
    @JoinColumn(name = "id_category")
    private Categories id_category;
    private Date add_date;
    private String title;
    private Boolean type;
    public Gif(Long id,String reflink, String tags, Long id_creator, Date data, String title, Boolean type) {
        this.id_gif=id;
        this.reflink = reflink;
        this.tags = tags;
        this.id_creator = id_creator;
        this.add_date = data;
        this.title = title;
        this.type = type;
    }
}
