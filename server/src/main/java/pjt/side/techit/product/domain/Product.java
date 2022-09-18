package pjt.side.techit.product.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Product{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "brand")
    private String brand;

    @Column(name = "color")
    private String color;

    @Column(name = "mainImage")
    private String mainImage;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "height")
    private Double height;

    @Column(name = "width")
    private Double width;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "warranty")
    private String warranty;

    @Column(name = "rating_count")
    private Integer ratingCount;

    @Column(name = "rating_average")
    private Double ratingAverage;

    protected Product(){

    }
}
