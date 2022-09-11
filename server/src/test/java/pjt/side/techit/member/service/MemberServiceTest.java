package pjt.side.techit.member.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static pjt.side.techit.member.util.MemberFixture.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import pjt.side.techit.global.exception.BusinessException;
import pjt.side.techit.global.exception.ErrorCode;
import pjt.side.techit.member.controller.dto.request.EmailRequest;
import pjt.side.techit.member.controller.dto.request.MemberSaveRequest;
import pjt.side.techit.member.controller.dto.response.CheckDuplicateResponse;
import pjt.side.techit.member.domain.Authority;
import pjt.side.techit.member.domain.Member;
import pjt.side.techit.member.domain.MemberRepository;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private MemberService memberService;

    private MemberSaveRequest memberSaveRequest;

    private EmailRequest emailRequest;


    @BeforeEach
    void setUp() {
        memberSaveRequest = createMemberSaveRequest(EMAIL, PASSWORD, USERNAME, PHONE_NUMBER,
            ADDRESS, ADDRESS_DETAIL);
        emailRequest = new EmailRequest(EMAIL);
    }

    @Test
    @DisplayName("이미 존재하는 이메일로 회원가입을 요청할 시 exception이 발생해야 한다.")
    void saveMemberExceptionByDuplicatedEmailTest() {
        // given
        // email 존재 여부 확인 시 true 반환 stubbing
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(true);

        // when & then
        assertThatExceptionOfType(BusinessException.class)
            .isThrownBy(() -> memberService.saveMember(memberSaveRequest))
            .withMessageMatching(ErrorCode.MEMBER_EMAIL_DUPLICATED.getMessage());
    }

    @Test
    @DisplayName("회원가입할 경우 저장된 id를 반환할 수 있다.")
    void saveMemberTest() {
        // given
        when(memberRepository.existsByEmail(EMAIL)).thenReturn(false);

        // memberRepository는 가짜 객체이기 때문에 memberRepository가 하는 일을 전부 해주어야한다.
        Member member = memberSaveRequest.toMember();
        ReflectionTestUtils.setField(member, "id", 1L);
        ReflectionTestUtils.setField(member, "authority", Authority.ROLE_MEMBER);
        when(memberRepository.save(any())).thenReturn(member);

        // when
        Long result = memberService.saveMember(memberSaveRequest);

        // then
        assertThat(result).isEqualTo(1L);
    }

}
