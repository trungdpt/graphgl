package com.graphql.server.processor;

import com.graphql.server.response.BaseResponse;
import com.graphql.server.response.GetListEmployeeResponse;
import com.graphql.server.entity.Department;
import com.graphql.server.entity.Employee;
import com.graphql.server.entity.Position;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@DgsComponent
public class Query extends BaseProcessor {
    private static final Logger log = LoggerFactory.getLogger(Query.class);

    @DgsQuery
    public List<Employee> getAllEmployee() throws Exception {
        List<Employee> employeeList = employeeService.getAllEmployee();

        if (employeeList.isEmpty()) {
            throw new Exception("List is empty");
        }
        log.info("List Employee {}:",employeeList);
        return employeeList;
    }

    @DgsQuery
    public BaseResponse getEmployeeById(String id) throws Exception {
        BaseResponse response = new BaseResponse();

        Employee employee = employeeService.findEmployeeById(Long.valueOf(id));

        if (employee == null) {
            response.rollback(BaseProcessor.EMPLOYEE_NOT_FOUND);
            throw new Exception("Employee not found!!");
        }
        log.info("Employee {}:",employee);
        response.addDataResponse(employee);
        return response;
    }

    @DgsQuery
    public List<Position> getListPosition() throws Exception {
        List<Position> positionList = positionService.findAllPosition();

        if (positionList.isEmpty()) {
            throw new Exception("List is empty");
        }
        return positionList;

    }

    @DgsQuery
    public List<Department> getListDepartment() throws Exception {
        List<Department> departmentList = departmentService.findAllDepartment();
        if (departmentList.isEmpty()) {
            throw new Exception("List is empty");
        }
        return departmentList;

    }

    @DgsQuery
    public GetListEmployeeResponse getAllEmployeePagination(@InputArgument(value = "page") int page, @InputArgument(value = "size") int size) {
        if (page <= 0) {
            page = DEFAULT_PAGE_NO;
        }
        if (size <= 0) {
            size = DEFAULT_PAGE_SIZE;
        }

        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Employee> employeeList = employeeService.getAllEmployee(pageable);

        int pageIndex = employeeList.getNumber() + 1;
        long totalRecord = employeeList.getTotalElements();
        int totalPages = employeeList.getTotalPages();

        if (employeeList.isEmpty()) {
            pageIndex = page;
        }

        GetListEmployeeResponse responseList = new GetListEmployeeResponse(String.valueOf(totalRecord), totalPages, pageIndex);
        responseList.addDataResponse(employeeList);

        return responseList;

    }

}