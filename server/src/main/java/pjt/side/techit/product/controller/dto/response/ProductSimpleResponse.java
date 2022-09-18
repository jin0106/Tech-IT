package pjt.side.techit.product.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import pjt.side.techit.product.domain.Product;

@Getter
public class ProductSimpleResponse {

    @JsonProperty("productId")
    @ApiModelProperty(notes = "상품 id", example = "1")
    private Long id;

    @JsonProperty("category")
    @ApiModelProperty(position = 1, notes = "카테고리", example = "Appliances")
    private String category;

    @JsonProperty("name")
    @ApiModelProperty(position = 2, notes = "상품명", example = "Whirlpool - 14.3 Cu. Ft. Top-Freezer Refrigerator - Black")
    private String name;

    @JsonProperty("price")
    @ApiModelProperty(position = 3, notes = "상품 가격", example = "674990")
    private Integer price;

    @JsonProperty("brand")
    @ApiModelProperty(position = 4, notes = "브랜드", example = "Whirlpool")
    private String brand;

    @JsonProperty("mainImage")
    @ApiModelProperty(position = 5, notes = "메인 이미지", example = "https://pisces.bbystatic.com/prescaled/500/500/image2/BestBuy_US/images/products/1073/1073095_sd.jpg")
    private String mainImage;

    @JsonProperty("ratingAverage")
    @ApiModelProperty(position = 6, notes = "평점", example = "4.20")
    private Double ratingAverage;

    public ProductSimpleResponse() {
    }

    public ProductSimpleResponse(Long id, String category, String name, Integer price, String brand,
        String mainImage, Double ratingAverage) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.mainImage = mainImage;
        this.ratingAverage = ratingAverage;
    }

    public static ProductSimpleResponse from(Product product) {
        return new ProductSimpleResponse(
            product.getId(),
            product.getCategory(),
            product.getName(),
            product.getPrice(),
            product.getBrand(),
            product.getMainImage(),
            product.getRatingAverage()
        );
    }
}
