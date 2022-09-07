package pjt.side.techit.member.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pjt.side.techit.member.controller.dto.request.EmailRequest;
import pjt.side.techit.member.controller.dto.request.LoginRequest;
import pjt.side.techit.member.controller.dto.request.MemberSaveRequest;
import pjt.side.techit.member.controller.dto.request.ReissueRequest;
import pjt.side.techit.member.controller.dto.response.CheckDuplicateResponse;
import pjt.side.techit.member.service.MemberService;

@RestController
@RequestMapping("/api")
@Api(tags = {"회원"})
public class MemberRestController {

    private final MemberService memberService;

    public MemberRestController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/members")
    @ApiOperation(value = "회원가입", notes = "회원가입")
    @ApiResponses({
        @ApiResponse(code = 409, message = "CONFLICT\n로그인 아이디 중복(M02)")
    })
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        memberService.saveMember(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/members/exist-email")
    @ApiOperation(value = "email 중복검사", notes = "email 중복 검사 \n 중복일 경우 true \n 중복이 아닐 경우 false")
    public ResponseEntity<CheckDuplicateResponse> checkDuplicatedEmail(
        @RequestBody EmailRequest request) {
        return ResponseEntity.ok().body(memberService.checkDuplicatedEmail(request));
    }

    @PostMapping("/members/login")
    @ApiOperation(value = "로그인", notes = "로그인")
    @ApiResponses({
        @ApiResponse(code = 409, message = "CONFLICT 일치하지 않는 비밀번호입니다."),
        @ApiResponse(code = 404, message = "NOT FOUND 존재하지 않는 이메일입니다.")
    })
    public ResponseEntity<Void> login(@RequestBody LoginRequest request,
        HttpServletResponse response) {
        memberService.login(request, response);
        return ResponseEntity.ok().build();
    }
