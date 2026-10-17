package in.cper.backend.service;

import in.cper.backend.dto.FreshHireRequestDTO;
import in.cper.backend.entity.FreshHireEntity;
import in.cper.backend.repository.FreshHireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InfoService {

    private FreshHireRepository freshHireRepository;

    @Autowired
    public InfoService(FreshHireRepository freshHireRepository) {
        this.freshHireRepository = freshHireRepository;
    }

    public void registerDetails(FreshHireRequestDTO freshHireRequestDTO) {
        FreshHireEntity freshHireEntity = new FreshHireEntity(
                freshHireRequestDTO.getCollege(),
                freshHireRequestDTO.getFirstName(),
                freshHireRequestDTO.getLastName(),
                freshHireRequestDTO.getEmail(),
                freshHireRequestDTO.getPhone(),
                freshHireRequestDTO.getPosition()
        );

        freshHireRepository.save(freshHireEntity);
    }

    public List<FreshHireRequestDTO> findAllDetails() {
        List<FreshHireEntity> list = freshHireRepository.findAll();

        List<FreshHireRequestDTO> dtoList = new ArrayList<>();
        for (FreshHireEntity freshHireEntity : list) {
            dtoList.add(new FreshHireRequestDTO(
                    freshHireEntity.getCollege(),
                    freshHireEntity.getFirstName(),
                    freshHireEntity.getLastName(),
                    freshHireEntity.getEmail(),
                    freshHireEntity.getPhone(),
                    freshHireEntity.getPosition()
            ));
        }

        return dtoList;
    }

    public void removeDetail(Long id) {
        if (!freshHireRepository.existsById(id)) {
            throw new UsernameNotFoundException("No user found with id : " + id);
        }
        freshHireRepository.deleteById(id);
    }

}
