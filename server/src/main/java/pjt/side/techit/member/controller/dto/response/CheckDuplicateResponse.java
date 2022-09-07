package pjt.side.techit.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class CheckDuplicateResponse {

    @JsonProperty("result")
    @ApiModelProperty(position = 0, notes = "중복 검사 결과", example = "true")
    private Boolean result;

    public CheckDuplicateResponse(Boolean result) {this.result = result;}

    public static CheckDuplicateResponse from(Boolean result) {
        return new CheckDuplicateResponse(
            result
        );
    }

}
