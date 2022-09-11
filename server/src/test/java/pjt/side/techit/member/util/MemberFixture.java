package pjt.side.techit.member.util;

import pjt.side.techit.member.controller.dto.request.MemberSaveRequest;

public class MemberFixture {

    public static final String EMAIL = "techit@naver.com";
    public static final String PASSWORD = "cnlQhgkwk1!";
    public static final String USERNAME = "김테킷";
    public static final String PHONE_NUMBER = "01012345678";
    public static final String ADDRESS = "경기 성남시 분당구 정자일로 95";
    public static final String ADDRESS_DETAIL = "3층";

    public static MemberSaveRequest createMemberSaveRequest(String email, String password,
        String username, String phoneNumber, String address, String addressDetail) {
        return new MemberSaveRequest(email, password, username, phoneNumber, address, addressDetail);
    }

}
