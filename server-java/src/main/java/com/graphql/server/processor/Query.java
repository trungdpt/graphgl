package com.graphql.server.processor;

import com.graphql.server.entity.Employee;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;

import java.util.List;

@DgsComponent
public class Query extends BaseProcessor {
    @DgsQuery
    public List<Employee> getAllEmployee() throws Exception {
        List<Employee> employeeList = employeeService.getAllEmployee();

        if (employeeList.isEmpty()) {
            throw new Exception("List is empty");
        }
        return employeeList;
    }

    @DgsQuery
    public Employee getEmployeeById(String id) throws Exception {
        Employee employee = employeeService.findEmployeeById(Long.valueOf(id));

        if (employee == null) {
            throw new Exception("Employee not found!!");
        }

        return employee;
    }

}