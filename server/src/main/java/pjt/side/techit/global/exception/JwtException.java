package pjt.side.techit.global.exception;

public class JwtException extends CustomException{
    public JwtException(ErrorCode errorCode) {
        super(errorCode);
    }
}
