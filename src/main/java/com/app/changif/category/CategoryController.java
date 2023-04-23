package com.app.changif.category;

import com.app.changif.ban.BanService;
import com.app.changif.gif.Gif;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;
    @GetMapping("/all")
    public List<Category> getcategories() {
        return categoryRepository.getAll();
    }
}