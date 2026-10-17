package in.cper.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class ExceptionDTO {
    private String message;
    private int errorCode;
    private String error;
    private String path;
}
