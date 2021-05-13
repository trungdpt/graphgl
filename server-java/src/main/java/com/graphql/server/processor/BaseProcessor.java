package com.graphql.server.processor;

import com.graphql.server.entity.Department;
import com.graphql.server.entity.Position;
import com.graphql.server.response.BaseResponse;
import com.graphql.server.service.DepartmentService;
import com.graphql.server.service.EmployeeService;
import com.graphql.server.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

public class BaseProcessor {

    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentService departmentService;
    @Autowired
    protected PositionService positionService;

    protected static Map<String, String> mapResult = new HashMap<>();


    protected static final int DEFAULT_PAGE_NO = 1;
    protected static final int DEFAULT_PAGE_SIZE = 100;

    public static final String RESULT_CODE_SUCCESS = "0";
    public static final String RESULT_CODE_ERROR = "-1";

    public static final String EMPLOYEE_NOT_FOUND = "904";
    public static final String DEPARTMENT_NOT_EXIT = "901";
    public static final String POSITION_NOT_EXIT = "902";

    static {
        mapResult.put(RESULT_CODE_SUCCESS, "Success");
        mapResult.put(RESULT_CODE_ERROR, "Error");
        mapResult.put(EMPLOYEE_NOT_FOUND, "Employee not found");
        mapResult.put(DEPARTMENT_NOT_EXIT, "Department dose not exist");
        mapResult.put(POSITION_NOT_EXIT, "Position dose not exist");
    }

    public static String getResultDescription(String resultCode) {
        return mapResult.get(resultCode);
    }

    protected boolean checkEmployee(Department department, Position position, BaseResponse baseResponse) {
        if (department == null) {
            baseResponse.rollback(DEPARTMENT_NOT_EXIT);
            return false;
        }
        if (position == null){
            baseResponse.rollback(POSITION_NOT_EXIT);
            return false;
        }

        return true;
    }

}
