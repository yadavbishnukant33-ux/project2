package com.gantavya.api;

import com.gantavya.domain.CatalogDtos;
import com.gantavya.domain.CatalogDtos.Guide;
import com.gantavya.domain.CatalogDtos.Trek;
import com.gantavya.seed.SeedData;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CatalogController {

  @GetMapping("/treks")
  public List<Trek> listTreks() {
    return SeedData.treks();
  }

  @GetMapping("/treks/{trekId}")
  public Trek getTrek(@PathVariable int trekId) {
    return SeedData.treks().stream()
        .filter(t -> t.id() == trekId)
        .findFirst()
        .orElseThrow(() -> new ApiNotFoundException("Trek not found: " + trekId));
  }

  @GetMapping("/treks/{trekId}/guides")
  public List<Guide> listGuidesForTrek(@PathVariable int trekId) {
    Trek trek = SeedData.treks().stream()
        .filter(t -> t.id() == trekId)
        .findFirst()
        .orElse(null);

    if (trek == null) {
      return List.of();
    }

    return SeedData.guides().stream()
        .filter(g -> g.treks().contains(trek.name()))
        .toList();
  }

  @GetMapping("/guides/{guideId}")
  public Guide getGuide(@PathVariable int guideId) {
    return SeedData.guides().stream()
        .filter(g -> g.id() == guideId)
        .findFirst()
        .orElseThrow(() -> new ApiNotFoundException("Guide not found: " + guideId));
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  private static class ApiNotFoundException extends RuntimeException {
    ApiNotFoundException(String message) {
      super(message);
    }
  }
}

