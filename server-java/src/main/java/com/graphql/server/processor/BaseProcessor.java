package com.graphql.server.processor;

import com.graphql.server.service.DepartmentService;
import com.graphql.server.service.EmployeeService;
import com.graphql.server.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseProcessor {

    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentService departmentService;
    @Autowired
    protected PositionService positionService;
}
