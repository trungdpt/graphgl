package com.graphql.server.service.impl;

import com.graphql.server.entity.Position;
import com.graphql.server.repository.PositionRepository;
import com.graphql.server.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {
    @Autowired
    private PositionRepository positionRepository;
    @Override
    public Position findPositionByID(Long id) {
        return positionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Position> findAllPosition() {
        return positionRepository.findAll();
    }
}
