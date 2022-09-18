package pjt.side.techit.product.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pjt.side.techit.product.controller.dto.response.ProductPageResponse;
import pjt.side.techit.product.controller.dto.response.ProductSimpleResponse;
import pjt.side.techit.product.domain.Product;
import pjt.side.techit.product.domain.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public ProductPageResponse showAllProducts(Pageable pageable) {
        Page<Product> responses = productRepository.findAll(pageable);
        return ProductPageResponse.from(responses);
    }
}
