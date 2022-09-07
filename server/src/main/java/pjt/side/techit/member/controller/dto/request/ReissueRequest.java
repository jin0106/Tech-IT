package pjt.side.techit.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ReissueRequest {

    @JsonProperty("accessToken")
    private String accessToken;

    @JsonProperty("refreshTokenId")
    private Long refreshTokenId;

    public ReissueRequest() {
    }

    public ReissueRequest(String accessToken, Long refreshTokenId) {
        this.accessToken = accessToken;
        this.refreshTokenId = refreshTokenId;
    }
}
