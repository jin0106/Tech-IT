package pjt.side.techit.product.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;
import pjt.side.techit.product.domain.Product;

@Getter
public class ProductPageResponse {


    @JsonProperty("products")
    @ApiModelProperty(notes = "상품 목록")
    private List<ProductSimpleResponse> productSimpleResponses;

    @JsonProperty("totalPageCount")
    @ApiModelProperty(position = 1, notes = "전체 페이지 수", example = "2")
    private int totalPageCount;

    @JsonProperty("currentPageCount")
    @ApiModelProperty(position = 2, notes = "현재 페이지 번호", example = "0")
    private int currentPageCount;

    public ProductPageResponse() {
    }

    public ProductPageResponse(List<ProductSimpleResponse> productSimpleResponses,
        int totalPageCount,
        int currentPageCount) {
        this.productSimpleResponses = productSimpleResponses;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ProductPageResponse from(Page<Product> products) {
        return new ProductPageResponse(
            products.stream()
                .map(ProductSimpleResponse::from)
                    .collect(Collectors.toList()),
            products.getTotalPages(),
            products.getNumber()
        );
    }


}
