package com.graphql.server.service.impl;

import com.graphql.server.entity.Employee;
import com.graphql.server.repository.EmployeesRepository;
import com.graphql.server.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeesRepository employeesRepository;

    @Override
    public List<Employee> getAllEmployee() {
        return employeesRepository.findAll();
    }

    @Override
    public Page<Employee> getAllEmployee(Pageable pageable) {
        return employeesRepository.findAll(pageable);
    }

    @Override
    public Employee findEmployeeById(Long id) {
        return employeesRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Employee employee) {
        employeesRepository.save(employee);
    }

    @Override
    public void remove(Long id) {
        employeesRepository.deleteById(id);
    }

    @Override
    public void update(Employee employee) {
        employeesRepository.save(employee);
    }
}
