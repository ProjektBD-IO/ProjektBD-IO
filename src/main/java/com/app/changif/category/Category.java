package com.app.changif.category;

import com.app.changif.gif.Gif;
import jakarta.persistence.*;
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
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_category;

    @OneToMany(mappedBy = "category")
    private Set<Gif> gifs = new HashSet<>();

    private String category_name;

    public Category(Integer id_category, String category_name) {
        this.id_category = id_category;
        this.category_name=category_name;
    }
}
