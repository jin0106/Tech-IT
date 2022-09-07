package pjt.side.techit.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import pjt.side.techit.global.exception.BusinessException;
import pjt.side.techit.global.exception.ErrorCode;

@Getter
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_token_id")
    private Long id;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "subject")
    private String subject;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    public RefreshToken() {
    }

    @Builder
    public RefreshToken(String refreshToken, String subject, LocalDateTime expiredAt) {
        this.refreshToken = refreshToken;
        this.subject = subject;
        this.expiredAt = expiredAt;
    }

    public void validateValue(String refreshToken) {
        if(!this.refreshToken.equals(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_EXPIRED_REFRESH_TOKEN);
        }
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        this.expiredAt = LocalDateTime.now().plusDays(7);
    }
}
