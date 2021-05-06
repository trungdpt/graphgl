package com.graphql.server.service;

import com.graphql.server.entity.Position;

public interface PositionService {
    Position findPositionByID(Long id);
}
