import { useTranslation } from 'react-i18next';
import { TIMELINE_ICONS } from '../../utils/Icons';

const StatusBadge = ({ status }) => {
    const { t } = useTranslation();

    if (status === 'ongoing') {
        return (
            <div className="status-badge status-ongoing">
                <span className="status-dot"></span>
                <span>{t('education.status.ongoing')}</span>
            </div>
        );
    }

    return (
        <div className="status-badge status-completed">
            {TIMELINE_ICONS.CHECK}
            <span>{t('education.status.completed')}</span>
        </div>
    );
};

export default StatusBadge;