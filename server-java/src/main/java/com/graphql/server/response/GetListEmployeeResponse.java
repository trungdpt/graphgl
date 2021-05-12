package com.graphql.server.response;

public class GetListEmployeeResponse extends BaseResponse {

    private String totalRecord;
    private int totalPage;
    private int pageIndex;

    public GetListEmployeeResponse(String totalRecord, int totalPage, int pageIndex) {
        this.totalRecord = totalRecord;
        this.totalPage = totalPage;
        this.pageIndex = pageIndex;
    }

    public String getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(String totalRecord) {
        this.totalRecord = totalRecord;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }
}
