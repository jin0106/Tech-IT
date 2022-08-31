package pjt.side.techit.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import pjt.side.techit.member.domain.Member;

@Getter
public class MemberSaveRequest {

    @JsonProperty("email")
    @ApiModelProperty(position = 1, notes = "이메일", example = "techit@naver.com")
    private String email;

    @JsonProperty("password")
    @ApiModelProperty(position = 2, notes = "비밀번호", example = "duswnWkd1!")
    private String password;

    @JsonProperty("username")
    @ApiModelProperty(position = 3, notes = "유저네임", example = "김텤잇")
    private String username;

    @JsonProperty("phone_number")
    @ApiModelProperty(position = 4, notes = "휴대전화번호", example = "01047841769")
    private String phoneNumber;

    @JsonProperty("address")
    @ApiModelProperty(position = 5, notes = "도로명 주소", example = "경기 성남시 분당구 정자일로 95")
    private String address;

    @JsonProperty("address_detail")
    @ApiModelProperty(position = 6, notes = "상세주소", example = "3층")
    private String addressDetail;

    public MemberSaveRequest() {
    }

    public MemberSaveRequest(String email, String password, String username, String address,
        String addressDetail) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.address = address;
        this.addressDetail = addressDetail;
    }

    public Member toMember() {
        return Member.createMember(email, password, username, phoneNumber, address,
            addressDetail);
    }


}
