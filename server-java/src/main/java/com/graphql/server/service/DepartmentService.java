package com.graphql.server.service;

import com.graphql.server.entity.Department;

import java.util.List;

public interface DepartmentService {
    Department findDepartmentById(Long id);
    List<Department> findAllDepartment();
}
