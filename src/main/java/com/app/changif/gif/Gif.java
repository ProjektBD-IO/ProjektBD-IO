package com.app.changif.gif;

import com.app.changif.category.Category;
import com.app.changif.like.Likes;
import com.app.changif.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name="id_creator")
    @JsonIdentityReference(alwaysAsId = true)
    private User creator;

    private String tags;

    @ManyToOne
    @JoinColumn(name="id_category")
    @JsonIdentityReference(alwaysAsId = true)
    private Category category;

    @Column(name = "add_date")
    private Date addDate;

    private String title;

    @Column(name = "gif_type")
    private boolean gifType;

    @JsonIgnore
    @OneToMany(mappedBy = "gif")
    private Set<Likes> likes = new HashSet<>();


    @Column(name = "if_banned")
    private boolean ifBanned;

    @Transient
    private Long likeCount;
    private Long getLikeCount(){
        return (long) likes.size();
    }

//    @ManyToOne
//    @JoinColumn(name = "id_category")
//
//    private Category id_category;


//    private Categories id_category;
//    private Date add_date;
//    private String title;
//    private Boolean gif_type;
//    private Boolean if_banned;
//    public Gif(Integer id_gif,String reflink, String tags, User creator, Date data, String title, Boolean gifType,Boolean ifBanned) {
//        this.id_gif=id_gif;
//        this.reflink = reflink;
//        this.tags = tags;
//        this.creator = creator;
//        this.addDate = data;
//        this.title = title;
//        this.gifType = gifType;
//        this.ifBanned=ifBanned;
//    }
}
