package com.graphql.server.response;

import com.graphql.server.processor.BaseProcessor;

public class BaseResponse {
    private String resultCode;
    private String description;
    private Object data;

    public BaseResponse() {
        this.resultCode = BaseProcessor.RESULT_CODE_SUCCESS;
        this.description = BaseProcessor.getResultDescription(BaseProcessor.RESULT_CODE_SUCCESS);
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void rollback(String resultCode) {
        this.setResultCode(resultCode);
        this.setDescription(BaseProcessor.getResultDescription(resultCode));
    }

    public void addDataResponse(Object ob) {
        this.setData(ob);
    }

}
