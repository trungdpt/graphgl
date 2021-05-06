package com.graphql.server.service.impl;

import com.graphql.server.entity.Department;
import com.graphql.server.repository.DepartmentRepository;
import com.graphql.server.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;
    @Override
    public Department findDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }
}
