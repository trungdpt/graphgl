package com.graphql.server.service;

import com.graphql.server.entity.Department;

public interface DepartmentService {
    Department findDepartmentById(Long id);
}
