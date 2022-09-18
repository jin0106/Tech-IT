package pjt.side.techit.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TokenResponse {

    @JsonProperty("accessToken")
    @ApiModelProperty(notes = "액세스 토큰")
    private String accessToken;

    @JsonProperty("refreshToken")
    @ApiModelProperty(notes = "리프레시 토큰")
    private String refreshToken;

    public TokenResponse() {
    }

    @Builder
    public TokenResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}