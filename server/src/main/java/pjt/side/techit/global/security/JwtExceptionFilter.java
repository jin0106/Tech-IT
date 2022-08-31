package pjt.side.techit.global.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pjt.side.techit.global.exception.ErrorResponse;
import pjt.side.techit.global.exception.JwtException;

@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (JwtException exception) {
            sendErrorMessage(response, exception);
        }
    }

    private void sendErrorMessage(HttpServletResponse response, JwtException e) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.getWriter().write(ErrorResponse.toJson(e));
    }

}
