import './FilterButton.css';

const FilterButton = ({ label, isActive, onClick }) => {
    return (
        <button
            type="button"
            aria-pressed={isActive}
            className={`filter-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
            {isActive && <span className="filter-indicator"></span>}
        </button>
    );
};

export default FilterButton;
