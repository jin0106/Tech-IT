package pjt.side.techit.member.service;

import java.time.LocalDateTime;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pjt.side.techit.global.exception.BusinessException;
import pjt.side.techit.global.exception.ErrorCode;
import pjt.side.techit.member.controller.dto.request.EmailRequest;
import pjt.side.techit.member.controller.dto.request.LoginRequest;
import pjt.side.techit.member.controller.dto.request.MemberSaveRequest;
import pjt.side.techit.member.controller.dto.request.ReissueRequest;
import pjt.side.techit.member.controller.dto.response.CheckDuplicateResponse;
import pjt.side.techit.member.controller.dto.response.TokenResponse;
import pjt.side.techit.member.domain.Member;
import pjt.side.techit.member.domain.MemberRepository;
import pjt.side.techit.member.domain.RefreshToken;
import pjt.side.techit.member.domain.RefreshTokenRepository;
import pjt.side.techit.member.infrastructure.JwtTokenProvider;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public Long saveMember(MemberSaveRequest request) {
        checkDuplicatedEmail(request.getEmail());

        Member member = request.toMember();
        member.encodePassword(passwordEncoder);
        return memberRepository.save(member).getId();
    }

    private void checkDuplicatedEmail(String email) {
        if(memberRepository.existsByEmail(email)) {
            throw new BusinessException(ErrorCode.MEMBER_EMAIL_DUPLICATED);
        }
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkDuplicatedEmail(EmailRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByEmail(request.getEmail()));
    }

    @Transactional(readOnly = true)
    public void login(LoginRequest request, HttpServletResponse response) {
        Member member = findByEmail(request.getEmail());
        member.checkPassword(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        Long refreshTokenId = saveRefreshToken(member, tokenResponse);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
    }

    @Transactional
    public void reissue(ReissueRequest request, HttpServletResponse response) {
        String requestRefreshToken = refreshTokenRepository.findById(request.getRefreshTokenId())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_EXPIRED_REFRESH_TOKEN)).getRefreshToken();
        jwtTokenProvider.validateRefreshToken(requestRefreshToken);
        Authentication authentication = jwtTokenProvider.getAuthentication(request.getAccessToken());

        RefreshToken refreshToken = refreshTokenRepository.findBySubject(authentication.getName())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));

        refreshToken.validateValue(requestRefreshToken);

        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication.getName(),
            jwtTokenProvider.getAuthority(authentication));

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
        refreshTokenRepository.save(refreshToken);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshToken.getId(), response);
    }

    public void setTokenToCookie(String accessToken, Long refreshTokenId, HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7days, 기간 지난 access token 도 필요하다고 함
        accessTokenCookie.setSecure(true);
//        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refreshTokenId", refreshTokenId.toString());
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        refreshTokenCookie.setSecure(true);
//        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }

    @Transactional
    public Long saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = refreshTokenRepository.findBySubject(member.getEmail())
            .orElse(RefreshToken.builder()
                .subject(member.getEmail())
                .expiredAt(LocalDateTime.now().plusDays(7))
                .build());

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getId();
    }

    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
    }
}
