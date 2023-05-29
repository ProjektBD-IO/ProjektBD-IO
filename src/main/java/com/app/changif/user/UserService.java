package com.app.changif.user;

import com.app.changif.ban.BanRepository;
import com.app.changif.role.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.h2.schema.UserAggregate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.cert.Extension;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    @PersistenceContext
    private final EntityManager entityManager;
    private List<GrantedAuthority> authorities;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private final BanRepository banRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException(username);
        TypedQuery<Role> query = entityManager.createQuery("select r from Role r JOIN FETCH User u on u.id_role=r.id_role where u.id_user=:userId", Role.class);
        query.setParameter("userId", user.getId_user());
        authorities = query.getResultList().stream().map(r -> new SimpleGrantedAuthority(r.getRoleName())).collect(Collectors.toList());
        return new MyUserPrincipal(user, authorities,banRepository);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    @Transactional
    public Integer register(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        if (userRepository.findByMail(user.getMail()) != null) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        if (userRepository.findByUsername(user.getNickname()) != null) {
            throw new IllegalArgumentException("User with this nickname already exists");
        }
        Role role=new Role();
        role.setId_role(2);
        user.setId_role(role);
        save(user);
        return user.getId_user();
    }
}
