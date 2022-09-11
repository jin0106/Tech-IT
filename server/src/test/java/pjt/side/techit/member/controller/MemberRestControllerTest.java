package pjt.side.techit.member.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static pjt.side.techit.member.util.MemberFixture.ADDRESS;
import static pjt.side.techit.member.util.MemberFixture.ADDRESS_DETAIL;
import static pjt.side.techit.member.util.MemberFixture.EMAIL;
import static pjt.side.techit.member.util.MemberFixture.PASSWORD;
import static pjt.side.techit.member.util.MemberFixture.PHONE_NUMBER;
import static pjt.side.techit.member.util.MemberFixture.USERNAME;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import pjt.side.techit.member.controller.dto.request.MemberSaveRequest;
import pjt.side.techit.member.util.MemberFixture;

@SpringBootTest
@AutoConfigureMockMvc
public class MemberRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("POST /api/members")
    void joinTest() throws Exception {
        // given
        MemberSaveRequest request = MemberFixture.createMemberSaveRequest(EMAIL, PASSWORD, USERNAME,
            PHONE_NUMBER, ADDRESS, ADDRESS_DETAIL);
        String json = objectMapper.writeValueAsString(request);

        // when
        ResultActions resultActions = mockMvc.perform(post("/api/members")
            .contentType(MediaType.APPLICATION_JSON)
            .content(json));

        // then
        resultActions
            .andExpect(status().isOk());

    }

}
