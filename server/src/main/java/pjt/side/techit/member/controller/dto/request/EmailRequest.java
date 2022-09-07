package pjt.side.techit.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class EmailRequest {

    @JsonProperty("email")
    @ApiModelProperty(position = 1, notes = "이메일", example = "techit@naver.com")
    private String email;

    public EmailRequest() {
    }

    public EmailRequest(String email) {
        this.email = email;
    }
}
