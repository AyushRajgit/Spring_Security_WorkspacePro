package in.cper.backend.controller;

import in.cper.backend.dto.AuthResponse;
import in.cper.backend.dto.LoginRequest;
import in.cper.backend.dto.RegisterRequest;
import in.cper.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        // returning exception if user already registered
        authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Registered Successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(authResponse);
    }
}
