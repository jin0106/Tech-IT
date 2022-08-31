package pjt.side.techit.global.exception;

public class BusinessException extends CustomException{

    public BusinessException(ErrorCode errorCode) {
        super(errorCode);
    }
}
