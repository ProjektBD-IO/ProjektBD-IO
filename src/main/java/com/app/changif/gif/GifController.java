package com.app.changif.gif;

import com.app.changif.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GifController {

    @Autowired
    private GifService gifService;
}