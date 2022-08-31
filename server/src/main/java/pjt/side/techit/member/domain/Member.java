package pjt.side.techit.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;
import pjt.side.techit.global.domain.BaseEntity;

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

    protected Member() {
    }

    @Builder
    public Member(String email, String password, String username, String phoneNumber,
        String address, String addressDetail) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.addressDetail = addressDetail;
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
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }


}
