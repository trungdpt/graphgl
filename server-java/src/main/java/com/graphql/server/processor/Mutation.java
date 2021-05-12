package com.graphql.server.processor;

import com.graphql.server.dto.EmployeeDTO;
import com.graphql.server.response.BaseResponse;
import com.graphql.server.entity.Department;
import com.graphql.server.entity.Employee;
import com.graphql.server.entity.Position;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@DgsComponent
public class Mutation extends BaseProcessor {

    private static final Logger log = LoggerFactory.getLogger(Mutation.class);


    @DgsMutation
    public BaseResponse createEmployee(@InputArgument(value = "employee") EmployeeDTO employeeDTO) throws Exception {
        log.info("Employee DATA {}", employeeDTO);

        BaseResponse response = new BaseResponse();
        Employee employee = new Employee();
        try {
            Department department = departmentService.findDepartmentById(Long.valueOf(employeeDTO.getDepartment()));
            Position position = positionService.findPositionByID(Long.valueOf(employeeDTO.getPosition()));
            if (checkEmployee(department, position, response)) {

                employee.setName(employeeDTO.getName());
                employee.setAge(employeeDTO.getAge());
                employee.setDayOfBirth(employeeDTO.getDayOfBirth());
                employee.setGender(employeeDTO.getGender());
                employee.setAddress(employeeDTO.getAddress());
                employee.setMobileNumber(employeeDTO.getMobileNumber());
                employee.setDepartment(department);
                employee.setPosition(position);
                employeeService.save(employee);
                response.addDataResponse(employee);

            }

        } catch (Exception exception) {
            throw new Exception(exception.getMessage());
        }

        return response;
    }

    @DgsMutation
    public BaseResponse updateEmployee(@InputArgument(value = "employee") EmployeeDTO employeeDTO, @InputArgument(value = "id") String id) throws Exception {
        log.info("Employee DATA {}", employeeDTO);
        BaseResponse response = new BaseResponse();
        Employee employee = employeeService.findEmployeeById(Long.valueOf(id));

        try {
            if (employee == null) {
                response.rollback(BaseProcessor.EMPLOYEE_NOT_FOUND);
                return response;
            }
            Department department = departmentService.findDepartmentById(Long.valueOf(employeeDTO.getDepartment()));
            Position position = positionService.findPositionByID(Long.valueOf(employeeDTO.getPosition()));
            if (checkEmployee(department, position, response)) {
                employee.setName(employeeDTO.getName());
                employee.setAge(employeeDTO.getAge());
                employee.setDayOfBirth(employeeDTO.getDayOfBirth());
                employee.setGender(employeeDTO.getGender());
                employee.setAddress(employeeDTO.getAddress());
                employee.setMobileNumber(employeeDTO.getMobileNumber());
                employee.setDepartment(department);
                employee.setPosition(position);
                employeeService.save(employee);

                response.addDataResponse(employee);
            }
        } catch (Exception exception) {
            throw new Exception(exception.getMessage());
        }
        return response;

    }

    @DgsMutation
    public BaseResponse deleteEmployeeById(@InputArgument(value = "id") String employeeId) throws Exception {
        log.info("Employee id {}:", employeeId);
        BaseResponse response = new BaseResponse();

        if (employeeId == null) {
            throw new Exception("Id employee null");
        }

        Employee employee = employeeService.findEmployeeById(Long.valueOf(employeeId));

        if (employee == null) {
            response.rollback(BaseProcessor.EMPLOYEE_NOT_FOUND);
            return response;
        }
        employeeService.remove(Long.valueOf(employeeId));
        response.addDataResponse(employee);
        return response;
    }
}
