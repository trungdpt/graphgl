import { FC, useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

const NotFound: FC = () => {
    const appContext = useContext(AppContext);
    const { setBreadcrumbs } = appContext || {};

    useEffect(() => {
        setBreadcrumbs && setBreadcrumbs([{ text: 'Home', route: '/' }]);
    }, []);

    return <div className="app-not-found">Không tìm thấy đường dẫn</div>;
};

export default NotFound;
