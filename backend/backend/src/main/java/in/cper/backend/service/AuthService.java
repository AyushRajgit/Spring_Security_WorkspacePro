package in.cper.backend.service;

import in.cper.backend.dto.AuthResponse;
import in.cper.backend.dto.LoginRequest;
import in.cper.backend.dto.RegisterRequest;
import in.cper.backend.entity.CustomUserDetailsEntity;
import in.cper.backend.repository.UserRepository;
import in.cper.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public void register(RegisterRequest registerRequest) {
        Optional<CustomUserDetailsEntity> user = userRepository.findByEmail(registerRequest.getEmail());
        if (user.isPresent()) {
            throw new UsernameNotFoundException("Email is already registered!");
        }

        CustomUserDetailsEntity newUser = new CustomUserDetailsEntity();

        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setRole(registerRequest.getRole() != null? registerRequest.getRole(): "ROLE_USER");

        userRepository.save(newUser);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication unverifiedAuthObj = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
        Authentication verifiedAuthObj = authenticationManager.authenticate(unverifiedAuthObj);

        UserDetails userDetails = (UserDetails) verifiedAuthObj.getPrincipal();

        String token = jwtTokenProvider.generateToken(userDetails);

        return new AuthResponse(token);
    }
}
