package pjt.side.techit.member.domain;

import java.util.Arrays;
import pjt.side.techit.global.exception.BusinessException;
import pjt.side.techit.global.exception.ErrorCode;

public enum Authority {

    ROLE_MEMBER("회원", "A00"),
    ROLE_ADMIN("관리자", "A01");

    private final String role;
    private final String authorityCode;

    Authority(String role, String authorityCode) {
        this.role = role;
        this.authorityCode = authorityCode;
    }

    public String getRole() {
        return role;
    }

    public String getAuthorityCode() {
        return authorityCode;
    }

    public static Authority convertCodeToAuthority(String inputAuthorityCode) {
        return Arrays.stream(values())
            .filter(authority -> authority.authorityCode.equals(inputAuthorityCode))
            .findFirst()
            .orElseThrow(() -> new BusinessException(ErrorCode.AUTHORITY_NOT_FOUND_BY_AUTHORITY_CODE));
    }
}