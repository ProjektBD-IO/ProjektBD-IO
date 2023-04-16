package com.app.changif.users;

import com.app.changif.roles.Roles;
import com.app.changif.users.Users;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UsersService implements UserDetailsService {
    @Autowired
    private final UsersRepository usersRepository;

    @PersistenceContext
    private final EntityManager entityManager;
    private List<GrantedAuthority> authorities;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Users user = usersRepository.findByUsername(username);
        if(user==null)
            throw new UsernameNotFoundException(username);
        TypedQuery<Roles> query = entityManager.createQuery("select r from Roles r JOIN FETCH Users u on u.id_role=r.id_role where u.id_user=:userId",Roles.class);
        query.setParameter("userId",user.getId_user());
        authorities=query.getResultList().stream().map(r->new SimpleGrantedAuthority(r.getRole_name())).collect(Collectors.toList());
        return new MyUsersPrincipal(user,authorities);
}
public void save(Users user){
    usersRepository.save(user);
    }
}
