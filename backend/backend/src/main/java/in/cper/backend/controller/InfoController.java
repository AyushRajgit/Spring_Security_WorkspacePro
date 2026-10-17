package in.cper.backend.controller;

import in.cper.backend.dto.FreshHireRequestDTO;
import in.cper.backend.entity.FreshHireEntity;
import in.cper.backend.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    private final InfoService infoService;

    @Autowired
    public InfoController(InfoService infoService) {
        this.infoService = infoService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'EMPLOYEE')")
    public ResponseEntity<String> register(@RequestBody FreshHireRequestDTO freshHireRequestDTO) {
        infoService.registerDetails(freshHireRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Fresh Hire Added Successfully");
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'EMPLOYEE')")
    public ResponseEntity<List<FreshHireRequestDTO>> findAll() {
        List<FreshHireRequestDTO> info = infoService.findAllDetails();
        return ResponseEntity.status(HttpStatus.OK).body(info);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<String> delete(@RequestParam Long id) {
        infoService.removeDetail(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Delete Successfully");
    }
}
