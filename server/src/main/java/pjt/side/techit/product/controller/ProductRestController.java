package pjt.side.techit.product.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pjt.side.techit.product.controller.dto.response.ProductPageResponse;
import pjt.side.techit.product.service.ProductService;

@RestController
@RequestMapping("/api")
@Api(tags = {"상품"})
public class ProductRestController {

    private final ProductService productService;

    public ProductRestController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    @ApiOperation(value = "전체 상품 목록 조회 (페이지 네이션 포함)", notes = "전체 상품 목록 조회 (페이지 요청은 쿼리스트링으로)")
    public ResponseEntity<ProductPageResponse> showAllProducts(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok().body(productService.showAllProducts(pageable));
    }
}
