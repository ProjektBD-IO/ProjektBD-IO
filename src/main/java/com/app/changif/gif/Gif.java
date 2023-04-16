package com.app.changif.gif;

import com.app.changif.category.Category;
import com.app.changif.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="gifs")
public class Gif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_gif;

    private String reflink;

    @ManyToOne(fetch = FetchType.LAZY)
    private User creator;

    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @Column(name = "add_date")
    private Date addDate;

    private String title;

    @Column(name = "gif_type")
    private boolean gifType;

    @Column(name = "if_banned")
    private boolean ifBanned;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category id_category;

//    public Gif(Long id,String reflink, String tags, Long id_creator, Date data, String title, Boolean type) {
//
//        this.id_gif=id;
//        this.reflink = reflink;
//        this.tags = tags;
//        this.creator = id_creator;
//        this.add_date = data;
//        this.title = title;
//        this.type = type;
//    }
}
