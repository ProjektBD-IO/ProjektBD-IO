package com.app.changif.user;

import com.app.changif.ban.Ban;
import com.app.changif.ban.BanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

public class MyUserPrincipal implements UserDetails {
    private final User user;
    private final List<GrantedAuthority> authorities;

    @Autowired
    private BanRepository banRepository;

    public MyUserPrincipal(User user, List<GrantedAuthority> authorities, BanRepository banRepository){
        this.user=user;
        this.authorities=authorities;
        this.banRepository=banRepository;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return authorities;
    }
    public User getUser(){
        return user;
    }
    public Integer getUserId(){
        return user.getId_user();
    }
    @Override
    public String getPassword(){
        return user.getPassword();
    }
    @Override
    public String getUsername(){
        return user.getNickname();
    }
    public String getUserRoleName(){
        return user.getId_role().getRoleName();
    }
    public String getMail(){
        return user.getMail();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isBanned(){
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        return bans.size()>0;
    }
    public Date banExpiration(){
        List<Ban> bans = banRepository.getBansByUser(user.getId_user());
        if(isBanned())
            return bans.get(0).getExpirationDate();
        else
            return new Date(0,0,0,0,0,0);
    }

    public boolean isMailConfirmed(){
        return user.is_mail_confirmed();
    }
}
