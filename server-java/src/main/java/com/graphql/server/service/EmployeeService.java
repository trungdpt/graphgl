package com.graphql.server.service;

import com.graphql.server.entity.Employee;

import java.util.List;

public interface EmployeeService {

    public List<Employee> getAllEmployee();

    public Employee findEmployeeById(Long id);

    public void save(Employee employee);

    public void remove(Long id);

    public void update(Employee employee);
}
