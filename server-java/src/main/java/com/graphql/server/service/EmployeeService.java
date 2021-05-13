package com.graphql.server.service;

import com.graphql.server.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    public List<Employee> getAllEmployee();

    public Page<Employee> getAllEmployee(Pageable pageable);

    public Employee findEmployeeById(Long id);

    public void save(Employee employee);

    public void remove(Long id);

    public void update(Employee employee);
}
