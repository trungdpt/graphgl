package com.graphql.server.service;

import com.graphql.server.entity.Position;

import java.util.List;

public interface PositionService {
    Position findPositionByID(Long id);

    List<Position> findAllPosition();
}
