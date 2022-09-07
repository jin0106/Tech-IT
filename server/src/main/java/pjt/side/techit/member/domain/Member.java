package pjt.side.techit.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;
import pjt.side.techit.global.domain.BaseEntity;
import pjt.side.techit.global.exception.BusinessException;
import pjt.side.techit.global.exception.ErrorCode;

@Entity
@Getter
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "address_detail")
    private String addressDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username, String phoneNumber,
        String address, String addressDetail, Authority authority) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.addressDetail = addressDetail;
        this.authority = authority;
    }

    public static Member createMember(String email, String password, String username,
        String phoneNumber, String address, String addressDetail) {
        return Member.builder()
            .email(email)
            .password(password)
            .username(username)
            .phoneNumber(phoneNumber)
            .address(address)
            .addressDetail(addressDetail)
            .authority(Authority.ROLE_MEMBER)
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void checkPassword(PasswordEncoder passwordEncoder, String password) {
        if(!passwordEncoder.matches(password, this.password)) {
            throw new BusinessException(ErrorCode.MEMBER_LOGIN_ERROR_BY_PASSWORD);
        }
    }


}
