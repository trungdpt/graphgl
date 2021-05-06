package com.graphql.server.processor;

import com.graphql.dto.EmployeeDTO;
import com.graphql.entity.Department;
import com.graphql.entity.Employee;
import com.graphql.entity.Position;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;

@DgsComponent
public class Mutation extends BaseProcessor {

    @DgsMutation
    public Employee createEmployee(@InputArgument(value = "employee") EmployeeDTO employeeDTO){
        Employee employee = new Employee();

        Department department = departmentService.findDepartmentById(Long.valueOf(employeeDTO.getDepartment()));
        Position position = positionService.findPositionByID(Long.valueOf(employeeDTO.getPosition()));

        employee.setName(employeeDTO.getName());
        employee.setAge(employeeDTO.getAge());
        employee.setDayOfBirth(employeeDTO.getDayOfBirth());
        employee.setGender(employeeDTO.getGender());
        employee.setAddress(employeeDTO.getAddress());
        employee.setMobileNumber(employeeDTO.getMobileNumber());
        employee.setDepartment(department);
        employee.setPosition(position);
        employeeService.save(employee);

        return employee;
    }
    @DgsMutation
    public Employee updateEmployee(@InputArgument(value = "employee") EmployeeDTO employeeDTO,@InputArgument(value = "id") String id) throws Exception{
        Employee employee=employeeService.findEmployeeById(Long.valueOf(id));

        if (employee==null){
            throw new Exception("Employee not found!!");
        }

        Department department = departmentService.findDepartmentById(Long.valueOf(employeeDTO.getDepartment()));
        Position position = positionService.findPositionByID(Long.valueOf(employeeDTO.getPosition()));

        employee.setName(employeeDTO.getName());
        employee.setAge(employeeDTO.getAge());
        employee.setDayOfBirth(employeeDTO.getDayOfBirth());
        employee.setGender(employeeDTO.getGender());
        employee.setAddress(employeeDTO.getAddress());
        employee.setMobileNumber(employeeDTO.getMobileNumber());
        employee.setDepartment(department);
        employee.setPosition(position);
        employeeService.save(employee);

        return employee;
    }
}
