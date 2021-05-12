import { FC } from 'react';
import avatar from '../../assets/avatar.png';

const Practice: FC = () => {
    return (
        <div className="practice">
            <div className="practice-item">
                <img src={avatar} alt="" />
                Username
            </div>
        </div>
    );
};

export default Practice;
