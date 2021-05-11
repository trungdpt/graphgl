export const randomDate = (fromDate: Date, toDate: Date): Date => {
    return new Date(fromDate.getTime() + Math.random() * (toDate.getTime() - fromDate.getTime()));
};
