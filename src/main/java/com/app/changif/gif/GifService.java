package com.app.changif.gif;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import io.vavr.control.Option;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.Objects;

@Service
public class GifService {

    @Autowired
    private GifRepository gifRepository;

    public Gif checkPrivateAccess(Integer gifId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentNickname = authentication.getName();
        Gif gif = Option.ofOptional(gifRepository.findById(gifId))
                .getOrElseThrow(() -> new RuntimeException("Gif not found"));
        String gifOwnerNickname = gif.getCreator().getNickname();

        if (Objects.equals(currentNickname, gifOwnerNickname)) {
            return gif;
        }
        throw new AccessDeniedException("Dostep zablokowany: nie jestes wlascicielem gifa");
    }
}
